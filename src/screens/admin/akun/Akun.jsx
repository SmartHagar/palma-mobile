import {View, Text} from 'react-native';
import React from 'react';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import useLogin from '../../../store/auth/login';

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
