import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ContainerNav from './src/navigations/ContainerNav';
const App = () => {
  return (
    <SafeAreaView className="flex-1 text-black">
      <ContainerNav />
    </SafeAreaView>
  );
};

export default App;
