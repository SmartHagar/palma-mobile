/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {api} = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useOrangHilangAPI = create(
  devtools((set, get) => ({
    dtApiOrgHilang: [],
    setApiOrangHilang: async () => {
      try {
        const res = await api({
          method: 'get',
          url: `/orang-hilang`,
        });
        set(state => ({...state, dtApiOrgHilang: res.data}));
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
    setApiOrangHilangAll: async () => {
      try {
        const res = await api({
          method: 'get',
          url: `/orang-hilang/all`,
        });
        set(state => ({...state, dtApiOrgHilang: res.data}));
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
    setApiTahunan: async ({tahun}) => {
      try {
        const res = await api({
          method: 'get',
          url: `/orang-hilang/tahunan`,
          params: {
            tahun,
          },
        });
        set(state => ({...state, dtApiOrgHilang: res.data}));
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

export default useOrangHilangAPI;
