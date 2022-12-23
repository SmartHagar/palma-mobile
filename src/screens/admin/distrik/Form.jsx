import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import InputComp from '../../../componets/form/InputComp';
import useDistrik from '../../../store/crud/distrik';
import {Controller, useForm} from 'react-hook-form';
import DialogComp from '../../../componets/form/DialogComp';

const Form = ({openForm, setOpenForm, setDataToast}) => {
  // store
  const {addData} = useDistrik();
  // state
  const handleClose = () => {
    setOpenForm(false);
  };

  // Validasi
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
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm();

  // ketika data akan disimpan
  const onSubmit = async data => {
    const add = await addData(data);
    setDataToast(add.data);
    if (add.data.type === 'success') {
      resetInput();
    }
  };
  return (
    <DialogComp openForm={openForm} judul="Form Distrik">
      <ScrollView>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Nama Distrik"
                label="Nama Distrik"
                errorText={errors.nama && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            )}
            name="nama"
          />
        </View>
      </ScrollView>
      <View className="flex-row space-x-2 mt-4">
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-black">Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-black">Tutup</Text>
        </TouchableOpacity>
      </View>
    </DialogComp>
  );
};

export default Form;
