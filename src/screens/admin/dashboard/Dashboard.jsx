import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import GrafikOrangHilang from '../../../componets/grafik/tahunan/GrafikOrangHilang';

const Dashboard = () => {
  return (
    <View>
      <View className="my-2">
        <Text className="text-black text-center text-lg font-[Montserrat-Bold]">
          Selamat Datang Admin
        </Text>
      </View>
      <View className="justify-center w-full">
        <Text className="text-black text-center text-md font-[Montserrat-Bold] mb-2">
          Grafik Orang Hilang
        </Text>
        <GrafikOrangHilang />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
