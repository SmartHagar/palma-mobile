import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/admin/dashboard/Dashboard';
import Sebaran from '../screens/admin/sebaran/Sebaran';
import Distrik from '../screens/admin/distrik/Distrik';
import Pelapor from '../screens/admin/pelapor/Pelapor';
import OrangHilang from '../screens/admin/orang-hilang/OrangHilang';
import Laporan from '../screens/admin/laporan/Laporan';
import OrangKetemu from '../screens/admin/orang-ketemu/OrangKetemu';
import DrawToogle from './DrawToogle';
import colors from '../assets/styles/colors';
import Akun from '../screens/admin/akun/Akun';
const Stack = createNativeStackNavigator();

import {appName} from '../services/my-variable';
import Perkembangan from '../screens/admin/perkembangan/Perkembangan';

const Judul = () => (
  <View className="flex-1">
    <Text className="text-white text-lg font-[Montserrat-Bold] text-center mr-5">
      {appName}
    </Text>
  </View>
);

const DashboardStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="DashboardStack" component={Dashboard} />
    </Stack.Navigator>
  );
};

const SebaranStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="SebaranStack" component={Sebaran} />
    </Stack.Navigator>
  );
};

const DistrikStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="DistrikStack" component={Distrik} />
    </Stack.Navigator>
  );
};

const PelaporStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="PelaporStack" component={Pelapor} />
    </Stack.Navigator>
  );
};

const OrangHilangStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="OrangHilangStack" component={OrangHilang} />
    </Stack.Navigator>
  );
};

const LaporanStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="LaporanStack" component={Laporan} />
    </Stack.Navigator>
  );
};

const OrangKetemuStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="OrangKetemuStack" component={OrangKetemu} />
    </Stack.Navigator>
  );
};

const AkunStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="AkunStack" component={Akun} />
    </Stack.Navigator>
  );
};
const PerkembanganStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={styles.btn}>
            <DrawToogle navigation={navigation} />
          </View>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: () => <Judul />,
      }}>
      <Stack.Screen name="PerkembanganStack" component={Perkembangan} />
    </Stack.Navigator>
  );
};

export {
  DashboardStack,
  SebaranStack,
  DistrikStack,
  PelaporStack,
  OrangHilangStack,
  LaporanStack,
  OrangKetemuStack,
  AkunStack,
  PerkembanganStack,
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});
