import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';

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
    <Dialog.Container visible={visible}>
      <Dialog.Title>Yakin untuk menghapus?</Dialog.Title>
      <Dialog.Description>
        Data yang dihapus tidak bisa dikembalikan
      </Dialog.Description>
      <View className="flex-row justify-end space-x-2">
        <Dialog.Button
          label="Batal"
          onPress={handleCancel}
          className="text-blue-600 border-gray-100 border rounded-xl"
        />
        <Dialog.Button
          label="Yakin"
          onPress={handleDelete}
          className="text-red-600 border-gray-100 border rounded-xl"
        />
      </View>
    </Dialog.Container>
  );
};

export default DialogDelete;

const styles = StyleSheet.create({});
