import { IOptions } from './types';
export declare const getGlobalConfig: () => IOptions;
export declare const setGlobalConfig: (options: IOptions) => IOptions;
export declare const initGlobalConfig: (options: IOptions) => void;
export declare const isResponseRaw: (options: IOptions) => boolean;
