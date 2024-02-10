import axios from 'axios';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {create} from 'zustand';
import {subscribeWithSelector} from 'zustand/middleware';

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

interface orderType {
  loading: boolean;
  books: BooksType[];
  fetchAllData: () => Promise<void>;
  deleteBook: any;
  booksById: any;
  fetchDataById: any;
  updateBook: (id: any, data: any) => Promise<void>;
  CreateBook: any;
}

const useStore = create<orderType>()(
  subscribeWithSelector((set, get) => ({
    books: [],
    booksById: {},
    loading: false,

    fetchAllData: async () => {
      const result = await axios.get(
        `https://m8jpxv3s-3000.brs.devtunnels.ms/books`,
      );
      set(() => ({books: result.data}));
    },

    fetchDataById: async (id: string) => {
      const result = await axios.get(
        `https://m8jpxv3s-3000.brs.devtunnels.ms/books/${id}`,
      );
      set(() => ({booksById: result.data}));
    },

    deleteBook: async (id: any) => {
      const result = await axios.delete(
        `https://m8jpxv3s-3000.brs.devtunnels.ms/books/${id.id}`,
      );
      console.log(result);
      const {books} = get();
      const copiaObjeto = [...books];
      const newbooks = copiaObjeto.filter(books => books.id != id.id);

      set({books: newbooks});
    },

    updateBook: async (id: any, data: any) => {
      set({loading: true});
      const result = await axios.put(
        `https://m8jpxv3s-3000.brs.devtunnels.ms/books/${id}`,
        data,
      );
      set(() => ({booksById: result.data}));
      const {books} = get();
      const copiaObjeto = [...books];
      const newbooks = copiaObjeto.findIndex(books => books.id === id);
      copiaObjeto[newbooks] = result.data;

      set({books: copiaObjeto});
      set({loading: false});
    },
    CreateBook: async (data: BooksType) => {
      const result = await axios.post(
        `https://m8jpxv3s-3000.brs.devtunnels.ms/books`,
        data,
      );
      console.log(result);
      const {books} = get();
      const copiaObjeto = [...books];
      copiaObjeto.push(result.data);
      set(() => ({books: result.data}));
    },
  })),
);

export default useStore;
