/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

// eslint-disable-next-line react-hooks/rules-of-hooks
const {api} = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const usePerkembanganAPI = create(
  devtools((set, get) => ({
    dtPerkembangan: [],
    setApiPerkembangan: async () => {
      try {
        const res = await api({
          method: 'get',
          url: `/perkembangan`,
        });
        set(state => ({...state, dtPerkembangan: res.data}));
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

export default usePerkembanganAPI;
