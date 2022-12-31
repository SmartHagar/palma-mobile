import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputComp from '../../../componets/form/InputComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import KeyboardAvoiding from '../../../componets/form/KeyboardAvoiding';
import {useNavigation} from '@react-navigation/native';
import useLogin from '../../../store/auth/login';
import {Controller, useForm} from 'react-hook-form';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import showToast from '../../../services/show-toast';
import SpinerLoad from '../../../componets/loading/SpinerLoad';

const Login = () => {
  // store
  const {setLogin} = useLogin();
  // navigation
  const navigation = useNavigation();
  // state
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm();

  // reset form
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
  const onSubmit = async dataForm => {
    setIsLoading(true);
    // login data
    const add = await setLogin(dataForm);
    const {data} = add;
    showToast(data);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoiding>
      <View className="h-full">
        <View className="items-center justify-center h-full">
          <View className="bg-white/70 w-[80%] py-2 px-4 rounded-md">
            <View className="mb-5">
              <Text className="text-black font-[Roboto-Bold] text-center text-[16px]">
                Silahkan login untuk akses selanjutnya
              </Text>
            </View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputComp
                    placeholder="Masukan email"
                    label="Email"
                    errorText={errors.email && 'Tidak boleh kosong'}
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    autoCapitalize="none"
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
                    placeholder=""
                    label="Password"
                    errorText={errors.password && 'Tidak boleh kosong'}
                    onChangeText={value => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    autoCapitalize="none"
                    password={true}
                  />
                )}
                name="password"
              />
            </View>
            {isLoading ? (
              <SpinerLoad />
            ) : (
              <View className="my-2">
                <BtnPrimary text="Login" onPress={handleSubmit(onSubmit)} />
              </View>
            )}
            <View>
              <Text className="text-gray-800 font-[Roboto-Regular] text-center">
                Belum punya akun? Silahkan daftar dengan menekan tombol daftar
              </Text>
            </View>
            <View className="flex-row justify-center my-2">
              <BtnPrimary
                type="third"
                text="Daftar"
                onPress={() => navigation.navigate('RegisterStack')}
              />
            </View>
          </View>
        </View>
        <Toast />
      </View>
    </KeyboardAvoiding>
  );
};

export default Login;

const styles = StyleSheet.create({});
