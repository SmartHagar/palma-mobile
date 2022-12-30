import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/styles/colors';
import OrangHilang from '../screens/users/daftar/OrangHilang';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PelaporTap from './PelaporTap';

const Stack = createNativeStackNavigator();

const PelaporStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardStack"
        options={{
          headerShown: false,
        }}
        component={PelaporTap}
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

export default PelaporStack;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});
