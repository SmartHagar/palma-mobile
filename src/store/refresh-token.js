/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../services/base_url";

const { auth } = useUrl();

const user_login = JSON.parse(localStorage.getItem("user_login"));
let getToken;

user_login && (getToken = user_login.token);

const useToken = create(
  devtools((set, get) => ({
    refreshToken: async () => {
      try {
        const res = await auth({
          method: "post",
          url: `/refresh`,
          headers: { Authorization: `Bearer ${getToken}` },
        });
        console.log(res);
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useToken;
