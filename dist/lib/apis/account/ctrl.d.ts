import { errorType, IOptions } from "../../common/types";
import { role, permission } from "../permission";
export interface user {
    userId: string;
    nickName: string;
    userName: string;
    createTime: string;
    roles: role[];
}
export interface getAccountListParams {
    searchKey: string;
    roleCode: string;
    pageNo: number;
    pageSize: number;
}
export interface userListResp {
    total: number;
    pageNo: number;
    pageSize: number;
    data: user[];
}
/**
 * fetch account list
 * @returns
 */
export declare const getAccountList: (params: getAccountListParams, opts?: IOptions) => Promise<errorType | userListResp>;
/**
 * 获取用户权限列表
 */
export declare const getPermissionListByAccount: (uid: string, opts?: IOptions) => Promise<errorType | permission[]>;
/**
 * query user count by roleCode
 * @param roleCode
 * @param opts
 */
export interface addAccountParams {
    password: string;
    nickName?: string;
    roleCodes: string[];
    userName: string;
    countryCode?: string;
}
/**
 * create new account
 * @param params
 * @param opts
 * @returns
 */
export declare const addAccount: (params: addAccountParams, opts?: IOptions) => Promise<boolean | errorType>;
/**
 * batch remove account
 * @param userIds
 * @param opts
 * @returns
 */
export declare const batchRemoveAccount: (userIds: string[], opts?: IOptions) => Promise<boolean | errorType>;
export declare const removeAccount: (userId: string, opts?: IOptions) => Promise<boolean | errorType>;
export declare const editAccountPwd: (userName: string, newPwd: string, opts?: IOptions) => Promise<boolean | errorType>;
/**
 * batch modify user role
 * @returns
 */
export declare const batchModifyUserRole: (userIds: string[], roleCode: string, opts?: IOptions) => Promise<boolean | errorType>;
export declare const modifyUserRole: (userId: string, roleCode: string, opts?: IOptions) => Promise<boolean | errorType>;
