import { AxiosRequestConfig } from 'axios';
export declare type errorType = {
    apiMethodName: string;
    msg: string;
    code: number | string;
    httpCode: string | number;
};
export interface IOptions extends AxiosRequestConfig {
    baseURL?: string;
    onError?: (errorObj: errorType) => void;
    apiMethodName?: string;
    [key: string]: any;
}
export interface paginationType {
    total: number;
    pageNo: number;
    pageSize: number;
}
