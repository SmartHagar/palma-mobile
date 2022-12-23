/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useItem = create(
  devtools((set, get) => ({
    dtItem: [],
    responses: [],
    setItem: async (cari = { search: "" }, page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/item`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search: cari.search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtItem: response.data }));
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
    addData: async (items) => {
      try {
        const res = await crud({
          method: "post",
          url: `/item`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
        });
        set((state) => ({
          dtItem: [res.data.data, ...state.dtItem],
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
          url: `/item/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtItem: state.dtItem.filter((item) => item.id !== id),
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
    updateData: async (id, row) => {
      try {
        const response = await crud({
          method: "put",
          url: `/item/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set((state) => ({
          dtItem: state.dtItem.map((item) => {
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

export default useItem;
