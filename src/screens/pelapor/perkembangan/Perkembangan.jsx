import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComp from '../../../componets/form/InputComp';
import ListData from './ListData';
import {useIsFocused} from '@react-navigation/native';
import useLogin from '../../../store/auth/login';
import usePerkembanganAPI from '../../../store/api/perkembangan';

const Perkembangan = () => {
  // store
  const {setApiPerkembangan} = usePerkembanganAPI();
  const {dtLogin, setFromStorage} = useLogin();
  // state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dtPerkembangan, setDtPerkembangan] = useState([]);

  // other
  const isFocused = useIsFocused();
  // ambil data
  const fetch = async () => {
    if (page === 1) {
      setIsLoading(true);
    }
    const res = await setApiPerkembangan();
    const data = res.data;
    const {pelapor} = dtLogin;
    const filterData = data.filter(
      item => item.laporan.orang_hilang.pelapor_id === pelapor.id,
    );

    setDtPerkembangan(filterData);
    setIsLoading(false);
  };
  // use effect
  useEffect(() => {
    fetch();
    setFromStorage();
    return () => {};
  }, [page, isFocused]);

  // use effect

  refreshing && (setPage(1), fetch(), setRefreshing(false));

  const handleSearch = async () => {
    await setPerkembangan({search});
  };

  const showData = () => {
    return isLoading ? (
      <View>
        <Text className="text-center text-black mt-[50%]">
          Sedang mengambil data...
        </Text>
      </View>
    ) : (
      <ListData
        dataList={dtPerkembangan}
        setRefreshing={setRefreshing}
        refreshing={refreshing}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
      />
    );
  };
  return (
    <View className="bg-white/70 h-full">
      <View className="mb-2 mx-2">
        <Text className="text-black font-[Roboto-Regular] my-1text-justify">
          Untuk melihat detail informasi perkembangan pencarian orang hilang,
          silahkan tekan pada nama orang hilang yang ingin dilihat
        </Text>
        <InputComp
          onSubmitEditing={handleSearch}
          onChangeText={setSearch}
          placeholder="Cari nama orang hilang"
        />
      </View>
      <View className="h-full">{showData()}</View>
    </View>
  );
};

export default Perkembangan;

const styles = StyleSheet.create({});
