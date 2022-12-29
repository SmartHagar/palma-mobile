import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputComp from '../../../componets/form/InputComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import KeyboardAvoiding from '../../../componets/form/KeyboardAvoiding';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  // navigation
  const navigation = useNavigation();
  return (
    <View className="h-full">
      <KeyboardAvoiding>
        <View className="items-center justify-center h-full">
          <View className="bg-white/70 w-[80%] py-2 px-4 rounded-md">
            <View className="mb-5">
              <Text className="text-black font-[Roboto-Bold] text-center text-[16px]">
                Silahkan login untuk akses selanjutnya
              </Text>
            </View>
            <View>
              <InputComp label="Email" autoCapitalize="none" />
            </View>
            <View>
              <InputComp label="Password" autoCapitalize="none" />
            </View>
            <View className="my-2">
              <BtnPrimary text="Login" />
            </View>
            <View>
              <Text className="text-gray-800 font-[Roboto-Regular] text-center">
                Belum punya akun? Silahkan daftar dengan menekan tombol daftar
              </Text>
            </View>
            <View className="flex-row justify-center my-2">
              <BtnPrimary
                type="third"
                text="Daftar"
                onPress={() => navigation.navigate('RegisterStack')}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoiding>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
