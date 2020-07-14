import axios, { AxiosPromise } from 'axios';
import crypto from 'crypto-js';
import { SECRET_KEY_PASSWORD } from '../config';

const url = 'http://localhost:3012';

axios.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem('authorization');
    if (authorization && authorization !== 'undefined') {
      config.headers.authorization = JSON.parse(authorization);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getPostsApi = (): AxiosPromise => {
  return axios.get(`${url}/posts`);
};

export const removePostApi = (id: number): AxiosPromise => {
  return axios.delete(`${url}/posts?id=${id}`);
};

interface signInApiInterface {
  email?: string;
  password?: string;
}

export const signInApi = (credentials: signInApiInterface): AxiosPromise => {
  const { email, password } = credentials;
  const encryptedPassword = crypto.AES.encrypt(
    password,
    SECRET_KEY_PASSWORD
  ).toString();

  return axios.post(`${url}/signin`, { email, password: encryptedPassword });
};

export const validateApi = (): AxiosPromise => {
  return axios.get(`${url}/validate`);
};
