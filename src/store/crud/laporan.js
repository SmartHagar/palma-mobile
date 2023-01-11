/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {crud} = useUrl();
// const getToken = JSON.parse(localStorage.getItem("token"));

const useLaporan = create(
  devtools((set, get) => ({
    dtLaporan: [],
    responses: [],
    setLaporan: async ({search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/laporan`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtLaporan: response.data.data}));
        } else {
          set(state => ({
            dtLaporan: [...state.dtLaporan, ...response.data.data],
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
          url: `/laporan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtLaporan: response.data.data}));
        } else {
          set(state => ({
            dtLaporan: [...state.dtLaporan, ...response.data.data],
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
    removeData: async id => {
      try {
        const res = await crud({
          method: 'delete',
          url: `/laporan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtLaporan: state.dtLaporan.filter(item => item.id !== id),
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
          url: `/laporan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        console.log(row);
        set(state => ({
          dtLaporan: state.dtLaporan.map(item => {
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
          url: `/laporan/ubah-status/${id}`,
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

export default useLaporan;
