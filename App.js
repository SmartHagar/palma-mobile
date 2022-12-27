import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ContainerNav from './src/navigations/ContainerNav';
import logo from './src/assets/gambar/logo-polres.png';
const App = () => {
  return (
    <SafeAreaView className="flex-1 text-black">
      <ImageBackground source={logo} resizeMode="contain" style={styles.image}>
        <ContainerNav />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
