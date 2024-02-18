import React, {useEffect, useRef, useState} from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import 'react-native-gesture-handler';
import axios from 'axios';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import CarouselCard from '../components/CarouselCard';
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
} from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

import useStore from '../store/booksStore';
interface carouselIndex {
  id: string;
  autor: string;
  categoria: string;
  titulo: string;
}

function Home({navigation}: any): React.JSX.Element {
  const {books, fetchAllData, loading} = useStore(state => state);

  useEffect(() => {
    fetchAllData();
  }, []);

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
  } as const;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: getStatusBarHeight(),
      }}>
      <View
        style={{
          width: '100%',
          height: '20%',
          backgroundColor: '#fff',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create');
          }}
          style={{
            backgroundColor: '#000',
            marginRight: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#fff',
              padding: 10,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            Agregar un libro
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '70%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text>loading...</Text>
        </View>
      ) : (
        <>
          {books[0] === undefined ? (
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No hay ningun libro listado</Text>
            </View>
          ) : (
            <></>
          )}
          <Carousel
            {...baseOptions}
            loop={false}
            ref={ref}
            style={{width: '100%', justifyContent: 'center'}}
            autoPlay={false}
            data={books}
            pagingEnabled={false}
            renderItem={({index, animationValue}) => {
              return (
                <CarouselCard
                  key={index}
                  index={index}
                  navigation={navigation}
                />
              );
            }}
          />
        </>
      )}
    </View>
  );
}

export {Home};
