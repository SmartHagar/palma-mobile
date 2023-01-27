import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useLaporan from '../../../store/crud/laporan';
import Form from './Form';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import DialogDelete from '../../../componets/form/DialogDelete';
import InputComp from '../../../componets/form/InputComp';
import ListData from './ListData';
import showToast from '../../../services/show-toast';
import {useIsFocused} from '@react-navigation/native';
import usePerkembangan from '../../../store/crud/perkembangan';
import BtnPrimary from '../../../componets/button/BtnPrimary';

const Perkembangan = () => {
  // store
  const {setPerkembangan, dtPerkembangan, responses, removeData} =
    usePerkembangan();
  // state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dataToast, setDataToast] = useState(false);
  const [dtEdit, setDtEdit] = useState('');
  const [id, setId] = useState('');
  // other
  const isFocused = useIsFocused();
  // ambil data
  const fetch = async () => {
    if (page === 1) {
      setIsLoading(true);
    }
    await setPerkembangan({search, page});
    setIsLoading(false);
  };
  // use effect
  useEffect(() => {
    fetch();
    return () => {};
  }, [page, isFocused]);

  // use effect

  refreshing && (setPage(1), fetch(), setRefreshing(false));

  dataToast && (showToast(dataToast), setDataToast(false));

  const handleSearch = async () => {
    await setPerkembangan({search});
  };

  // open modal form
  const handelTambahData = () => {
    setDtEdit(false);
    setOpenForm(true);
  };

  // ketika tombol hapus ditekan
  const handleHapus = id => {
    setVisible(true);
    setId(id);
  };

  // menghapus data
  const deleteData = async () => {
    const res = await removeData(id);
    showToast(res.data);
  };
  // menghapus data
  const handleEdit = row => {
    setDtEdit(row);
    setOpenForm(true);
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
        responses={responses}
        handleHapus={handleHapus}
        handleEdit={handleEdit}
      />
    );
  };
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Toast />
      </View>
      {openForm && (
        <Form
          setOpenForm={setOpenForm}
          openForm={openForm}
          setDataToast={setDataToast}
          dtEdit={dtEdit}
        />
      )}
      {/* dialog delete */}
      <DialogDelete
        visible={visible}
        setVisible={setVisible}
        deleteData={deleteData}
      />

      <View className="mb-2 mx-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-black font-[Roboto-Regular] my-1 w-[70%] text-justify">
            Untuk melihat detail informasi perkembangan orang hilang, silahkan
            tekan pada nama orang hilang yang ingin dilihat
          </Text>
          <BtnPrimary
            text="Tambah data"
            type="secondary"
            onPress={handelTambahData}
          />
        </View>
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
