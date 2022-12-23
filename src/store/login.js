/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../services/base_url";

const { auth } = useUrl();

const user_login = JSON.parse(localStorage.getItem("user_login"));
let getToken;

user_login && (getToken = user_login.token);

const useLogin = create(
  devtools((set, get) => ({
    login: [],
    setLogin: async (item) => {
      try {
        const response = await auth.post(`/login`, item);
        set((state) => ({ ...state, login: response.data.data }));
        // save data login to local storage
        const user = {
          user_id: response.data.user.id,
          role: response.data.user.role,
          token: response.data.access_token,
        };
        localStorage.setItem("user_login", JSON.stringify(user));
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
    setLogout: async () => {
      try {
        localStorage.removeItem("user_login");
        return {
          status: "berhasil",
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setGantiPassword: async (item) => {
      try {
        const res = await auth({
          method: "post",
          url: `/ganti-password`,
          data: item,
        });
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useLogin;
