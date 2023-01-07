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
import capitalize from '../../../services/myCapitalize';
import usePelapor from '../../../store/crud/pelapor';
import SpinerLoad from '../../../componets/loading/SpinerLoad';
import myCapitalize from '../../../services/myCapitalize';

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
        {/* Foto */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Foto {dtDet.nama}
          </Text>
          <Image
            source={{uri: BASE_URL + '/' + dtDet.foto}}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 8,
              marginBottom: 4,
            }}
          />
        </View>
        {/* NO KTP */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. KTP
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_ktp === 'undefined' ? '-' : dtDet.no_ktp}
          </Text>
        </View>

        {/* No KK */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. KK
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_kk === 'undefined' ? '-' : dtDet.no_kk}
          </Text>
        </View>
        {/* No HP */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            No. HP
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.no_hp === 'undefined' ? '-' : dtDet.no_hp}
          </Text>
        </View>
        {/* suku */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Suku
          </Text>
          <Text className="text-black font-[Roboto-Regular]">{dtDet.suku}</Text>
        </View>
        {/* berat */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Berat
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.berat}
          </Text>
        </View>
        {/* warna_rambut */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Warna Rambut
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.warna_rambut}
          </Text>
        </View>
        {/* jenis_rambut */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Jenis Rambut
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.jenis_rambut}
          </Text>
        </View>
        {/* warna_kulit */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Warna Kulit
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.warna_kulit}
          </Text>
        </View>
        {/* pakaian_terakhir */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Pakaian Terakhir
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.pakaian_terakhir}
          </Text>
        </View>
        {/* hubungan */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Hubungan
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.hubungan}
          </Text>
        </View>
        {/* alamat */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Alamat Terakhir
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.alamat}
          </Text>
        </View>
        {/* status */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Status Laporan
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {myCapitalize(dtDet.status)}
          </Text>
        </View>
      </ScrollView>
      <View className="space-y-2 mt-4">
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
