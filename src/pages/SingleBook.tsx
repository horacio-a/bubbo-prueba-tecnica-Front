import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
import {getColors} from 'react-native-image-colors';
import {PopUpDelete} from '../components/PopUpDelete';

import useStore from '../store/booksStore';
interface carouselIndex {
  id: string;
  autor: string;
  categoria: string;
  titulo: string;
}

function SingleBook({route, navigation}: any): React.JSX.Element {
  const [show, setshow] = useState<boolean>(false);
  const [Loding, setLoding] = useState<boolean>(true);
  const {booksById, fetchDataById} = useStore(state => state);
  const {id} = route.params;

  const [colors, setColors] = React.useState(null);

  const NavigationFuntion = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    setLoding(true);

    fetchDataById(id);
    setLoding(false);
  }, []);

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {id === booksById.id && !Loding ? (
          <View style={{width: '100%', height: '100%'}}>
            <View
              style={{
                width: '100%',
                height: '20%',
                marginBottom: 50,
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                blurRadius={3}
                source={{
                  uri: `${
                    booksById.img
                      ? booksById.img
                      : 'https://reactnative.dev/img/tiny_logo.png'
                  }`,
                }}
              />
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {booksById.titulo}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {booksById.autor} - {booksById.categoria} -{' '}
              {booksById.año_publicacion}
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: '#222',
                margin: 25,
                padding: 15,
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              '{booksById.cita}'
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Resumen
            </Text>
            <Text
              style={{
                color: '#000',
                backgroundColor: '#ddd',
                margin: 25,
                padding: 15,
                textAlign: 'center',
                marginTop: 0,
              }}>
              {booksById.descripcion}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  width: '50%',
                  color: '#131313',
                  padding: 5,
                  textAlign: 'center',
                }}>
                Paginas: {booksById.numero_paginas}
              </Text>
              <Text
                style={{
                  width: '50%',

                  color: '#131313',
                  padding: 5,
                  textAlign: 'center',
                }}>
                Valoración: {booksById.valoracion}/5
              </Text>
            </View>
            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: '20%'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Edit');
                }}
                style={{
                  width: '50%',
                  padding: 10,
                  backgroundColor: '#FFB534',
                }}>
                <Text style={{color: '#131313', textAlign: 'center'}}>
                  Editar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setshow(true);
                }}
                style={{
                  width: '50%',
                  padding: 10,
                  backgroundColor: '#CE1212',
                }}>
                <Text style={{color: '#131313', textAlign: 'center'}}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
      <PopUpDelete show={show} setshow={setshow} navigation={navigation} />
    </>
  );
}

export {SingleBook};
