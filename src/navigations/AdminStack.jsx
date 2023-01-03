import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/admin/dashboard/Dashboard';
import Sebaran from '../screens/admin/sebaran/Sebaran';
import Distrik from '../screens/admin/distrik/Distrik';
import Pelapor from '../screens/admin/pelapor/Pelapor';
import OrangHilang from '../screens/admin/orang-hilang/OrangHilang';
import Laporan from '../screens/admin/laporan/Laporan';
import OrangKetemu from '../screens/admin/orang-ketemu/OrangKetemu';
import {Button} from '@rneui/base';
import DrawToogle from './DrawToogle';
import colors from '../assets/styles/colors';
import Akun from '../screens/admin/akun/Akun';
const Stack = createNativeStackNavigator();

const DashboardStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardStack"
        options={{
          title: 'Dashboard',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};

const SebaranStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SebaranStack"
        component={Sebaran}
        options={{
          title: 'Sebaran',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DistrikStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DistrikStack"
        component={Distrik}
        options={{
          title: 'Distrik',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PelaporStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PelaporStack"
        component={Pelapor}
        options={{
          title: 'Pelapor',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const OrangHilangStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrangHilangStack"
        component={OrangHilang}
        options={{
          title: 'Orang Hilang',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const LaporanStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LaporanStack"
        component={Laporan}
        options={{
          title: 'Laporan',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const OrangKetemuStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrangKetemuStack"
        component={OrangKetemu}
        options={{
          title: 'Orang Ketemu',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AkunStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AkunStack"
        component={Akun}
        options={{
          title: 'Akun',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <View style={styles.btn}>
              <DrawToogle navigation={navigation} />
            </View>
          ),
        }}
      />
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
