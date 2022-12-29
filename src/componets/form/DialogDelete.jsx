import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import colors from '../../assets/styles/colors';

const DialogDelete = ({setVisible, visible, deleteData}) => {
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    setVisible(false);
    // data di hapus
    deleteData();
  };
  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        backgroundColor: colors.putih,
      }}>
      <Dialog.Title className="text-black -mt-5">
        Yakin untuk menghapus?
      </Dialog.Title>
      <Dialog.Description className="text-black">
        Data yang dihapus tidak bisa dikembalikan
      </Dialog.Description>
      <View className="flex-row justify-end space-x-2">
        <Dialog.Button
          label="Batal"
          onPress={handleCancel}
          style={{
            color: colors.secondary,
            borderColor: colors.secondary,
          }}
          className="border rounded-xl"
        />
        <Dialog.Button
          label="Yakin"
          onPress={handleDelete}
          style={{
            color: colors.primary,
            borderColor: colors.primary,
          }}
          className="border rounded-xl"
        />
      </View>
    </Dialog.Container>
  );
};

export default DialogDelete;

const styles = StyleSheet.create({});
