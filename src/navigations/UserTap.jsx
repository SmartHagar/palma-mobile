import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardUser from '../screens/users/dashboard/DashboardUser';
import Peta from '../screens/users/peta/Peta';
import About from '../screens/users/about/About';
import {Icon} from '@rneui/themed';
import colors from '../assets/styles/colors';
import Login from '../screens/users/login/Login';

const TapUser = createBottomTabNavigator();

const UserTap = () => {
  return (
    <TapUser.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.putih,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.third,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <TapUser.Screen
        name="Dashboard"
        component={DashboardUser}
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
      <TapUser.Screen
        name="Peta"
        component={Peta}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>Peta</Text>
            ) : (
              <Text style={styles.nonActive}>Peta</Text>
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
      <TapUser.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>About</Text>
            ) : (
              <Text style={styles.nonActive}>About</Text>
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="infocirlceo"
              type="antdesign"
              size={24}
              color={focused ? colors.active : colors.putih}
            />
          ),
        }}
      />
      <TapUser.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarLabel: ({tintColor, focused, item}) => {
            return focused ? (
              <Text style={styles.active}>Login</Text>
            ) : (
              <Text style={styles.nonActive}>Login</Text>
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              type="antdesign"
              size={24}
              color={focused ? colors.active : colors.putih}
            />
          ),
        }}
      />
    </TapUser.Navigator>
  );
};

export default UserTap;

const styles = StyleSheet.create({
  active: {
    color: colors.active,
    fontFamily: 'Roboto-Bold',
  },
  nonActive: {
    color: colors.putih,
    fontFamily: 'Roboto-Regular',
  },
});
