/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {api} = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useLaporanAPI = create(
  devtools((set, get) => ({
    dtApiLaporan: [],
    setApiLaporan: async () => {
      try {
        const res = await api({
          method: 'get',
          url: `/laporan`,
        });
        set(state => ({...state, dtApiLaporan: res.data}));
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

export default useLaporanAPI;
