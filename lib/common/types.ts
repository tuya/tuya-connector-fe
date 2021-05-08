import { AxiosRequestConfig } from 'axios';

export type errorType = {
  apiMethodName: string; // 调用方法名
  msg: string;
  code: number | string;
  httpCode: string | number;
}
export interface IOptions extends AxiosRequestConfig {
  baseURL?: string;
  onError?: (errorObj: errorType) => void; // 当发生异常时的统一回调
  apiMethodName?: string, // 调用方法名
  [key: string]: any,
}
