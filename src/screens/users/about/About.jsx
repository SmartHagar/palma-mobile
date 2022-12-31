import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const About = () => {
  const phoneNumber = '0967591300';
  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View className="justify-center h-full mx-4">
      <View className="mb-4">
        <Text className="text-black text-center font-[Montserrat-ExtraBold] text-lg">
          Kepolisian Resor (Polres)
        </Text>
        <Text className="text-black text-center font-[Montserrat-ExtraBold] text-lg">
          Kota Jayapura
        </Text>
      </View>
      <View className="space-y-2">
        <View className="flex-row">
          <Text className="w-16 text-black font-[Montserrat-SemiBold]">
            Alamat:
          </Text>
          <Text className="text-black font-[Montserrat-SemiBold]">
            Jl. Yowanibi, Doyo Baru, Distrik Waibu, Kabupaten Jayapura, Papua
            99352
          </Text>
        </View>
        <View className="flex-row">
          <Text className="w-16 text-black  font-[Montserrat-SemiBold]">
            Telepon:
          </Text>
          <TouchableOpacity onPress={makeCall}>
            <Text className="text-black font-[Montserrat-SemiBold]">
              (0967) 591300
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
