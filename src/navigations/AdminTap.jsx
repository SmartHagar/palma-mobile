import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icon} from '@rneui/themed';
import colors from '../assets/styles/colors';
import {DashboardStack, SebaranStack} from './AdminStack';
import Akun from '../screens/admin/akun/Akun';

const TapAdmin = createBottomTabNavigator();
const AdminTap = () => {
  return (
    <TapAdmin.Navigator
      initialRouteName="Admin"
      screenOptions={{
        tabBarActiveTintColor: colors.warning,
        tabBarInactiveTintColor: colors.primary,
        tabBarStyle: {backgroundColor: colors.secondary},
        tabBarHideOnKeyboard: true,
      }}>
      <TapAdmin.Screen
        name="DashboardTap"
        component={DashboardStack}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.primary},
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              type="antdesign"
              size={24}
              color={focused ? colors.kuning : colors.putih}
            />
          ),
        }}
      />
      <TapAdmin.Screen
        name="SebaranTap"
        component={SebaranStack}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.hitam},
          tabBarLabel: 'Sebaran',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="map"
              type="materialcommunityicons"
              size={24}
              color={focused ? colors.kuning : colors.putih}
            />
          ),
        }}
      />
      <TapAdmin.Screen
        name="AkunTap"
        component={Akun}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.hitam},
          tabBarLabel: 'Akun',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="map"
              type="materialcommunityicons"
              size={24}
              color={focused ? colors.kuning : colors.putih}
            />
          ),
        }}
      />
    </TapAdmin.Navigator>
  );
};

export default AdminTap;

const styles = StyleSheet.create({});
