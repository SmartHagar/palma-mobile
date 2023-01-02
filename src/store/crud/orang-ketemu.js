/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {crud} = useUrl();
// const getToken = JSON.parse(localStorage.getItem("token"));

const useOrangKetemu = create(
  devtools((set, get) => ({
    dtOrangKetemu: [],
    responses: [],
    setOrangKetemu: async ({search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/orang-ketemu`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtOrangKetemu: response.data.data}));
        } else {
          set(state => ({
            dtOrangKetemu: [...state.dtOrangKetemu, ...response.data.data],
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
      try {
        const res = await crud({
          method: 'post',
          url: `/orang-ketemu`,
          // headers: { Authorization: `Bearer ${getToken}` },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: items,
        });
        set(state => ({
          dtOrangKetemu: [res.data.data, ...state.dtOrangKetemu],
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
          url: `/orang-ketemu/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtOrangKetemu: state.dtOrangKetemu.filter(item => item.id !== id),
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
          url: `/orang-ketemu/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set(state => ({
          dtOrangKetemu: state.dtOrangKetemu.map(item => {
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
          url: `/orang-ketemu/ubah-status/${id}`,
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

export default useOrangKetemu;
