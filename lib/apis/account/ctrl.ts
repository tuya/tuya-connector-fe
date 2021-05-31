import { sha256 } from "js-sha256";

import createService from "../../common/service";
import { errorType, IOptions } from "../../common/types";

export enum permissionType {
  page = 'page',
  menu = 'menu',
  api = 'api',
}

export interface userPermission {
  id: string;
  code: string;
  name: string;
  type: permissionType;
}

/**
 * 获取用户权限列表
 */
export const getPermissionListByAccount = (uid: string, opts: IOptions = {data: {}}) => {
  return <Promise<userPermission[] | errorType>>createService({
    apiMethodName: 'getPermissionListByAccount',
    url: `/users/${uid}/permissions`,
    method: 'GET',
    ...opts,
    params: {
      ...opts.data,
      uid,
    },
  }).then((res) => {
    if (res?.length) {
      return res;
    }

    return [];
  });
};

/**
 * query user count by roleCode
 * @param roleCode 
 * @param opts 
 */
export const getUserCountByRole = (roleCode: string, opts: IOptions = {data: {}}) => {};

export interface addAccountParams {
  password: string;
  nickName: string;
  roleCodeList: string[];
}

export interface addAccountPhoneParams extends addAccountParams {
  countryCode: string,
  phone: string,
}

export interface addAccountEmailParams extends addAccountParams {
  email: string,
}

/**
 * create new account
 * @param params 
 * @param opts 
 * @returns 
 */
export const addAccount = (params: addAccountPhoneParams | addAccountEmailParams, opts:IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'addAccount',
    url: `/users`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      ...params,
      password: sha256(params.password)
    },
  }).then(() => {
    return true;
  });
};


/**
 * edit account nickname
 * @param uid 
 * @param nickName 
 * @param opts 
 * @returns 
 */
export const editAccountName = (uid: string, nickName: string, opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'editAccountName',
    url: `/users`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      uid,
      nickName,
    },
  }).then(() => {
    return true;
  }); 
};

/**
 * batch remove account
 * @param uidList 
 * @param opts 
 * @returns 
 */
export const batchRemoveAccount = (uidList: string[], opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'batchRemoveAccount',
    url: `/batch-users`,
    method: 'DELETE',
    ...opts,
    params: {
      ...opts.data,
      uidList: uidList.join(','),
    },
  }).then(() => {
    return true;
  }); 
};

// todo params 修正
export const batchEditAccountRole = (roleCodeList: string[], opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'batchEditAccountRole',
    url: `/batch-grants/user-role`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      roleCodeList,
    },
  }).then(() => {
    return true;
  }); 
};

// todo doc
export const editAccountPwd = () => {};
