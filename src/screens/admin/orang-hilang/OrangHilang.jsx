import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Form from './Form';
import ListData from './ListData';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';
import DialogDelete from '../../../componets/form/DialogDelete';
import Detail from './Detail';
import InputComp from '../../../componets/form/InputComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import useOrangHilang from '../../../store/crud/orang-hilang';

const OrangHilang = () => {
  // store
  const {setOrangHilang, dtOrangHilang, responses, removeData} =
    useOrangHilang();
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
    await setOrangHilang({search, page});
    setIsLoading(false);
  };
  // use effect
  useEffect(() => {
    fetch();
    return () => {};
  }, [page]);

  // use effect

  refreshing && (setPage(1), fetch(), setRefreshing(false));

  dataToast && (showToast(dataToast), setDataToast(false));

  const handleSearch = async () => {
    await setOrangHilang({search});
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
        dataList={dtOrangHilang}
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
        <Text className="text-black font-[Roboto-Regular] my-1">
          Untuk melihat detail informasi orang hilang, silahkan tekan pada nama
          orang hilang yang ingin dilihat
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

export default OrangHilang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
