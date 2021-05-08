import { IOptions } from "../../common/types";
export declare type DeviceStatus = {
    code: string;
    value: Object;
    options?: string;
    editable?: boolean;
    name?: string;
    type?: string;
};
export declare type DeviceInfo = {
    id: string;
    name: string;
    uid: string;
    local_key: string;
    category: string;
    product_id: string;
    product_name: string;
    sub: boolean;
    uuid: string;
    online: boolean;
    active_time: number;
    icon: string;
    ip: string;
    create_time: number;
    update_time: number;
    time_zone: string;
    status: DeviceStatus[];
};
export declare type DeviceInfoList = {
    data: DeviceInfo[];
    page_no: number;
    page_size: number;
    total: number;
};
export declare type ProjectInfo = {
    project_name: string;
    project_code: string;
};
/**
 * 获取指定资产下的设备信息
 * @param assetId
 * @param opts
 */
export declare const getDevicesInfoByAssetId: (assetId: string, pageNum: number, pageSize: number, opts?: IOptions) => Promise<DeviceInfoList>;
/**
 * 获取设备信息
 * @param deviceId
 * @param opts
 */
export declare const getDeviceInfoByDeviceId: (deviceId: string, opts?: IOptions) => Promise<DeviceInfo>;
/**
 * 删除设备
 */
export declare const removeDeviceById: (deviceId: string, opts?: IOptions) => Promise<boolean>;
/**
 * 修改设备
 */
export declare const modifyDeviceInfo: (deviceId: string, name: string, opts?: IOptions) => Promise<boolean>;
/**
 * 控制设备
 */
export declare const modifyDeviceDP: (deviceId: string, deviceStatuses: DeviceStatus[], opts?: IOptions) => Promise<boolean>;
/**
 * 获取设备指令
 */
export declare const getDeviceDP: (deviceId: string, opts?: IOptions) => Promise<any>;
/**
 * 获取设备详情&指令
 */
export declare const getDeviceInfoWithDP: (deviceId: string, opt?: IOptions) => Promise<{
    id: string;
    name: string;
    uid: string;
    local_key: string;
    category: string;
    product_id: string;
    product_name: string;
    sub: boolean;
    uuid: string;
    online: boolean;
    active_time: number;
    icon: string;
    ip: string;
    create_time: number;
    update_time: number;
    time_zone: string;
    status: DeviceStatus[];
}>;
export declare const getProjectInfo: (opts?: IOptions) => Promise<ProjectInfo>;
