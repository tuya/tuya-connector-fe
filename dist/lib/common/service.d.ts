import { AxiosInstance } from 'axios';
import { IOptions } from './types';
export declare const request: AxiosInstance;
declare const createService: (options?: IOptions & {
    apiMethodName: string;
}, instance?: AxiosInstance | undefined) => Promise<any>;
export default createService;
