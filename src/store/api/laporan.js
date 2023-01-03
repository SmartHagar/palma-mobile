/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../../services/base_url';

const {api} = useUrl();

const useLaporan = create(
  devtools((set, get) => ({
    responses: {},
    dtLaporan: [],
    setLaporanBulan: async ({bulan = '', tahun = ''}) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: 'get',
          url: `/laporan`,
          params: {
            bulan,
            tahun,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const {data} = res;
        // filter data kantin
        const dataFilter = get().filterKantin({data, kantin});
        set(state => ({...state, responses: res}));
        set(state => ({...state, dtLaporan: dataFilter}));
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
    setLaporanSemester: async ({tahun, semester}) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: 'get',
          url: `/laporan/semester`,
          params: {
            tahun,
            semester,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const {data} = res;
        // filter data kantin
        const dataFilter = get().filterKantin({data, kantin});
        set(state => ({...state, responses: res}));
        set(state => ({...state, dtLaporan: dataFilter}));
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
    setLaporanTahun: async ({tahun}) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: 'get',
          url: `/laporan/tahun`,
          params: {
            tahun,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({...state, responses: res}));
        set(state => ({...state, dtLaporan: res.data}));
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

export default useLaporan;
