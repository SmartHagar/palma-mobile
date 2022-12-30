/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {auth} = useUrl();

const useLogin = create(
  devtools((set, get) => ({
    dtLogin: [],
    setFromStorage: async () => {
      console.log('set');
      try {
        let user_login = JSON.parse(await AsyncStorage.getItem('user_login'));
        if (user_login !== null) {
          set(state => ({...state, dtLogin: user_login}));
          // value previously stored
        }
      } catch (e) {
        // error reading value
      }
    },
    setLogin: async item => {
      try {
        const response = await auth.post(`/login`, item);
        const {role} = response.data.user;
        if (!role) {
          return {
            status: 'gagal',
            data: {
              judul: 'Gagal',
              type: 'error',
              pesan: 'Data anda belum disetujui oleh admin',
            },
          };
        }
        set(state => ({...state, dtLogin: response.data.user}));
        // save data login to local storage
        const user = {
          user_id: response.data.user.id,
          role: response.data.user.role,
          email: response.data.user.email,
          pelapor: response.data.user.pelapor,
        };
        const user_login = await AsyncStorage.setItem(
          'user_login',
          JSON.stringify(user),
        );
        return {
          status: 'berhasil',
          data: response.data,
        };
      } catch (error) {
        return {
          status: 'error',
          data: error.response.data,
        };
      }
    },
    setLogout: async () => {
      try {
        // remove data login
        await AsyncStorage.removeItem('user_login');
        set(state => ({...state, dtLogin: []}));
        return {
          status: 'berhasil',
        };
      } catch (error) {
        console.log(error);
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    setGantiPassword: async item => {
      try {
        const res = await auth({
          method: 'post',
          url: `/ganti-password`,
          data: item,
        });
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
  })),
);

export default useLogin;
