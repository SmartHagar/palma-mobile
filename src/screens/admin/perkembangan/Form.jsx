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
import usePerkembangan from '../../../store/crud/perkembangan';
import moment from 'moment';
import colors from '../../../assets/styles/colors';
import OrangHilangSelect from '../../../componets/select/OrangHilangSelect';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import useLaporanAPI from '../../../store/api/laporan';

const Form = ({openForm, setOpenForm, dtEdit, setDataToast}) => {
  // store
  const {addData, updateData} = usePerkembangan();
  const {setApiLaporan, dtApiLaporan} = useLaporanAPI();
  // state
  const [tgl, setTgl] = useState(new Date());
  const [showTgl, setShowTgl] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [pilihOrangHilang, setPilihOrangHilang] = useState(false);

  const handleClose = () => {
    setOpenForm(false);
  };

  // date ficker
  const changeDateLaporan = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTgl(false);
    setTgl(currentDate);
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
          detail: dtEdit.detail,
        },
        setTgl(new Date(dtEdit.tgl)),
        setPilihOrangHilang(dtEdit.laporan.orang_hilang.id),
        {
          keepErrors: true,
          keepDirty: true,
        },
      );

    !dtEdit && resetInput();
    setApiLaporan();
    return () => {};
  }, [dtEdit]);

  // Validasi
  const resetInput = () => {
    reset(
      {
        detail: '',
      },
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
  };

  // ketika data akan disimpan
  const onSubmit = async data => {
    if (!pilihOrangHilang) {
      return;
    }
    const laporan = dtApiLaporan.filter(
      item => item.orang_hilang_id === pilihOrangHilang,
    );
    data.tgl = moment(tgl).format('YYYY-MM-DD');
    data.laporan_id = laporan[0].id;
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
    }
    console.log(add);
    setDataToast(add.data);
  };
  return (
    <DialogComp openForm={openForm} judul="Form Pencarian" height="100%">
      <ScrollView>
        <View className="mt-2">
          <OrangHilangSelect
            setPilihOrangHilang={setPilihOrangHilang}
            defaultButtonText={
              dtEdit ? dtEdit.laporan.orang_hilang.nama : `Pilih Orang Hilang`
            }
            isReset={isReset}
          />
          {!pilihOrangHilang && (
            <Text className="text-red-700">Tidak boleh kosong</Text>
          )}
        </View>
        <View>
          <Text className="text-black font-[Roboto-Regular]">Tgl. Laporan</Text>
          <Text
            style={{borderColor: colors.third}}
            className={`border text-black py-[8px] px-2 rounded-md font-[Roboto-Regular]`}
            onPress={() => setShowTgl(true)}>
            {moment(tgl).format('DD MMMM YYYY')}
          </Text>
          {showTgl && (
            <RNDateTimePicker
              value={new Date(tgl)}
              onChange={changeDateLaporan}
              locale="id-ID"
            />
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Detail Pencarian"
                label="Detail Pencarian"
                errorText={errors.detail && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="detail"
          />
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
