import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DialogComp from '../../../componets/form/DialogComp';

const Detail = ({visible, setVisible, dtDet}) => {
  return (
    <DialogComp openForm={visible} judul={dtDet.nama}>
      {console.log(dtDet)}
      <ScrollView>
        <View>
          <Text>Hallo</Text>
        </View>
      </ScrollView>
      <View className="flex-row space-x-2 mt-4">
        <TouchableOpacity>
          <Text className="text-black">Ubah Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text className="text-black">Tutup</Text>
        </TouchableOpacity>
      </View>
    </DialogComp>
  );
};

export default Detail;

const styles = StyleSheet.create({});
