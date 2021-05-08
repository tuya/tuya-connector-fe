import {IOptions} from './types';

const apiGlobalConfig: IOptions = {
  baseURL: '',
  method: 'GET',
  onError: () => {},
};

export const getGlobalConfig = () => {
  return apiGlobalConfig;
}

export const setGlobalConfig = (options: IOptions) => {
  return Object.assign(apiGlobalConfig, options);
}

export const initGlobalConfig = (options: IOptions) => {
  setGlobalConfig(options);
};

export const isResponseRaw = (options: IOptions) => {
  if (apiGlobalConfig.responseRaw || options.responseRaw) {
    return true;
  }
  return false;
}
