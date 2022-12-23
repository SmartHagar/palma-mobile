import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native-stack';
import React from 'react';
import colors from '../assets/styles/colors';
import AdminDraw from './AdminDraw';
// user
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: colors.primary,
  },
};

const ContainerNav = () => {
  return (
    <NavigationContainer>
      <AdminDraw />
    </NavigationContainer>
  );
};

export default ContainerNav;
