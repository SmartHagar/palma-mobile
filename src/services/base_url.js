/** @format */

import axios from 'axios';

const BASE_URL = 'https://admin.palma.tauogp.my.id';
// const BASE_URL = 'http://192.168.90.199:8000';
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/api`;
const url_crud = `${BASE_URL}/crud`;
const url_export = `${BASE_URL}/export`;

export default function useUrl() {
  const auth = axios.create({
    baseURL: url_auth,
  });
  const crud = axios.create({
    baseURL: url_crud,
  });
  const api = axios.create({
    baseURL: url_api,
  });
  const exports = axios.create({
    baseURL: url_export,
  });

  return {auth, crud, api, BASE_URL, exports};
}
