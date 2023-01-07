import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DialogComp from '../../../componets/form/DialogComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import StatusSelect from '../../../componets/select/StatusSelect';
import colors from '../../../assets/styles/colors';
import useUrl from '../../../services/base_url';
import myCapitalize from '../../../services/myCapitalize';
import SpinerLoad from '../../../componets/loading/SpinerLoad';
import moment from 'moment';
import useOrangHilang from '../../../store/crud/orang-hilang';

const Detail = ({visible, setVisible, dtDet, setRefreshing}) => {
  // store
  const {ubahStatus} = useOrangHilang();
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
    const items = {
      status: pilihStatus,
      tgl_laporan: moment(new Date()).format('YYYY-MM-DD'),
    };
    setIsLoading(true);
    const ubah = await ubahStatus(dtDet.id, items);
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
        {/* tgl_hilang */}
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Tgl. Kejadian
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {moment(dtDet.tgl_hilang).format('DD MMMM YYYY')}
          </Text>
        </View>
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
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <View>
            <Text className="text-black font-[Roboto-Regular] text-center underline">
              Pelapor
            </Text>
          </View>
          <View className="flex-row space-x-2">
            <Text className="text-black font-[Roboto-Regular] w-14">Nama</Text>
            <Text className="text-black font-[Roboto-Regular]">
              : {dtDet.pelapor.nama}
            </Text>
          </View>
          <View className="flex-row space-x-2">
            <Text className="text-black font-[Roboto-Regular] w-14">No Hp</Text>
            <Text className="text-black font-[Roboto-Regular]">
              : {dtDet.pelapor.no_hp}
            </Text>
          </View>
          <View className="flex-row space-x-2">
            <Text className="text-black font-[Roboto-Regular] w-14">Email</Text>
            <Text className="text-black font-[Roboto-Regular]">
              : {dtDet.pelapor.user.email}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View>
        <StatusSelect
          isReset={isReset}
          setPilihStatus={setPilihStatus}
          defaultButtonText={
            dtDet ? myCapitalize(dtDet.status) : 'Pilih Status'
          }
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
