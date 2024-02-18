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
import useStore from '../store/booksStore';
import axios from 'axios';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

function Create({navigation}: any): React.JSX.Element {
  const [uploading, setuploading] = useState(false);
  const {booksById, CreateBook, loading} = useStore(state => state);
  const [pages, onChangePages] = useState('');
  const [Title, onChangeTitle] = useState('');
  const [categoria, onChangecategoria] = useState('');
  const [autor, onChangeautor] = useState('');
  const [año_publicacion, onChangeaño_publicacion] = useState('');
  const [idioma, onChangeidioma] = useState('');
  const [valoracion, onChangevaloracion] = useState('');
  const [descripcion, onChangedescripcion] = useState('');
  const [cita, onChangecita] = useState('');
  const [Image, setImage] = useState<Asset>();

  const openImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('Image picker error: ', result.errorMessage);
    } else {
      const firstAsset = result.assets?.[0];
      if (firstAsset) {
        setImage(firstAsset);
      }
    }
  };

  const Create = () => {
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

    CreateBook(data, Image);
  };
  useEffect(() => {
    useStore.subscribe(
      state => state.booksById,
      booksById => {
        navigation.navigate('SingleBook', {id: booksById.id});
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
          <TouchableOpacity
            style={{
              ...styles.inputxl,
              height: '7.5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 25,
              backgroundColor: '#000',
            }}
            onPress={openImagePicker}>
            <Text style={{color: '#fff'}}>
              {Image ? Image.fileName : 'Ingrese una imagen'}
            </Text>
          </TouchableOpacity>

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
              placeholder="Autor"
              value={autor}
              onChangeText={onChangeautor}
              style={styles.inputRight}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: '2.5%'}}>
            <TextInput
              placeholder="Numero de paginas"
              keyboardType="numeric"
              onChangeText={onChangePages}
              value={pages}
              style={styles.inputLeft}
            />
            <TextInput
              placeholder="Año publicacion"
              keyboardType="numeric"
              value={año_publicacion}
              onChangeText={onChangeaño_publicacion}
              style={styles.inputRight}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: '1.5%'}}>
            <TextInput
              placeholder="Idioma"
              value={idioma}
              onChangeText={onChangeidioma}
              style={styles.inputLeft}
            />
            <TextInput
              placeholder="Valoracion"
              keyboardType="numeric"
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
                navigation.navigate('Home');
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
                Create();
              }}
              style={{
                width: '50%',
                padding: 10,
                backgroundColor: '#54B435',
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Crear</Text>
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
export {Create};

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
