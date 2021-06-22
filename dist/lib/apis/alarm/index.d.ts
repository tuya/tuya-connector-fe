import { errorType, IOptions } from "../../common/types";
export interface alarmParams {
    alarmDegree: string;
    startTime: string;
    endTime: string;
    alarmStatus: string;
    searchKey: string;
    pageSize: number;
    pageNum: number;
}
export interface alarmItem {
    deviceName: string;
    alarmId: string;
    ruleName: string;
    content: string;
    handled: boolean;
    gmtCreate: string;
    degree: string;
}
export interface alarmResp {
    total: number;
    pageNo: number;
    pageSize: number;
    data: alarmItem[];
}
/**
 * 获取设备告警列表
 * @param params
 * @param options
 */
export declare const getAlarmList: (params: alarmParams, opts?: IOptions) => Promise<errorType | alarmResp>;
