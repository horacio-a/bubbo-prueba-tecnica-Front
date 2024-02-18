import axios from 'axios';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {create} from 'zustand';
import {subscribeWithSelector} from 'zustand/middleware';
import storage from '@react-native-firebase/storage';
const reference = storage();

export interface BooksType {
  id: string;
  autor: string;
  categoria: string;
  titulo: string;
  img: string;
  numero_paginas: number;
  año_publicacion: number;
  idioma: string;
  valoracion: number;
  descripcion: string;
  cita: string;
}

interface StoreType {
  loading: boolean;
  books: BooksType[];
  fetchAllData: () => Promise<void>;
  deleteBook: any;
  booksById: any;
  fetchDataById: any;
  updateBook: (id: any, data: any, Image: any) => Promise<void>;
  CreateBook: any;
}

const api = 'https://bubbo-backend.vercel.app/books';

const useStore = create<StoreType>()(
  subscribeWithSelector((set, get) => ({
    books: [],
    booksById: {},
    loading: false,

    fetchAllData: async () => {
      set({loading: true});

      const result = await axios.get(api);
      set(() => ({books: result.data}));
      set({loading: false});
    },

    fetchDataById: async (id: string) => {
      const result = await axios.get(`${api}/${id}`);
      try {
        const url = await storage().ref(result.data.id).getDownloadURL();
        result.data.img = url;
      } catch (error) {}

      set(() => ({booksById: result.data}));
    },

    deleteBook: async (id: any) => {
      const result = await axios.delete(`${api}/${id.id}`);
      const {books} = get();
      const copiaObjeto = [...books];
      const newbooks = copiaObjeto.filter(books => books.id != id.id);

      set({books: newbooks});
    },

    updateBook: async (id: any, data: any, Image: any) => {
      set({loading: true});
      await reference.ref(data.titulo).putFile(Image.uri);
      let url = await storage().ref(data.titulo).getDownloadURL();
      data.img = url;

      const result = await axios.put(`${api}/${id}`, data);
      set(() => ({booksById: result.data}));

      const {books} = get();

      const copiaObjeto = [...books];
      const newbooks = copiaObjeto.findIndex(books => books.id === id);
      copiaObjeto[newbooks] = result.data;

      set({books: copiaObjeto});
      set({loading: false});
    },
    CreateBook: async (data: BooksType, Image: any) => {
      set({loading: true});

      const {books} = get();
      await reference.ref(data.titulo).putFile(Image.uri);
      let url = await storage().ref(data.titulo).getDownloadURL();
      data.img = url;
      const result = await axios.post(`${api}`, data);
      set(() => ({booksById: result.data}));

      const copiaObjeto = [...books];
      copiaObjeto.push(result.data);

      set(() => ({books: copiaObjeto}));

      set({loading: false});
    },
  })),
);

export default useStore;
