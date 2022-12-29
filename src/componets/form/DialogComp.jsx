import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import {Dialog} from '@rneui/themed';

const DialogComp = ({children, judul, openForm, height = '60%'}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Dialog
        isVisible={openForm}
        overlayStyle={{maxHeight: height}}
        onBackdropPress={Keyboard.dismiss}>
        <Text className="text-center text-black text-lg mb-2 font-bold border-b pb-2 -mt-4">
          {judul}
        </Text>
        {children}
      </Dialog>
    </KeyboardAvoidingView>
  );
};

export default DialogComp;
