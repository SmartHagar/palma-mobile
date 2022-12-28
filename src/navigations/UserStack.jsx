import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/styles/colors';
import OrangHilang from '../screens/users/daftar/OrangHilang';
import UserTap from './UserTap';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardStack"
        options={{
          headerShown: false,
        }}
        component={UserTap}
      />
      <Stack.Screen
        name="DaftarOrangHilangStack"
        options={{
          title: 'Daftar Orang Hilang',
          headerStyle: styles.headerStyle,
          headerTintColor: colors.putih,
          headerTitleStyle: styles.headerTitleStyle,
        }}
        component={OrangHilang}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});
