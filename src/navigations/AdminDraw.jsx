import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminTap from './AdminTap';
import {
  DistrikStack,
  LaporanStack,
  OrangHilangStack,
  OrangKetemuStack,
  PelaporStack,
} from './AdminStack';
import colors from '../assets/styles/colors';

const Drawer = createDrawerNavigator();
const AdminDraw = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Admin"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'rgb(255, 255, 255)',
        },
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.putih,
        drawerLabelStyle: {
          fontFamily: 'Roboto-Regular',
        },
      }}>
      <Drawer.Screen
        name="DashboardDraw"
        options={{
          headerShown: false,
          title: 'Dashboard',
        }}
        component={AdminTap}
      />
      <Drawer.Screen
        name="DistrikDraw"
        options={{
          headerShown: false,
          title: 'Distrik',
        }}
        component={DistrikStack}
      />
      <Drawer.Screen
        name="PelaporDraw"
        options={{
          headerShown: false,
          title: 'Pelapor',
        }}
        component={PelaporStack}
      />
      <Drawer.Screen
        name="OrangHilangDraw"
        options={{
          headerShown: false,
          title: 'Orang Hilang',
        }}
        component={OrangHilangStack}
      />
      {/* <Drawer.Screen
        name="LaporanDraw"
        options={{
          headerShown: false,
          title: 'Laporan',
        }}
        component={LaporanStack}
      /> */}
      <Drawer.Screen
        name="OrangKetemuDraw"
        options={{
          headerShown: false,
          title: 'Orang Ketemu',
        }}
        component={OrangKetemuStack}
      />
    </Drawer.Navigator>
  );
};

export default AdminDraw;

const styles = StyleSheet.create({});
