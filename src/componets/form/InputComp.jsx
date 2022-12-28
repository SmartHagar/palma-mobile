import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/styles/colors';

const InputComp = ({label, iconName, errorText, password, name, ...props}) => {
  return (
    <View>
      <Text className="text-black mb-1 font-[Roboto-Regular]">{label}</Text>
      <View className="">
        <TextInput
          className={`border text-black py-[1px] px-2 rounded-sm font-[Roboto-Regular]`}
          style={{borderColor: errorText ? colors.danger : colors.third}}
          {...props}></TextInput>
      </View>
      {errorText && <Text className="text-red-600">{errorText}</Text>}
    </View>
  );
};

export default InputComp;
