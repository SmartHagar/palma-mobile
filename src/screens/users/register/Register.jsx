import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../assets/styles/colors';
import InputComp from '../../../componets/form/InputComp';
import KeyboardAvoiding from '../../../componets/form/KeyboardAvoiding';
import BtnPrimary from '../../../componets/button/BtnPrimary';

const Register = () => {
  return (
    <KeyboardAvoiding>
      <View className="h-screen">
        <View style={{backgroundColor: colors.primary}}>
          <Text className="text-white font-[Roboto-Regular] text-center py-2 text-lg">
            Masukan data pelapor
          </Text>
        </View>
        <ScrollView className="w-[98%] mx-auto mb-20">
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <InputComp label="Nama" />
          </View>
          <View>
            <BtnPrimary text="Simpan" />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoiding>
  );
};

export default Register;
