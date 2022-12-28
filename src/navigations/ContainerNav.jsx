import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native-stack';
import React from 'react';
import colors from '../assets/styles/colors';
import AdminDraw from './AdminDraw';
import UserStack from './UserStack';
import UserTap from './UserTap';
// user
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: 'rgba(255, 255, 255, 0.60)',
  },
};

const ContainerNav = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <AdminDraw /> */}
      <UserStack />
    </NavigationContainer>
  );
};

export default ContainerNav;
