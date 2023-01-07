/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {crud} = useUrl();
// const getToken = JSON.parse(localStorage.getItem("token"));

const useOrangHilang = create(
  devtools((set, get) => ({
    dtOrangHilang: [],
    responses: [],
    setOrangHilang: async ({search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/orang-hilang`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtOrangHilang: response.data.data}));
        } else {
          set(state => ({
            dtOrangHilang: [...state.dtOrangHilang, ...response.data.data],
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
    showOrangHilang: async ({id, search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/orang-hilang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtOrangHilang: response.data.data}));
        } else {
          set(state => ({
            dtOrangHilang: [...state.dtOrangHilang, ...response.data.data],
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
      formData.append('foto', {
        uri: items.foto?.uri,
        name: items.foto?.fileName,
        type: items.foto?.type,
      });
      formData.append('pelapor_id', items.pelapor_id);
      formData.append('nama', items.nama);
      formData.append('umur', items.umur);
      formData.append('no_ktp', items.no_ktp);
      formData.append('no_kk', items.no_kk);
      formData.append('no_hp', items.no_hp);
      formData.append('suku', items.suku);
      formData.append('tinggi', items.tinggi);
      formData.append('berat', items.berat);
      formData.append('warna_rambut', items.warna_rambut);
      formData.append('jenis_rambut', items.jenis_rambut);
      formData.append('warna_kulit', items.warna_kulit);
      formData.append('pakaian_terakhir', items.pakaian_terakhir);
      formData.append('hubungan', items.hubungan);
      formData.append('alamat', items.alamat);
      formData.append('tgl_hilang', items.tgl_hilang);
      try {
        const res = await crud({
          method: 'post',
          url: `/orang-hilang`,
          // headers: { Authorization: `Bearer ${getToken}` },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });
        set(state => ({
          dtOrangHilang: [res.data.data, ...state.dtOrangHilang],
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
          url: `/orang-hilang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtOrangHilang: state.dtOrangHilang.filter(item => item.id !== id),
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
          url: `/orang-hilang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set(state => ({
          dtOrangHilang: state.dtOrangHilang.map(item => {
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
    ubahStatus: async (id, row) => {
      try {
        const response = await crud({
          method: 'post',
          url: `/orang-hilang/ubah-status/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
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

export default useOrangHilang;
