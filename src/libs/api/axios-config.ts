import { BaseErrorType } from '@/app/othello/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

// 基本設定
const axiosInstance = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_MY_SERVER),
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<BaseErrorType, unknown>) => {
    showMessage(error.response!);
    return Promise.reject(error.response?.data);
  }
);

const showMessage = (response: AxiosResponse<BaseErrorType, unknown>) => {
  const statusCd = response.status;
  const { type, message } = response.data;
  window.alert(`${statusCd} ${type}\r\n${message}`);
};

export const Api = axiosInstance;
