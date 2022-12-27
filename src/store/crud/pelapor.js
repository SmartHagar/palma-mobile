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
      try {
        const res = await crud({
          method: 'post',
          url: `/pelapor`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
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
