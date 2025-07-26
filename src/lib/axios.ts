import Axios, { AxiosResponse, AxiosError } from 'axios';
import { env } from '@/config';

function onFulfilled(response: AxiosResponse) {
  return response.data;
}

function onRejected(error: AxiosError) {
  return Promise.reject(error);
}

function baseFactory(baseURL: string) {
  return Axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.API_KEY}`,
    },
  });
}

function apiFactory(baseURL: string) {
  const client = baseFactory(baseURL);

  client.interceptors.response.use(onFulfilled, onRejected);

  return client;
}

export const apiClient = apiFactory(env.API_URL);
