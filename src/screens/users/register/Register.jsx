import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import colors from '../../../assets/styles/colors';
import InputComp from '../../../componets/form/InputComp';
import KeyboardAvoiding from '../../../componets/form/KeyboardAvoiding';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import {Controller, useForm} from 'react-hook-form';
import InputFile from '../../../componets/form/InputFile';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import usePelapor from '../../../store/crud/pelapor';
import showToast from '../../../services/show-toast';
import DistrikSelect from '../../../componets/select/DistrikSelect';
import Toast from 'react-native-toast-message';
import SpinerLoad from '../../../componets/loading/SpinerLoad';

const Register = () => {
  // state
  const [imgKTP, setImgKTP] = useState(null);
  const [imgKK, setImgKK] = useState(null);
  const [distrikId, setDistrikId] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // store
  const {addData} = usePelapor();
  // validation
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm();

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
    setImgKK('');
    setImgKTP('');
    setIsReset(true);
  };

  const options = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 0.9,
  };
  // pilih foto
  const fotoKtp = useCallback(() => {
    options;
    launchCamera(options, setImgKTP);
  }, []);
  const fotoKK = useCallback(() => {
    options;
    launchCamera(options, setImgKK);
  }, []);
  // select distrik
  // filter data by bulan
  const pilihDistrik = async distrik_id => {
    setDistrikId(distrik_id);
  };

  const onSubmit = async data => {
    data.foto_ktp = imgKTP.assets[0];
    data.foto_kk = imgKK.assets[0];
    data.distrik_id = distrikId;
    // retur
    // simpan data
    setIsLoading(true);
    const add = await addData(data);
    if (add.data.type === 'success') {
      resetInput();
      setBerhasil(true);
    }
    showToast(add.data);
    setIsLoading(false);
  };
  return (
    <View className="h-screen bg-white/90">
      <View className="border-b mb-2" style={{borderColor: colors.third}}>
        <Text
          style={{color: colors.secondary}}
          className="font-[Roboto-Bold] text-center text-[14px]">
          Pastikan anda mengisi semua data dengan benar agar data bisa diterima
          oleh admin.
        </Text>
      </View>
      <KeyboardAvoiding>
        <ScrollView className="w-[98%] mx-auto mb-20">
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputComp
                  placeholder="Email"
                  label="Email"
                  errorText={errors.email && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="email"
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
                  placeholder="Password"
                  label="Password"
                  errorText={errors.password && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
          </View>
          <View
            className="mt-2 rounded-lg"
            style={{borderColor: colors.third, borderWidth: 1}}>
            <InputFile
              label="Foto KTP"
              image={imgKTP}
              onPress={fotoKtp}
              className="p-1"
            />
          </View>
          <View
            className="mt-2 rounded-lg"
            style={{borderColor: colors.third, borderWidth: 1}}>
            <InputFile
              label="Foto KK"
              image={imgKK}
              onPress={fotoKK}
              className="p-1"
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
                  placeholder="Nama Lengkap"
                  label="Nama Lengkap"
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
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputComp
                  placeholder="No. KTP"
                  label="No. KTP"
                  errorText={errors.no_ktp && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  keyboardType="numeric"
                />
              )}
              name="no_ktp"
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
                  placeholder="No. KK"
                  label="No. KK"
                  errorText={errors.no_kk && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  keyboardType="numeric"
                />
              )}
              name="no_kk"
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
                  placeholder="No. Hp"
                  label="No. Hp"
                  errorText={errors.no_hp && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  keyboardType="numeric"
                />
              )}
              name="no_hp"
            />
          </View>
          <View className="mt-2">
            <DistrikSelect pilihDistrik={pilihDistrik} isReset={isReset} />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputComp
                  placeholder="Alamat"
                  label="Alamat"
                  errorText={errors.alamat && 'Tidak boleh kosong'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="alamat"
            />
          </View>
          {berhasil ? (
            <View className="mt-4">
              <Text
                style={{color: colors.third}}
                className="font-[Roboto-Bold] text-center text-[14px]">
                Data anda telah tersimpan. Silahkan menunggu verifikasi data
                oleh admin. Hasil verifikasi akan dikirim pada email anda.
              </Text>
            </View>
          ) : (
            <View className="mt-4">
              <BtnPrimary text="Simpan" onPress={handleSubmit(onSubmit)} />
            </View>
          )}
          {isLoading ? <SpinerLoad /> : ''}
        </ScrollView>
      </KeyboardAvoiding>
      <Toast />
    </View>
  );
};

export default Register;
