import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DialogComp from '../../../componets/form/DialogComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import StatusSelect from '../../../componets/select/StatusSelect';
import colors from '../../../assets/styles/colors';
import useUrl from '../../../services/base_url';
import capitalize from '../../../services/capitalize';
import usePelapor from '../../../store/crud/pelapor';
import SpinerLoad from '../../../componets/loading/SpinerLoad';

const Detail = ({visible, setVisible, dtDet, setRefreshing}) => {
  // store
  const {ubahStatus} = usePelapor();
  // state
  const [isReset, setIsReset] = useState(false);
  const [pilihStatus, setPilihStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {BASE_URL} = useUrl();

  useEffect(() => {
    setPilihStatus(dtDet.status);

    return () => {
      setIsReset(true);
    };
  }, [dtDet]);

  const onSubmit = async () => {
    setIsLoading(true);
    const ubah = await ubahStatus(dtDet.id, {status: pilihStatus});
    setIsLoading(false);
    setVisible(false);
    setRefreshing(true);
  };
  return (
    <DialogComp openForm={visible} judul={dtDet.nama} height="90%">
      <ScrollView
        className="mb-2 space-y-1"
        style={{borderColor: colors.third}}>
        {/* NO KTP */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. KTP
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_ktp}
          </Text>
        </View>
        {/* Foto KTP */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Foto KTP
          </Text>
          <Image
            source={{uri: BASE_URL + '/' + dtDet.foto_ktp}}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 8,
              marginBottom: 4,
            }}
          />
        </View>
        {/* No KK */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. KK
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_kk}
          </Text>
        </View>
        {/* Foto KK */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Foto KK
          </Text>
          <Image
            source={{uri: BASE_URL + '/' + dtDet.foto_kk}}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 8,
              marginBottom: 4,
            }}
          />
        </View>
        {/* No HP */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. HP
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_hp}
          </Text>
        </View>
        {/* Email */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Email
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.user?.email}
          </Text>
        </View>
        {/* Distrik */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Distrik
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.distrik?.nama}
          </Text>
        </View>
        {/* Alamat */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Alamat
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.alamat}
          </Text>
        </View>
      </ScrollView>
      <View>
        <StatusSelect
          isReset={isReset}
          setPilihStatus={setPilihStatus}
          defaultButtonText={dtDet ? capitalize(dtDet.status) : 'Daftar Item'}
        />
      </View>
      <View className="space-y-2 mt-4">
        {isLoading ? (
          <SpinerLoad />
        ) : (
          <View>
            <BtnPrimary onPress={onSubmit} text="Ubah Status" />
          </View>
        )}
        <View className="w-[80%] mx-auto">
          <BtnPrimary
            onPress={() => setVisible(false)}
            type="secondary"
            text="Tutup"
          />
        </View>
      </View>
    </DialogComp>
  );
};

export default Detail;

const styles = StyleSheet.create({});
