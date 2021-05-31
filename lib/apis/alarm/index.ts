import createService from "../../common/service";
import { errorType, IOptions } from "../../common/types";

export enum level {
  info = 'info',
  warning = 'warning',
  error = 'error',
};

export enum dateType {
  today = 'today',
  yesterday = 'yesterday',
  last3Days = 'last3Days',
  last7Days = 'last7Days',
  last30Days = 'last30Days',
  lastHalfYear = 'lastHalfYear',
};

export enum status {
  solved = 'solved',
  pending = 'pending',
};

export interface alarmParams {
  alarmLevel: level;
  alarmDateType: dateType;
  alarmStatus: status;
  searchKey: string;
  pageSize: number;
  pageNum: number;
};

export interface alarmItem {
  deviceId: string;
  alarmId: string;
  alarmName: string;
  alarmContent: string;
  alarmStatus: status;
  alarmTime: string;
  alarmLevel: level;
}

export interface alarmResp {
  total: number;
  page_no: number;
  page_size: number;
  data: alarmItem[];
}


/**
 * 获取设备告警列表
 * @param params 
 * @param options 
 */
export const getAlarmList = (params: alarmParams, opts: IOptions = {data: {}}) => {
  return <Promise<alarmResp | errorType>>createService({
    apiMethodName: 'getAlarms',
    url: '/device-alarms',
    method: 'GET',
    ...opts,
    params: {
      ...opts.data,
      ...params,
    },
  }).then((res) => {
    if (res) {
      return res;
    }
    return null;
  }).catch((err) => {
    return err;
  });
};
