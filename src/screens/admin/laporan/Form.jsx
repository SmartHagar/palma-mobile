import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComp from '../../../componets/form/InputComp';
import {Controller, useForm} from 'react-hook-form';
import DialogComp from '../../../componets/form/DialogComp';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import colors from '../../../assets/styles/colors';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import useLaporan from '../../../store/crud/laporan';

const Form = ({openForm, setOpenForm, dtEdit, setDataToast}) => {
  // store
  const {addData, updateData} = useLaporan();
  // state
  const [tglLaporan, setTglLaporan] = useState(new Date());
  const [showTglLaporan, setShowTglLaporan] = useState(false);
  const [batas, setBatas] = useState(new Date());
  const [showBatas, setShowBatas] = useState(false);
  const handleClose = () => {
    setOpenForm(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm();

  useEffect(() => {
    dtEdit &&
      reset(
        {
          no_laporan: dtEdit.no_laporan,
          orang_hilang_id: dtEdit.orang_hilang_id,
        },
        setTglLaporan(new Date(dtEdit.tgl_laporan)),
        setBatas(new Date(dtEdit.batas_pencarian)),
        {
          keepErrors: true,
          keepDirty: true,
        },
      );

    !dtEdit && resetInput();

    return () => {};
  }, [dtEdit]);

  // Validasi
  const resetInput = () => {
    reset(
      {
        no_laporan: '',
      },
      setTglLaporan(new Date()),
      setBatas(new Date()),
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
  };

  // date ficker
  const changeDateLaporan = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTglLaporan(false);
    setTglLaporan(currentDate);
  };
  const changeDateBatas = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowBatas(false);
    setBatas(currentDate);
  };

  // ketika data akan disimpan
  const onSubmit = async data => {
    data.tgl_laporan = moment(tglLaporan).format('YYYY-MM-DD');
    data.batas_pencarian = moment(batas).format('YYYY-MM-DD');
    let add;
    // simpan data
    if (!dtEdit) {
      add = await addData(data);
      if (add.data.type === 'success') {
        resetInput();
      }
    }
    // ubah data
    if (dtEdit) {
      add = await updateData(dtEdit.id, data);
      if (add.data.type === 'success') {
        setOpenForm(false);
      }
      console.log(add);
    }
    setDataToast(add.data);
  };
  return (
    <DialogComp openForm={openForm} judul={dtEdit?.orang_hilang.nama}>
      <ScrollView>
        <View>
          <Text className="text-black font-[Roboto-Regular]">Tgl. Laporan</Text>
          <Text
            style={{borderColor: colors.third}}
            className={`border text-black py-[8px] px-2 rounded-md font-[Roboto-Regular]`}
            onPress={() => setShowTglLaporan(true)}>
            {moment(tglLaporan).format('DD MMMM YYYY')}
          </Text>
          {showTglLaporan && (
            <RNDateTimePicker
              value={new Date(tglLaporan)}
              onChange={changeDateLaporan}
              locale="id-ID"
            />
          )}
        </View>
        <View className="mt-2">
          <Text className="text-black font-[Roboto-Regular]">
            Batas Pencarian
          </Text>
          <Text
            style={{borderColor: colors.third}}
            className={`border text-black py-[8px] px-2 rounded-md font-[Roboto-Regular]`}
            onPress={() => setShowBatas(true)}>
            {moment(batas).format('DD MMMM YYYY')}
          </Text>
          {showBatas && (
            <RNDateTimePicker
              value={new Date(batas)}
              onChange={changeDateBatas}
              locale="id-ID"
            />
          )}
        </View>
      </ScrollView>
      <View className="flex-row space-x-2 mt-4">
        <View>
          <BtnPrimary onPress={handleSubmit(onSubmit)} text="Simpan" />
        </View>
        <View>
          <BtnPrimary onPress={handleClose} type="secondary" text="Tutup" />
        </View>
      </View>
    </DialogComp>
  );
};

export default Form;
