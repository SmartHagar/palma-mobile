import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../assets/styles/colors';

const BtnPrimary = ({text, type = 'primary', ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        className="text-white p-2 rounded-md text-center"
        style={{backgroundColor: colors[type]}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnPrimary;

const styles = StyleSheet.create({});
