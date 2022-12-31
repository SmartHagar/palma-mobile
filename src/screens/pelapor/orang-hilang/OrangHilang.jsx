import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useLogin from '../../../store/auth/login';
import useOrangHilang from '../../../store/crud/orang-hilang';
import FormOrangHilang from './Form';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import ListData from './ListData';

const OrangHilang = () => {
  // state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dataToast, setDataToast] = useState(false);

  // ambil data pelapor
  const {setFromStorage, dtLogin} = useLogin();
  useEffect(() => {
    setFromStorage();

    return () => {};
  }, []);

  // cek pelapor pernah melaporkan orang hilang
  const {showOrangHilang, dtOrangHilang, responses} = useOrangHilang();
  const cekPelapor = async () => {
    const {data} = await showOrangHilang({id: dtLogin?.pelapor.id});
    const cek = data.data;
    if (cek.length > 0) {
      setOpenForm(false);
    }
  };
  // jika belum pernah maka tampilkan form
  useEffect(() => {
    cekPelapor();
    return () => {};
  }, []);

  // jika pernah maka yang ditampilkan adalah list laporannya
  const showData = () => {
    return isLoading ? (
      <View>
        <Text className="text-center text-black mt-[50%]">
          Sedang mengambil data...
        </Text>
      </View>
    ) : (
      <ListData
        dataList={dtOrangHilang}
        setRefreshing={setRefreshing}
        refreshing={refreshing}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        responses={responses}
      />
    );
  };
  // cek data yang diproses
  // jika ada sembunyikan tambah data jika tidak tampilkan tambah data
  // beri warna merah jika laporan ditolak, warna primary jika laporan diproses, warna putih jika laporan diterima
  // cek apakah laporan telah terdapat informasi lokasi
  // jika lokasi belum ada tambah tombol tambah lokasi jika sudah ada ubah lokasi

  return (
    <View className="bg-white/70 h-full">
      {/* buka form */}
      {openForm && (
        <FormOrangHilang
          openForm={openForm}
          setOpenForm={setOpenForm}
          dtOrangHilang={dtOrangHilang}
        />
      )}
      <View className="flex-row justify-between my-2 mx-2">
        <Text className="text-black font-[Roboto-Regular]">
          Daftar orang hilang yang anda laporkan
        </Text>
        <BtnPrimary
          text="Tambah data"
          onPress={() => setOpenForm(true)}
          type="secondary"
        />
      </View>
      <View>{showData()}</View>
    </View>
  );
};

export default OrangHilang;

const styles = StyleSheet.create({});
