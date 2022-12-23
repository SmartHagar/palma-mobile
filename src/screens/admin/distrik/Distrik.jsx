import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Form from './Form';
import useDistrik from '../../../store/crud/distrik';
import ListData from './ListData';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';

const Distrik = () => {
  // store
  const {setDistrik, dtDistrik, responses} = useDistrik();
  // state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataToast, setDataToast] = useState(false);
  const [dataLoad, setDataLoad] = useState(dtDistrik);
  // ambil data
  const fetch = async () => {
    setIsLoading(true);
    const res = await setDistrik({search, page, limit});
    console.log(res);
    setDataLoad([...dataLoad, ...res.data.data]);
    setIsLoading(false);
  };
  // use effect
  useEffect(() => {
    fetch();

    return () => {};
  }, [search, page, limit]);

  refreshing && (fetch(), setRefreshing(false));

  // open modal form
  const handelOpenForm = () => {
    setOpenForm(true);
  };

  dataToast && (showToast(dataToast), setDataToast(false));

  return (
    <View>
      {/* show toast */}
      {openForm && (
        <Form
          setOpenForm={setOpenForm}
          openForm={openForm}
          setDataToast={setDataToast}
        />
      )}
      <View className="justify-between flex-row mx-2">
        <Text className="text-black">Silahkan mengolah data Distrik</Text>
        <TouchableOpacity onPress={handelOpenForm}>
          <Text className="text-black">Tambah Data</Text>
        </TouchableOpacity>
      </View>
      <View className="h-full">
        <ListData
          dataList={dataLoad}
          setRefreshing={setRefreshing}
          refreshing={refreshing}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          responses={responses}
        />
      </View>
      <Toast />
    </View>
  );
};

export default Distrik;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
