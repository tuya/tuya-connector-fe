import createService from "../../common/service";
import { IOptions } from "../../common/types";

export interface permissionTemplate {}

export const getPermissionTemplateList = (opts: IOptions) => {
  return <Promise<permissionTemplate>>createService({
    apiMethodName: "getPermissionTemplateList",
    url: ``,
    method: "GET",
    ...opts,
  }).then((res) => {
    return <permissionTemplate>res;
  });
};

export interface role {
  code: string;
  name: string;
  typeCode: string;
}

/**
 * fetch the entire role list
 * @param opts 
 * @returns 
 */
export const getRoleList = (opts: IOptions) => {
  return <Promise<role[]>>createService({
    apiMethodName: "getRoleList",
    url: `/roles`,
    method: "GET",
    ...opts,
  }).then((res) => {
    return res;
  });
};

export interface roleType {
  code: string;
  name: string;
}

/**
 * fetch all role types
 * @returns 
 */
export const getRoleTypes = (opts: IOptions = {data: {}}) => {
  return <Promise<roleType[]>>createService({
    apiMethodName: "getRoleTypes",
    url: `/roles-types`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
    },
  }).then((res) => {
    return res;
  });
};

export interface addRoleParams {
  roleName: string;
  roleType: string;
}

/**
 * create new role
 * @param params 
 * @param opts 
 * @returns 
 */
export const addRole = (params: addRoleParams, opts: IOptions = {data: {}}) => {
  return <Promise<boolean>>createService({
    apiMethodName: "addRole",
    url: `/roles`,
    method: "PUT",
    ...opts,
    params: {
      ...opts.data,
    },
  }).then(() => {
    return true;
  });
};

/**
 * remove role
 * @param roleCode 
 * @param opts 
 * @returns 
 */
export const removeRole = (roleCode: string, opts: IOptions = { data: {} }) => {
  return <Promise<boolean>>createService({
    apiMethodName: "removeRole",
    url: `/roles/${roleCode}`,
    method: "DELETE",
    ...opts,
    params: {
      ...opts.data,
      roleCode,
    },
  }).then(() => {
    return true;
  });
};

/**
 * modify roleName by roleCode
 * @param roleCode 
 * @param roleName 
 * @param opts 
 * @returns 
 */
export const editRoleName = (
  roleCode: string,
  roleName: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "editRoleName",
    url: `/roles/${roleCode}/name`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      name: roleName,
    },
  }).then(() => {
    return true;
  });
};

// todo params 确认
export const grantPermissionByRole = () => {};

/**
 * fetch my permissions
 */
export const getMyPermissions = () => {};

/**
 * fetch my roles
 */
export const getMyRoles = () => {};


/**
 * modify asset permission by account
 */
export const editAccountAssetPermission = (uid: string, assetIdList: string[], opts: IOptions = {data: {}}) => {
  return <Promise<boolean>>createService({
    apiMethodName: "editAccountAssetPermission",
    url: `/grants/user-asset`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      uid,
      assetIdList,
    },
  }).then(() => {
    return true;
  });
};

