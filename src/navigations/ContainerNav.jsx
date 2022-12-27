import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native-stack';
import React from 'react';
import colors from '../assets/styles/colors';
import AdminDraw from './AdminDraw';
import UserTap from './UserTap';
// user
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: 'rgba(255, 255, 255, 0.70)',
  },
};

const ContainerNav = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <AdminDraw /> */}
      <UserTap />
    </NavigationContainer>
  );
};

export default ContainerNav;
