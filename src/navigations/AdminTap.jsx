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
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.putih,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.third,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <TapAdmin.Screen
        name="DashboardTap"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>Dashboard</Text>
            ) : (
              <Text style={styles.nonActive}>Dashboard</Text>
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              type="antdesign"
              size={24}
              color={focused ? colors.active : colors.putih}
            />
          ),
        }}
      />
      <TapAdmin.Screen
        name="SebaranTap"
        component={SebaranStack}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>Sebaran</Text>
            ) : (
              <Text style={styles.nonActive}>Sebaran</Text>
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="map"
              type="materialcommunityicons"
              size={24}
              color={focused ? colors.active : colors.putih}
            />
          ),
        }}
      />
      <TapAdmin.Screen
        name="AkunTap"
        component={Akun}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>Akun</Text>
            ) : (
              <Text style={styles.nonActive}>Akun</Text>
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="map"
              type="materialcommunityicons"
              size={24}
              color={focused ? colors.active : colors.putih}
            />
          ),
        }}
      />
    </TapAdmin.Navigator>
  );
};

export default AdminTap;

const styles = StyleSheet.create({
  active: {
    color: colors.active,
    fontWeight: 'bold',
  },
  nonActive: {
    color: colors.putih,
  },
});
