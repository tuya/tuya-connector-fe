import { sha256 } from "js-sha256";

import createService from "../../common/service";
import { errorType, IOptions } from "../../common/types";
import { role, permission } from "../permission";


export interface user {
  userId: string;
  nickName: string;
  userName: string; // login account
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
export const getAccountList = (params: getAccountListParams, opts: IOptions = {data: {}}) => {
  return <Promise<userListResp | errorType>>createService({
    apiMethodName: 'getAccountList',
    url: `/users`,
    method: 'GET',
    ...opts,
    params: {
      ...opts.data,
      ...params,
    },
  }).then((res) => {
    return res;
  });
};

/**
 * 获取用户权限列表
 */
export const getPermissionListByAccount = (uid: string, opts: IOptions = {data: {}}) => {
  return <Promise<permission[] | errorType>>createService({
    apiMethodName: 'getPermissionListByAccount',
    url: `/users/${uid}/permissions`,
    method: 'GET',
    ...opts,
    params: {
      ...opts.data,
      uid,
    },
  }).then((res) => {
    res
  });
};

/**
 * query user count by roleCode
 * @param roleCode 
 * @param opts 
 */
// export const getUserCountByRole = (roleCode: string, opts: IOptions = {data: {}}) => {};

export interface addAccountParams {
  password: string;
  nickName?: string;
  roleCodes: string[];
  userName: string,
  countryCode?: string,
}

/**
 * create new account
 * @param params 
 * @param opts 
 * @returns 
 */
export const addAccount = (params: addAccountParams, opts:IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'addAccount',
    url: `/users`,
    method: 'POST',
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
 * @param userId 
 * @param nickName 
 * @param opts 
 * @returns 
 */
export const editAccountName = (userId: string, nickName: string, opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'editAccountName',
    url: `/users`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      userId,
      nickName,
    },
  }).then(() => {
    return true;
  }); 
};

/**
 * batch remove account
 * @param userIds 
 * @param opts 
 * @returns 
 */
export const batchRemoveAccount = (userIds: string[], opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'batchRemoveAccount',
    url: `/users`,
    method: 'DELETE',
    ...opts,
    params: {
      ...opts.data,
      userIds: userIds.join(','),
    },
  }).then(() => {
    return true;
  }); 
};

// todo params 修正
// export const batchEditAccountRole = (roleCodeList: string[], opts: IOptions = {data: {}}) => {
//   return <Promise<boolean | errorType>>createService({
//     apiMethodName: 'batchEditAccountRole',
//     url: `/batch-grants/user-role`,
//     method: 'PUT',
//     ...opts,
//     data: {
//       ...opts.data,
//       roleCodeList,
//     },
//   }).then(() => {
//     return true;
//   }); 
// };


export const editAccountPwd = (userName: string, newPwd: string, opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'editAccountPwd',
    url: `/users/pwd`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      userName,
      newPwd: sha256(newPwd),
    },
  }).then(() => {
    return true;
  });
};


/**
 * batch modify user role
 * @returns 
 */
export const batchModifyUserRole = (userIds: string[], roleCode: string, opts:IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'batchModifyUserRole',
    url: `/users/roles`,
    method: 'PUT',
    ...opts,
    data: {
      ...opts.data,
      userIds,
      roleCode,
    },
  }).then(() => {
    return true;
  }); 
}
