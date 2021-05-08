import createService from "../../common/service";
import { IOptions } from "../../common/types";

export type DeviceStatus = {
  code: string; // 	设备状态名
  value: Object; // 设备状态值
  options?: string; // dp取值配置
  editable?: boolean; // 是否可编辑
  name?: string; // dp名称
  type?: string; // dp类型
};

export type DeviceInfo = {
  id: string; // 设备编号
  name: string; // 设备名称
  uid: string; // 用户Id
  local_key: string; // 密钥
  category: string; // 产品类别
  product_id: string; // 产品Id
  product_name: string; // 产品名称
  sub: boolean; // 判断是否为子设备
  uuid: string; // 设备唯一标识
  online: boolean; // 设备在线状态
  active_time: number; // 设备激活时间，时间戳，精确到秒
  icon: string; // 设备图标
  ip: string; // 设备IP
  create_time: number; // 设备创建时间，时间戳，精确到秒
  update_time: number; // 设备更新时间，时间戳，精确到秒
  time_zone: string; // 时区，比如: +08:00
  status: DeviceStatus[];
};

export type DeviceInfoList = {
  data: DeviceInfo[];
  page_no: number;
  page_size: number;
  total: number;
};

export type ProjectInfo = {
  project_name: string;
  project_code: string;
};

/**
 * 获取指定资产下的设备信息
 * @param assetId
 * @param opts
 */
export const getDevicesInfoByAssetId = (
  assetId: string,
  pageNum: number,
  pageSize: number,
  opts: IOptions = { data: {} }
) => {
  return <Promise<DeviceInfoList>>createService({
    apiMethodName: "getDevicesInfoByAssetId",
    url: `/assets/${assetId}/deviceInfos`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      asset_id: assetId,
      page_no: pageNum,
      page_size: pageSize,
    },
  }).then((res) => {
    if (res) {
      return <DeviceInfoList>res;
    }
    return [];
  });
};

/**
 * 获取设备信息
 * @param deviceId
 * @param opts
 */
export const getDeviceInfoByDeviceId = (
  deviceId: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<DeviceInfo>>createService({
    apiMethodName: "getDeviceInfoByDeviceId",
    url: `/device/${deviceId}`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      device_id: deviceId,
    },
  }).then((res) => {
    if (res) {
      return <DeviceInfo>res;
    }
    return null;
  });
};

/**
 * 删除设备
 */
export const removeDeviceById = (
  deviceId: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "removeDeviceById",
    url: `/device/${deviceId}`,
    method: "DELETE",
    ...opts,
    params: {
      ...opts.data,
      device_id: deviceId,
    },
  }).then((res) => {
    return <boolean>!!res;
  });
};

/**
 * 修改设备
 */
export const modifyDeviceInfo = (
  deviceId: string,
  name: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "modifyDeviceInfo",
    url: `/device/${deviceId}`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      device_id: deviceId,
      name,
    },
  }).then((res) => {
    return <boolean>!!res;
  });
};

/**
 * 控制设备
 */
export const modifyDeviceDP = (
  deviceId: string,
  deviceStatuses: DeviceStatus[],
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "modifyDeviceDP",
    url: `/device/command/${deviceId}`,
    method: "POST",
    ...opts,
    data: deviceStatuses,
  }).then((res) => {
    return <boolean>!!res;
  });
};

/**
 * 获取设备指令
 */
export const getDeviceDP = (
  deviceId: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<any>>createService({
    apiMethodName: "getDeviceDP",
    url: `/device/specification/${deviceId}`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      device_id: deviceId,
    },
  }).then((res) => {
    return res;
  });
};

/**
 * 获取设备详情&指令
 */
export const getDeviceInfoWithDP = (
  deviceId: string,
  opt: IOptions = { data: {} }
) => {
  return Promise.all([
    getDeviceDP(deviceId, opt),
    getDeviceInfoByDeviceId(deviceId, opt),
  ]).then((data) => {
    const [dp, info] = data;

    const statusInfo = info?.status;
    const functions = dp?.functions;
    const statusDP = dp?.status;
    if (statusInfo && (functions || statusDP)) {
      const tempObj = <any>{};
      statusInfo.forEach((item) => {
        tempObj[item.code] = item;
      });

      if (Array.isArray(statusDP) && statusDP.length) {
        statusDP.forEach((item) => {
          const elem = tempObj[item.code];
          if (elem) {
            tempObj[item.code] = Object.assign({}, elem, {
              editable: false,
              type: item.type,
              options: item.values,
              name: item.name ? item.name : "",
            });
          }
        });
      }

      if (Array.isArray(functions) && functions.length) {
        functions.forEach((item) => {
          const elem = tempObj[item.code];
          if (elem) {
            tempObj[item.code] = Object.assign({}, elem, {
              editable: true,
              type: item.type,
              options: item.values,
              name: item.name,
            });
          }
        });
      }

      info.status = Object.keys(tempObj).map((key) => {
        return tempObj[key];
      });
    }

    return {
      ...info,
    };
  });
};

export const getProjectInfo = (opts: IOptions = { data: {} }) => {
  return <Promise<ProjectInfo>>createService({
    apiMethodName: "getProjectInfo",
    url: `/device/qrcode`,
    method: "GET",
    ...opts,
  }).then((res) => {                                                                   
    return <ProjectInfo>res;
  });
};
