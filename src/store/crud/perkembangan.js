/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {crud} = useUrl();
// const getToken = JSON.parse(localStorage.getItem("token"));

const usePerkembangan = create(
  devtools((set, get) => ({
    dtPerkembangan: [],
    responses: [],
    setPerkembangan: async ({search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/perkembangan`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtPerkembangan: response.data.data}));
        } else {
          set(state => ({
            dtPerkembangan: [...state.dtPerkembangan, ...response.data.data],
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
    showPerkembangan: async ({id, search = '', limit = 10, page = 1}) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/perkembangan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set(state => ({...state, responses: response.data}));
        if (page === 1) {
          set(state => ({...state, dtPerkembangan: response.data.data}));
        } else {
          set(state => ({
            dtPerkembangan: [...state.dtPerkembangan, ...response.data.data],
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
          url: `/perkembangan`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
        });
        set(state => ({
          dtPerkembangan: [res.data.data, ...state.dtPerkembangan],
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
          url: `/perkembangan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtPerkembangan: state.dtPerkembangan.filter(item => item.id !== id),
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
          url: `/perkembangan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        console.log(row);
        set(state => ({
          dtPerkembangan: state.dtPerkembangan.map(item => {
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
          url: `/perkembangan/ubah-status/${id}`,
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

export default usePerkembangan;
