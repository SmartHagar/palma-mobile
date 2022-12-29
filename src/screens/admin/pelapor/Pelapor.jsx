import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Form from './Form';
import usePelapor from '../../../store/crud/pelapor';
import ListData from './ListData';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';
import DialogDelete from '../../../componets/form/DialogDelete';
import Detail from './Detail';
import InputComp from '../../../componets/form/InputComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';

const Pelapor = () => {
  // store
  const {setPelapor, dtPelapor, responses, removeData} = usePelapor();
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
  // ambil data
  const fetch = async () => {
    if (page === 1) {
      setIsLoading(true);
    }
    await setPelapor({search, page});
    setIsLoading(false);
  };
  // use effect
  useEffect(() => {
    fetch();
    return () => {};
  }, [page]);

  // use effect

  refreshing && (setPage(1), fetch(), setRefreshing(false));

  // open modal form
  const handelTambahData = () => {
    setDtEdit('');
    setOpenForm(true);
  };

  dataToast && (showToast(dataToast), setDataToast(false));

  const handleSearch = async () => {
    await setPelapor({search});
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
        dataList={dtPelapor}
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
      <View className="justify-between flex-row mx-2 items-center my-2">
        <Text className="text-black">Silahkan mengolah data Pelapor</Text>
        <BtnPrimary
          text="Tambah data"
          type="secondary"
          onPress={handelTambahData}
        />
      </View>

      <View className="mb-2 mx-2">
        <Text className="text-black text-center text-lg font-[Roboto-Bold]">
          Daftar Pelapor
        </Text>
        <Text className="text-black font-[Roboto-Regular]">
          Untuk melihat detail informasi pelapor, silahkan tekan pada nama
          pelapor yang ingin dilihat
        </Text>
        <InputComp
          onSubmitEditing={handleSearch}
          onChangeText={setSearch}
          placeholder="Cari nama pelapor"
        />
      </View>
      <View className="h-full">{showData()}</View>
    </View>
  );
};

export default Pelapor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
