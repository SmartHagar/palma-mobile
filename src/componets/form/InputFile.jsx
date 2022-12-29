import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {Icon} from '@rneui/themed';
import colors from '../../assets/styles/colors';

const InputFile = ({label, image, ...props}) => {
  return (
    <View>
      <TouchableOpacity {...props}>
        <View className="flex-row justify-between items-center">
          <Text style={{color: colors.hitam}}>{label}</Text>
          <Icon
            name="picture"
            type="antdesign"
            size={24}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>
      {image?.assets && (
        <Image
          source={{uri: image.assets[0].uri}}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            borderRadius: 8,
            marginBottom: 4,
          }}
        />
      )}
    </View>
  );
};

export default InputFile;

const styles = StyleSheet.create({});
