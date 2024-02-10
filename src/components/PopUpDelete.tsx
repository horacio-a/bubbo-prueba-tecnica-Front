import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import useStore from '../store/booksStore';

function PopUpDelete({show, setshow, navigation}: any): React.JSX.Element {
  const {booksById, deleteBook} = useStore(state => state);

  const handleDelete = () => {
    deleteBook(booksById);
    navigation.navigate('Home');
  };

  return (
    <View style={show ? stylesHeader.Back : stylesHeader.off}>
      <View style={stylesHeader.Notification}>
        <View style={stylesHeader.ConteinerTitle}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Lato_700Bold',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Espera
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Lato_400Regular',
              fontSize: 14,
              textAlign: 'center',
            }}>
            ¿Seguro quieres eliminar este libro?
          </Text>
        </View>
        <View style={stylesHeader.ConteinerButtom}>
          <TouchableOpacity
            onPress={() => {
              setshow(false);
            }}
            style={stylesHeader.ButtomLeft}>
            <Text style={stylesHeader.TextButtom}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
            style={stylesHeader.ButtomRight}>
            <Text style={stylesHeader.TextButtom}>Si</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setshow(false);
        }}>
        <View style={stylesHeader.CloserWidthMax}></View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export {PopUpDelete};
const stylesHeader = StyleSheet.create({
  off: {
    display: 'none',
  },
  CloserWidthMax: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  Back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Notification: {
    width: '65%',
    height: '20%',
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    zIndex: 100,
  },
  ConteinerTitle: {
    width: '100%',
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ConteinerButtom: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  ButtomLeft: {
    width: '50%',
    height: '100%',
    borderRightColor: '#747272',
    borderRightWidth: 1,
    borderTopColor: '#747272',
    borderTopWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtomRight: {
    width: '50%',
    height: '100%',
    borderLeftColor: '#747272',
    borderLeftWidth: 1,
    borderTopColor: '#747272',
    borderTopWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextButtom: {
    color: '#fff',
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
});
