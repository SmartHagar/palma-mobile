import {View, ScrollView, StyleSheet, Image, Text} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import React from 'react';
import img from '../../../assets/gambar/logo-polres.png';
import BackroundComp from '../../../assets/styles/BackroundComp';
const DashboardUser = () => {
  return (
    <BackroundComp>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <ScrollView>
        <Text>
          I'm the non blurred text because I got rendered on top of the BlurView
        </Text>
      </ScrollView>
    </BackroundComp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DashboardUser;
