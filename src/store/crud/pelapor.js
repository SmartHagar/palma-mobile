/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {crud} = useUrl();
// const getToken = JSON.parse(localStorage.getItem("token"));

const usePelapor = create(
  devtools((set, get) => ({
    dtPelapor: [],
    responses: [],
    setPelapor: async ({search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/pelapor`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtPelapor: response.data.data}));
        } else {
          set(state => ({
            dtPelapor: [...state.dtPelapor, ...response.data.data],
          }));
        }

        return {
          status: 'berhasil',
          data: response.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    addData: async items => {
      const formData = new FormData();
      formData.append('foto_ktp', {
        uri: items.foto_ktp.uri,
        name: items.foto_ktp.fileName,
        type: items.foto_ktp.type,
      });
      formData.append('foto_kk', {
        uri: items.foto_kk.uri,
        name: items.foto_kk.fileName,
        type: items.foto_kk.type,
      });
      formData.append('distrik_id', items.distrik_id);
      formData.append('nama', items.nama);
      formData.append('no_ktp', items.no_ktp);
      formData.append('no_kk', items.no_kk);
      formData.append('no_hp', items.no_hp);
      formData.append('alamat', items.alamat);
      formData.append('email', items.email);
      formData.append('password', items.password);
      try {
        const res = await crud({
          method: 'post',
          url: `/pelapor`,
          // headers: { Authorization: `Bearer ${getToken}` },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        set(state => ({
          dtPelapor: [res.data.data, ...state.dtPelapor],
        }));
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          data: error.response.data,
        };
      }
    },
    removeData: async id => {
      try {
        const res = await crud({
          method: 'delete',
          url: `/pelapor/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtPelapor: state.dtPelapor.filter(item => item.id !== id),
        }));
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const response = await crud({
          method: 'put',
          url: `/pelapor/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set(state => ({
          dtPelapor: state.dtPelapor.map(item => {
            if (item.id === id) {
              return {
                ...item,
                ...response.data.data,
              };
            } else {
              return item;
            }
          }),
        }));
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
  })),
);

export default usePelapor;
