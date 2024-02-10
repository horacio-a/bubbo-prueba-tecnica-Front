import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import useStore from '../store/booksStore';

interface Types {
  index: number;
  navigation: any;
}

export default function CarouselCard({
  index,
  navigation,
}: Types): React.JSX.Element {
  const {books} = useStore(state => state);
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: `${open ? '100%' : '95%'}`,
        position: `${open ? 'absolute' : 'relative'}`,
      }}>
      <View
        style={{
          paddingTop: 20,

          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '45%',
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          backgroundColor: `${open ? '#1e1e1e' : '#000000'}`,
        }}>
        <Image
          style={{height: '100%', backgroundColor: '#1e1e1e', width: 150}}
          source={{
            uri: `${
              books[index].img
                ? books[index].img
                : 'https://reactnative.dev/img/tiny_logo.png'
            }`,
          }}
        />
      </View>
      <View
        style={{
          width: '100%',

          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${open ? '#1e1e1e' : '#000000'}`,

          height: '55%',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            marginVertical: 5,
          }}>
          {books[index].titulo}
        </Text>

        <Text style={{color: '#fff'}}>De: {books[index].autor}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: '35%',
            height: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginVertical: 15,
          }}
          onPress={() => {
            navigation.navigate('SingleBook', {id: books[index].id});
          }}>
          <Text style={{fontWeight: '700', color: '#000'}}>Mas info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
