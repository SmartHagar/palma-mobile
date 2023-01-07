import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const About = () => {
  const phoneNumber = '(0967)534161';
  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <SafeAreaView style={styles.contianer}>
      <View className="bg-white/50 rounded-lg py-3 space-y-4 px-2">
        {/* nama n email */}
        <View className="mb-4">
          <Text className="text-black text-center font-[Montserrat-ExtraBold] text-lg">
            Kepolisian Resor (Polres)
          </Text>
          <Text className="text-black text-center font-[Montserrat-ExtraBold] text-lg">
            Kota Jayapura
          </Text>
        </View>
        <View className="space-y-2">
          <View className="flex-row flex-wrap">
            <Text className="w-[20%] text-black font-[Montserrat-SemiBold]">
              Alamat
            </Text>
            <Text className="text-black mr-1">:</Text>
            <Text className="text-black font-[Montserrat-SemiBold] w-[77%]">
              Jl. Ahmad Yani No. 11 Jayapura - Papua
            </Text>
          </View>
          <View className="flex-row">
            <Text className="w-[20%] text-black  font-[Montserrat-SemiBold]">
              Telepon:
            </Text>
            <Text className="text-black mr-1">:</Text>
            <TouchableOpacity onPress={makeCall}>
              <Text className="text-black font-[Montserrat-SemiBold] underline">
                (0967) 534161
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
