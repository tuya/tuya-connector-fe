import { AxiosInstance } from 'axios';
import createRequest from './request';
import {IOptions, errorType} from './types';
import {getGlobalConfig} from './config';

export const request = createRequest();



const createService = (
  options: IOptions & { apiMethodName: string } = {apiMethodName: ''},
  instance?: AxiosInstance
) => {
  const requestInstance = instance || request;
  const globalConfig = getGlobalConfig();

  return requestInstance.request({...globalConfig, ...options}).then((resp) => {
    if ((resp.statusText === 'OK' || (resp.status >= 200 && resp.status < 300)) && resp.data?.success) {
      return resp.data?.result;
    }
    // http 状态不对，抛异常；success fail，抛异常
    const errorObj: errorType = {
      apiMethodName: options.apiMethodName,
      msg: resp?.data?.msg,
      code: resp?.data?.code,
      httpCode: resp.status,
    };

    if (globalConfig.onError) {
      globalConfig.onError(errorObj);
    }

    return Promise.reject(errorObj);
  });
}

export default createService;