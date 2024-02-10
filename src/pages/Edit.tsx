import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import useStore from '../store/booksStore';
import axios from 'axios';

function Edit({navigation}: any): React.JSX.Element {
  const [uploading, setUploading] = useState(false);
  const {booksById, updateBook, loading} = useStore(state => state);
  const [pages, onChangePages] = useState(booksById.numero_paginas.toString());
  const [Title, onChangeTitle] = useState(booksById.titulo);
  const [categoria, onChangecategoria] = useState(booksById.categoria);
  const [autor, onChangeautor] = useState(booksById.autor);
  const [año_publicacion, onChangeaño_publicacion] = useState(
    booksById.año_publicacion.toString(),
  );
  const [idioma, onChangeidioma] = useState(booksById.idioma);
  const [valoracion, onChangevaloracion] = useState(
    booksById.valoracion.toString(),
  );
  const [descripcion, onChangedescripcion] = useState(booksById.descripcion);
  const [cita, onChangecita] = useState(booksById.cita);

  //   const docPicker = async () => {
  //     // Pick a single file
  //     try {
  //       const res = await DocumentPicker.pick({
  //         type: [DocumentPicker.types.allFiles],
  //       });
  //       console.log(res);

  //       setImage(res);
  //     } catch (err) {
  //       if (DocumentPicker.isCancel(err)) {
  //         console.log('error -----', err);
  //       } else {
  //         throw err;
  //       }
  //     }
  //   };

  const update = () => {
    const data = {
      titulo: Title,
      numero_paginas: parseInt(pages),
      categoria: categoria,
      autor: autor,
      año_publicacion: parseInt(año_publicacion),
      idioma: idioma,
      valoracion: parseFloat(valoracion),
      descripcion: descripcion,
      cita: cita,
    };

    updateBook(booksById.id, data);
  };
  useEffect(() => {
    useStore.subscribe(
      state => state.loading,
      loading => {
        if (!loading) {
          navigation.navigate('SingleBook', {id: booksById.id});
        }
      },
    );
  }, []);
  return (
    <>
      <ScrollView>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {uploading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {image && (
              <Image source={{uri: image}} style={{width: 200, height: 200}} />
            )}
            <Button title="Subir imagen" onPress={uploadImage} />
          </>
        )}
      </View> */}
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <Button
            title="gasd"
            onPress={() => {
              // docPicker();
            }}
          />
          <TextInput
            placeholder="Titulo"
            onChangeText={onChangeTitle}
            value={Title}
            style={styles.inputxl}
          />
          <View style={{flexDirection: 'row', marginBottom: '2.5%'}}>
            <TextInput
              placeholder="Categoria"
              value={categoria}
              onChangeText={onChangecategoria}
              style={styles.inputLeft}
            />
            <TextInput
              placeholder=" autor"
              value={autor}
              onChangeText={onChangeautor}
              style={styles.inputRight}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: '2.5%'}}>
            <TextInput
              placeholder="useless placeholder"
              keyboardType="numeric"
              onChangeText={onChangePages}
              value={pages}
              style={styles.inputLeft}
            />
            <TextInput
              placeholder=" año_publicacion"
              value={año_publicacion}
              onChangeText={onChangeaño_publicacion}
              style={styles.inputRight}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: '1.5%'}}>
            <TextInput
              placeholder=" idioma"
              value={idioma}
              onChangeText={onChangeidioma}
              style={styles.inputLeft}
            />
            <TextInput
              placeholder=" valoracion"
              value={valoracion}
              onChangeText={onChangevaloracion}
              style={styles.inputRight}
            />
          </View>

          <TextInput
            placeholder="Descripcion"
            value={descripcion}
            onChangeText={onChangedescripcion}
            style={styles.inputxl}
            multiline={true}
            numberOfLines={5}
          />
          <TextInput
            placeholder="Cita del libro"
            value={cita}
            onChangeText={onChangecita}
            style={styles.inputxl}
            multiline={true}
            numberOfLines={5}
          />

          <View
            style={{display: 'flex', flexDirection: 'row', marginTop: '20%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SingleBook', {id: booksById.id});
              }}
              style={{
                width: '50%',
                padding: 10,
                backgroundColor: '#000',
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                update();
              }}
              style={{
                width: '50%',
                padding: 10,
                backgroundColor: '#54B435',
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 24}}>Cargando...</Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
export {Edit};

const styles = StyleSheet.create({
  inputxl: {
    width: '90%',
    marginBottom: '2.5%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  inputLeft: {
    width: '44%',
    marginRight: '1%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  inputRight: {
    width: '44%',
    marginLeft: '1%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
});
