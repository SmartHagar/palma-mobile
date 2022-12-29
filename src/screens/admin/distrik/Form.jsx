import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import InputComp from '../../../componets/form/InputComp';
import useDistrik from '../../../store/crud/distrik';
import {Controller, useForm} from 'react-hook-form';
import DialogComp from '../../../componets/form/DialogComp';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';
import BtnPrimary from '../../../componets/button/BtnPrimary';

const Form = ({openForm, setOpenForm, dtEdit, setDataToast}) => {
  // store
  const {addData, updateData} = useDistrik();
  // state
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
          nama: dtEdit.nama,
        },
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
    setDataToast(add.data);
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
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="nama"
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
