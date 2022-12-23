import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardUser from '../screens/users/dashboard/DashboardUser';
import Peta from '../screens/users/peta/Peta';
import About from '../screens/users/about/About';
import Register from '../screens/users/register/Register';
import {Icon} from '@rneui/themed';
import colors from '../assets/styles/colors';

const UserTap = createBottomTabNavigator();

const TapUser = () => {
  return (
    <UserTap.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: colors.kuning,
        tabBarInactiveTintColor: colors.putih,
        tabBarStyle: {backgroundColor: colors.hitam},
        tabBarHideOnKeyboard: true,
      }}>
      <UserTap.Screen
        name="Dashboard"
        component={DashboardUser}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.primary},
          tabBarLabel: 'Home',
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
      <UserTap.Screen
        name="Peta"
        component={Peta}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.hitam},
          tabBarLabel: 'Peta',
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
      <UserTap.Screen
        name="About"
        component={About}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.hitam},
          tabBarLabel: 'About',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="infocirlceo"
              type="antdesign"
              size={24}
              color={focused ? colors.kuning : colors.putih}
            />
          ),
        }}
      />
      <UserTap.Screen
        name="Register"
        component={Register}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 16},
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: colors.hitam},
          tabBarLabel: 'Register',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              type="antdesign"
              size={24}
              color={focused ? colors.kuning : colors.putih}
            />
          ),
        }}
      />
    </UserTap.Navigator>
  );
};

export default TapUser;

const styles = StyleSheet.create({});
