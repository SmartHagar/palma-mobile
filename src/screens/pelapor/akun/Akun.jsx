import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useLogin from '../../../store/auth/login';
import BtnPrimary from '../../../componets/button/BtnPrimary';

const Akun = () => {
  // store
  const {setLogout} = useLogin();
  const handleLogout = () => {
    console.log('logout');
    setLogout();
  };
  return (
    <View>
      <BtnPrimary text="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({});
