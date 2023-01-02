import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComp from '../../../componets/form/InputComp';
import {Controller, useForm} from 'react-hook-form';
import OrangHilangSelect from '../../../componets/select/OrangHilangSelect';
import KeyboardAvoiding from '../../../componets/form/KeyboardAvoiding';
import useOrangKetemu from '../../../store/crud/orang-ketemu';
import AddLokasi from './AddLokasi';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import MyDialog from './MyDialog';

const OrangKetemu = () => {
  // store
  const {setOrangKetemu, dtOrangKetemu, addData, removeData} = useOrangKetemu();
  // state
  const [isReset, setIsReset] = useState(false);
  const [pilihOrangHilang, setPilihOrangHilang] = useState(false);
  const [getCoord, setGetCoord] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(false);
  const [dtDet, setDtDet] = useState([]);

  // hapus data
  const handleHapus = row => {
    setVisible(true);
    setId(row.id);
    setDtDet(row);
  };
  // perintah delete dijalankan
  const deleteData = async () => {
    const res = await removeData(id);
  };
  // use effetct
  useEffect(() => {
    setOrangKetemu({});

    return () => {};
  }, []);

  // validation
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm();
  // reset
  const resetInput = () => {
    reset(
      {
        nama: '',
      },
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
  };
  // ketika data akan disimpan
  const onSubmit = async data => {
    if (!getCoord) {
      return 0;
    }
    data.orang_hilang_id = pilihOrangHilang;
    data.longitude = getCoord[0];
    data.latitude = getCoord[1];
    // simpan data
    const add = await addData(data);
    if (add.data.type === 'success') {
      resetInput();
      setIsReset(true);
    }
  };
  return (
    <KeyboardAvoiding>
      <View className="h-full">
        {visible && (
          <MyDialog
            visible={visible}
            setVisible={setVisible}
            deleteData={deleteData}
            dtDet={dtDet}
            setIsReset={setIsReset}
          />
        )}
        <View className="h-auto bg-white px-2">
          <View className="mt-2">
            <OrangHilangSelect
              setPilihOrangHilang={setPilihOrangHilang}
              isReset={isReset}
            />
            {!pilihOrangHilang && (
              <Text className="text-red-700">Tidak boleh kosong</Text>
            )}
          </View>
          {/* nama */}
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputComp
                  placeholder="Nama yang temukan"
                  label="Nama yang temukan"
                  errorText={errors.nm_penemu && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="nm_penemu"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputComp
                  placeholder="Alamat ditemukan"
                  label="Alamat ditemukan"
                  errorText={errors.alamat_ketemu && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="alamat_ketemu"
            />
          </View>
          <View className="flex-row space-x-2 mt-2 mb-2 items-center">
            <View>
              <BtnPrimary onPress={handleSubmit(onSubmit)} text="Simpan" />
            </View>
            {!getCoord && (
              <View>
                <Text className="text-red-600">
                  Anda belum memilih lokasi ditemukan
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <AddLokasi
            dataList={dtOrangKetemu}
            setGetCoord={setGetCoord}
            handleHapus={handleHapus}
          />
        </View>
      </View>
    </KeyboardAvoiding>
  );
};

export default OrangKetemu;

const styles = StyleSheet.create({});
