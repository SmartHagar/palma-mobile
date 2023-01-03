import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import useLogin from '../../../store/auth/login';

const Akun = () => {
  // store
  const {setLogout, setFromStorage, dtLogin} = useLogin();
  const handleLogout = () => {
    console.log('logout');
    setLogout();
  };

  // use effect
  useEffect(() => {
    setFromStorage();

    return () => {};
  }, []);

  return (
    <View className="h-full justify-center items-center">
      <View className="w-[80%] bg-white/50 rounded-lg py-3 space-y-4">
        {/* nama n email */}
        <View>
          <Text className="text-black text-2xl font-[Montserrat-Black] text-center">
            {dtLogin.role}
          </Text>
          <Text className="text-black text-xl font-[Montserrat-LightItalic]  text-center">
            {dtLogin.email}
          </Text>
        </View>
        {console.log(dtLogin)}
        <BtnPrimary text="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Akun;
