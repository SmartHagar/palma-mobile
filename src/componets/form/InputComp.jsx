import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const InputComp = ({label, iconName, errorText, password, name, ...props}) => {
  return (
    <View>
      <Text className="text-black mb-2">{label}</Text>
      <View className="">
        <TextInput
          className={`border text-black py-1 px-2 rounded-lg ${
            errorText ? 'border-red-600' : 'border-black'
          }`}
          {...props}></TextInput>
      </View>
      {errorText && <Text className="text-red-600">{errorText}</Text>}
    </View>
  );
};

export default InputComp;
