import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import colors from '../../../assets/styles/colors';
import useUrl from '../../../services/base_url';

const MyDialog = ({setVisible, visible, deleteData, dtDet, setIsReset}) => {
  const {BASE_URL} = useUrl();

  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    setVisible(false);
    // data di hapus
    deleteData();
    setIsReset(true);
  };
  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        backgroundColor: colors.putih,
      }}>
      <View className="-m-2 -mt-8">
        <View>
          <View className="flex-row">
            <Image
              className="h-28 w-28"
              resizeMode="contain"
              source={{uri: BASE_URL + '/' + dtDet.orang_hilang.foto}}
            />
            <View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Nama</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">{dtDet.orang_hilang.nama}</Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Umur</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">{dtDet.orang_hilang.umur}</Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Alamat</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">{dtDet.orang_hilang.alamat}</Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Pelapor</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">
                  {dtDet.orang_hilang.pelapor.nama}
                </Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Penemu</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">{dtDet.nm_penemu}</Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="text-black w-16">Tempat</Text>
                <Text className="text-black">:</Text>
                <Text className="text-black">{dtDet.alamat_ketemu}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row justify-center space-x-2 mt-2">
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              color: colors.primary,
              borderColor: colors.primary,
            }}
            className="border rounded-xl">
            <Text
              className="py-1 px-1"
              style={{
                color: colors.primary,
              }}>
              Tutup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={{
              color: colors.danger,
              borderColor: colors.danger,
            }}
            className="border rounded-xl">
            <Text
              className="py-1 px-1"
              style={{
                color: colors.danger,
              }}>
              Hapus
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog.Container>
  );
};

export default MyDialog;

const styles = StyleSheet.create({});
