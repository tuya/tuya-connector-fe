import * as configMethod from './lib/common/config';
import { IOptions } from './lib/common/types';
import * as apiService from './lib/apis';
declare const version: string;
declare const apiClient: (config: IOptions) => Promise<any>;
declare const coreSdk: {
    version: string;
    apiClient: (config: IOptions) => Promise<any>;
    configMethod: typeof configMethod;
    apiService: typeof apiService;
};
export type { Asset, BaseAsset, AssetDeep, DeviceInfo, DeviceStatus, DeviceInfoList, UserToken, ProjectInfo, verifyCodeParamsEmail, verifyCodeParamsPhone, loginParams } from './lib/apis';
export type { errorType } from './lib/common/types';
export { apiService, configMethod, version, apiClient, };
export default coreSdk;
