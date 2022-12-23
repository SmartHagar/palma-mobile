import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/base';
import colors from '../assets/styles/colors';

const DrawToogle = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu-fold" type="antdesign" size={24} color={colors.putih} />
    </TouchableOpacity>
  );
};

export default DrawToogle;
