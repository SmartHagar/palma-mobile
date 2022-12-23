import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import {Dialog} from '@rneui/themed';

const DialogComp = ({children, judul, openForm}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Dialog
        isVisible={openForm}
        overlayStyle={styles.containerDialog}
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

const styles = StyleSheet.create({
  containerDialog: {
    maxHeight: '60%',
  },
});
