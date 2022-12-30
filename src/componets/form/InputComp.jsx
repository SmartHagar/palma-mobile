import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputComp = ({label, iconName, errorText, password, name, ...props}) => {
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View>
      {label && (
        <Text className="text-black mb-1 mt-2 font-[Roboto-Regular]">
          {label}
        </Text>
      )}
      <View>
        <TextInput
          className={`border text-black py-[1px] px-2 rounded-md font-[Roboto-Regular]`}
          style={{borderColor: errorText ? colors.danger : colors.third}}
          {...props}
          secureTextEntry={hidePassword}></TextInput>
        {password && (
          <TouchableHighlight
            underlayColor="rgba(221, 221, 221, 0.14)"
            className="absolute top-1 right-1"
            onPress={() => setHidePassword(!hidePassword)}>
            <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} />
          </TouchableHighlight>
        )}
      </View>
      {errorText && <Text className="text-red-600">{errorText}</Text>}
    </View>
  );
};

export default InputComp;
