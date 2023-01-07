import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../../../assets/styles/colors';
import InputComp from '../../../componets/form/InputComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import {Controller, useForm} from 'react-hook-form';
import InputFile from '../../../componets/form/InputFile';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import showToast from '../../../services/show-toast';
import Toast from 'react-native-toast-message';
import SpinerLoad from '../../../componets/loading/SpinerLoad';
import useOrangHilang from '../../../store/crud/orang-hilang';
import useLogin from '../../../store/auth/login';
import DialogComp from '../../../componets/form/DialogComp';
import {useNavigation} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const FormOrangHilang = ({
  openForm,
  setOpenForm,
  dtOrangHilang,
  setRefreshing,
}) => {
  // state
  const [imgOrg, setImgOrng] = useState(null);
  const [berhasil, setBerhasil] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePick, setShowDatePick] = useState(false);
  const [date, setDate] = useState(new Date());
  // store
  const {addData} = useOrangHilang();
  const {setFromStorage, dtLogin} = useLogin();
  // navigation
  const navigation = useNavigation();
  //   effect
  useEffect(() => {
    setFromStorage();

    return () => {};
  }, []);

  // date ficker
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePick(false);
    setDate(currentDate);
  };

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
    setImgOrng('');
    setDate(new Date());
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
  const fotoOrang = useCallback(() => {
    options;
    launchImageLibrary(options, setImgOrng);
  }, []);

  const onSubmit = async data => {
    // validasi foto
    data.foto = imgOrg?.assets[0];
    data.pelapor_id = dtLogin?.pelapor.id;
    data.tgl_hilang = moment(date).format('YYYY-MM-DD');
    // retur
    // simpan data
    setIsLoading(true);
    const add = await addData(data);
    setIsLoading(false);
    if (add.data.type === 'success') {
      resetInput();
      setBerhasil(true);
    }
    console.log(add);
    showToast(add.data);
  };
  return (
    <DialogComp
      openForm={openForm}
      height="90%"
      width="90%"
      judul="Masukan data orang hilang">
      <View className="border-b mb-2" style={{borderColor: colors.third}}>
        <Text
          style={{color: colors.secondary}}
          className="font-[Roboto-Bold] text-center text-[14px]">
          Pastikan anda mengisi semua data dengan benar agar laporan orang
          hilang bisa diterima oleh admin.
        </Text>
      </View>
      <ScrollView>
        {/* Foto */}
        <View
          className="mt-2 rounded-lg"
          style={{borderColor: colors.third, borderWidth: 1}}>
          <InputFile
            label="Foto Orang Hilang"
            image={imgOrg}
            onPress={fotoOrang}
            className="p-1"
          />
        </View>
        {/* Nama */}
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
        {/* UMUR*/}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Umur"
                label="Umur"
                errorText={errors.umur && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
                keyboardType="numeric"
              />
            )}
            name="umur"
          />
        </View>
        {/* No KTP */}
        <View>
          <Controller
            control={control}
            rules={{
              required: false,
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
                optional={true}
              />
            )}
            name="no_ktp"
          />
        </View>
        {/* No KK */}
        <View>
          <Controller
            control={control}
            rules={{
              required: false,
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
                optional={true}
              />
            )}
            name="no_kk"
          />
        </View>
        {/* No HP */}
        <View>
          <Controller
            control={control}
            rules={{
              required: false,
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
                optional={true}
              />
            )}
            name="no_hp"
          />
        </View>
        {/* suku */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Suku"
                label="Suku"
                errorText={errors.suku && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="suku"
          />
        </View>
        {/* tinggi */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Tinggi"
                label="Tinggi"
                errorText={errors.tinggi && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
                keyboardType="numeric"
              />
            )}
            name="tinggi"
          />
        </View>
        {/* berat */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Berat"
                label="Berat"
                errorText={errors.berat && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
                keyboardType="numeric"
              />
            )}
            name="berat"
          />
        </View>
        {/* warna_rambut */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Warna Rambut"
                label="Warna Rambut"
                errorText={errors.warna_rambut && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="warna_rambut"
          />
        </View>
        {/* jenis_rambut */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Jenis Rambut"
                label="Jenis Rambut"
                errorText={errors.jenis_rambut && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="jenis_rambut"
          />
        </View>
        {/* warna_kulit */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Warna Kulit"
                label="Warna Kulit"
                errorText={errors.warna_kulit && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="warna_kulit"
          />
        </View>
        {/* pakaian_terakhir */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Pakaian Terakhir"
                label="Pakaian Terakhir"
                errorText={errors.pakaian_terakhir && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="pakaian_terakhir"
          />
        </View>
        {/* suku */}
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComp
                placeholder="Hubungan Pelapor"
                label="Hubungan Pelapor"
                errorText={errors.hubungan && 'Tidak boleh kosong'}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="hubungan"
          />
        </View>
        {/* alamat */}
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
        {/* alamat */}
        <View className="mt-2">
          <Text className="text-black font-[Roboto-Regular] mb-1">
            Tanggal Kejadian
          </Text>
          <View>
            <Text
              style={{borderColor: colors.third}}
              className={`border text-black py-[8px] px-2 rounded-md font-[Roboto-Regular]`}
              onPress={() => setShowDatePick(true)}>
              {moment(date).format('DD MMMM YYYY')}
            </Text>
            {showDatePick && (
              <RNDateTimePicker
                value={new Date(date)}
                onChange={changeDate}
                locale="id-ID"
              />
            )}
          </View>
        </View>

        {berhasil ? (
          <View className="mt-4">
            <Text
              style={{color: colors.third}}
              className="font-[Roboto-Bold] text-center text-[14px]">
              Data anda telah tersimpan. Silahkan menunggu verifikasi data oleh
              admin.
              {/* Hasil verifikasi akan dikirim pada email anda. */}
            </Text>
            <View className="w-[80%] mx-auto mt-2">
              <BtnPrimary
                onPress={() => setOpenForm(false)}
                type="secondary"
                text="Tutup"
              />
            </View>
          </View>
        ) : (
          <>
            {isLoading ? (
              <SpinerLoad />
            ) : (
              <View className="mt-4">
                <BtnPrimary text="Simpan" onPress={handleSubmit(onSubmit)} />
              </View>
            )}

            {dtOrangHilang?.length > 0 ? (
              <View className="w-[80%] mx-auto mt-2">
                <BtnPrimary
                  onPress={() => setOpenForm(false)}
                  type="secondary"
                  text="Tutup"
                />
              </View>
            ) : (
              <View className="w-[80%] mx-auto mt-2">
                <BtnPrimary
                  onPress={() => navigation.navigate('DashboardStack')}
                  type="third"
                  text="Kembali"
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Toast />
    </DialogComp>
  );
};

export default FormOrangHilang;

const styles = StyleSheet.create({});
