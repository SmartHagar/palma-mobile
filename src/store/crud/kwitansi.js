/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

const { crud } = useUrl();

// zustand middleware
const useKwitansi = create(
  devtools((set, get) => ({
    dtKwitansi: [],
    responses: {},
    transaksi_id: null,
    setKwitansi: async (transaksi_id) => {
      const res = await crud({
        method: "get",
        url: `/kwitansi/${transaksi_id}`,
        //   headers: { Authorization: `Bearer ${getToken}` },
      });

      set((state) => ({ ...state, dtKwitansi: res.data }));
      set((state) => ({ ...state, transaksi_id }));
    },

    addData: async (item) => {
      const formData = new FormData();
      formData.append("gambar[]", item.gambar);
      formData.append("transaksi_id", item.transaksi_id);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/kwitansi`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        set((state) => ({
          dtKwitansi: [res.data.data, ...state.dtKwitansi],
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
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "delete",
          url: `/kwitansi/${id}`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtKwitansi: state.dtKwitansi.filter((item) => item.id !== id),
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
  }))
);

export default useKwitansi;
