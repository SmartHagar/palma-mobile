import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const InputComp = ({
  label,
  iconName,
  errorText,
  password,
  onSubmit,
  name,
  handleSubmit,
  ...props
}) => {
  return (
    <View>
      <Text className="text-black mb-2">{label}</Text>
      <View className="">
        <TextInput
          className={`border text-black py-1 px-2 rounded-lg ${
            errorText ? 'border-red-600' : 'border-black'
          }`}
          {...props}
          onSubmitEditing={handleSubmit(onSubmit)}></TextInput>
      </View>
      {errorText && <Text className="text-red-600">{errorText}</Text>}
    </View>
  );
};

export default InputComp;
