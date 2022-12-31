import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import colors from '../assets/styles/colors';
import SpinerLoad from '../componets/loading/SpinerLoad';
import AdminDraw from './AdminDraw';
import UserStack from './UserStack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useLogin from '../store/auth/login';
import PelaporStack from './PelaporStack';

// user
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: 'rgba(255, 255, 255, 0.60)',
  },
};

const ContainerNav = () => {
  // store
  const {dtLogin, setFromStorage} = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      await setFromStorage();
      setIsLoading(false);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  if (isLoading) {
    return <SpinerLoad />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      {/* jika login admin */}
      {dtLogin?.role === 'admin' ? (
        <AdminDraw />
      ) : dtLogin?.role === 'pelapor' ? (
        <PelaporStack />
      ) : (
        <UserStack />
      )}
      {}
      {/* jika tidak login */}
      {/* <UserStack /> */}
    </NavigationContainer>
  );
};

export default ContainerNav;
