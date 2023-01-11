import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect} from 'react';
import colors from '../../../assets/styles/colors';
import logo from '../../../assets/gambar/logo-polres.png';

import aturan from './aturan';
import {useNavigation} from '@react-navigation/native';
import useLogin from '../../../store/auth/login';
import GrafikOrangHilangTahunan from '../../../componets/grafik/tahunan/GrafikOrangHilang';
import useOrangHilang from '../../../store/crud/orang-hilang';

const DashboardUser = () => {
  // store
  const {dtLogin, setFromStorage} = useLogin();
  const {showOrangHilang, dtOrangHilang} = useOrangHilang();
  // navigation
  const navigation = useNavigation();
  // use effect
  useEffect(() => {
    setFromStorage();

    return () => {};
  }, []);

  // cek pelapor
  useEffect(() => {
    if (dtLogin.pelapor) {
      showOrangHilang({id: dtLogin.pelapor.id});
    }
    return () => {};
  }, [dtLogin]);

  return (
    <SafeAreaView style={styles.container} className="bg-white/50">
      {/* kop / logo */}
      {/* {console.log(dtLogin.pelapor.id)} */}
      <View className="flex-row justify-start items-center space-x-4 mt-2 ml-1">
        <View>
          <Image
            source={logo}
            style={{resizeMode: 'stretch'}}
            className="w-12 h-16"
          />
        </View>
        <View>
          <Text style={styles.kop}>Kepolisian Resor (Polres) </Text>
          <Text style={styles.kop}>Kota Jayapura</Text>
        </View>
      </View>
      {/* scroll */}
      <ScrollView className="mt-4">
        {/* prosedur pelaporan */}
        <View>
          <Text className="text-black text-center font-[Roboto-Regular] text-lg">
            Prosedur
          </Text>
          <Text className="text-black text-center font-[Roboto-Regular] text-lg -mt-1">
            Pelaporan Orang Hilang
          </Text>
          {/* List */}
          <View className=" w-[95%] mx-auto mt-2 mb-6">
            {aturan &&
              aturan.map((row, index) => (
                <View className="flex-row space-x-1 mb-1" key={index}>
                  <Text className="text-black font-[Roboto-Regular]">
                    {index + 1}.
                  </Text>
                  <Text className="text-black font-[Roboto-Regular]">
                    {row}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        {/* button */}
        <View className="flex-row justify-center space-x-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('DaftarOrangHilangStack')}
            className="rounded-lg"
            style={{backgroundColor: colors.secondary}}>
            <Text className="text-white font-[Roboto-Regular] p-2">
              Daftar Orang Hilang
            </Text>
          </TouchableOpacity>
          {dtLogin?.role === 'pelapor' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('OrangHilangStack')}
              className="rounded-lg"
              style={{backgroundColor: colors.secondary}}>
              <Text className="text-white  font-[Roboto-Regular] p-2">
                Laporkan Orang Hilang
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
        {/* jika pernah melapor */}
        {dtLogin?.role === 'pelapor' &&
          dtOrangHilang &&
          dtOrangHilang.length > 0 && (
            <View className="w-40 mx-auto mt-2">
              <TouchableOpacity
                onPress={() => navigation.navigate('PerkembanganStack')}
                className="rounded-lg"
                style={{backgroundColor: colors.secondary}}>
                <Text className="text-white font-[Roboto-Regular] p-2">
                  Perkembangan Pencarian
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {/* Grafik */}
        <View className="my-5">
          <View className="mb-1">
            <Text className="font-[Roboto-Regular] text-black text-center text-lg">
              Grafik Orang Hilang
            </Text>
          </View>
          <View>
            <GrafikOrangHilangTahunan />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kop: {
    fontFamily: 'Montserrat-ExtraBold',
    color: colors.hitam,
    fontSize: 16,
  },
});
