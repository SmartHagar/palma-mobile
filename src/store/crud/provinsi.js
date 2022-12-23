/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useProvinsi = create(
  devtools((set, get) => ({
    dtProvinsi: [],
    responses: [],
    setProvinsi: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/provinsi`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtProvinsi: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    addData: async (nama) => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/provinsi`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { nama },
        });
        set((state) => ({
          dtProvinsi: [res.data.data, ...state.dtProvinsi],
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const res = await crud({
          method: "delete",
          url: `/provinsi/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtProvinsi: state.dtProvinsi.filter((item) => item.id !== id),
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, nama) => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "put",
          url: `/provinsi/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { nama },
        });
        set((state) => ({
          dtProvinsi: state.dtProvinsi.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                nama,
              };
            } else {
              return item;
            }
          }),
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useProvinsi;
