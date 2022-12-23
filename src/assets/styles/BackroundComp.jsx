import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import colors from './colors';
import imgBg1 from '../background/bg-1.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BackroundComp = props => {
  return (
    <ImageBackground resizeMode="cover" style={styles.img} source={imgBg1}>
      {props.children}
    </ImageBackground>
  );
};

export default BackroundComp;

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
  },
});
