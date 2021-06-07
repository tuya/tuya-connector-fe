import createService from "../../common/service";
import { IOptions, paginationType } from "../../common/types";

export interface role {
  roleCode: string;
  roleName: string;
}

export interface roleListResp extends paginationType {
  data: role[],
}

/**
 * fetch the role list
 * 
 * @param opts 
 * @returns 
 */
export const getRoleList = (pageNo: number = 20, pageSize: number = 1, opts: IOptions) => {
  return <Promise<roleListResp>>createService({
    apiMethodName: "getRoleList",
    url: `/roles`,
    method: "GET",
    ...opts,
    params: {
      pageSize,
      pageNo,
    }
  }).then((res) => {
    return res;
  });
};

// todo 待测试
export const getEntireRoles = async (opts: IOptions={data: {}}) => {
  const result: role[] = [];
  let pageSize = 1;
  const loopFetchRoleList = () => {
    return getRoleList(20, pageSize, opts).then(async (res) => {
      result.push(...res.data);
      pageSize += 1;
      if (result.length < res.total) {
        await loopFetchRoleList();
      }
    });
  };
  
  await loopFetchRoleList();

  return result;
};

// export interface roleType {
//   code: string;
//   name: string;
// }

// /**
//  * fetch all role types
//  * @returns 
//  */
// export const getRoleTypes = (opts: IOptions = {data: {}}) => {
//   return <Promise<roleType[]>>createService({
//     apiMethodName: "getRoleTypes",
//     url: `/roles-types`,
//     method: "GET",
//     ...opts,
//     params: {
//       ...opts.data,
//     },
//   }).then((res) => {
//     return res;
//   });
// };

export enum RoleType {
  manager = 'manager',
  normal = 'normal',
}

export interface addRoleParams {
  roleName: string;
  roleType: RoleType;
  roleRemark?: string; // role description
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
    method: "POST",
    ...opts,
    params: {
      ...opts.data,
      ...params,
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

export interface editRoleNameParams {
  roleCode: string,
  roleName: string,
  roleRemark?: string,
}

/**
 * modify roleName by roleCode
 * @param params 
 * @param opts 
 * @returns 
 */
export const editRoleName = (
  params: editRoleNameParams,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "editRoleName",
    url: `/role`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      ...params,
    },
  }).then(() => {
    return true;
  });
};

export interface grantPermissionByRoleParams {
  roleCode: string;
  permissionCodes: string[];
}

export const grantPermissionByRole = (params: grantPermissionByRoleParams, opts: IOptions = {data: {}}) => {
  return <Promise<permission[]>>createService({
    apiMethodName: "grantPermissionByRole",
    url: `/role/permissions`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      ...params,
    },
  }).then(() => {
    return true;
  }); 
};

/**
 * fetch permissions by roleCode
 */
export const getPermissionsByRole = (roleCode: string, opts:IOptions = {data: {}}) => {
  return <Promise<permission[]>>createService({
    apiMethodName: "getPermissionsByRole",
    url: `/role/permissions`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      roleCode,
    },
  }); 
};


// todo 第二部文档，无相关api
/**
 * modify asset permission by account
 */
// export const editAccountAssetPermission = (uid: string, assetIdList: string[], opts: IOptions = {data: {}}) => {
//   return <Promise<boolean>>createService({
//     apiMethodName: "editAccountAssetPermission",
//     url: `/grants/user-asset`,
//     method: "PUT",
//     ...opts,
//     data: {
//       ...opts.data,
//       uid,
//       assetIdList,
//     },
//   }).then(() => {
//     return true;
//   });
// };
export enum PermissionType {
  menu = 'menu',
  api = 'api',
  button = 'button',
  data = 'data',
};

export interface permission {
  permissionCode: string;
  permissionName: string;
  permissionType: PermissionType;
  parentCode: string;
  order: string;
  remark: string;
  authorizable: boolean;
}

/**
 * fetch role permission detail
 * @param roleCode 
 * @param opts 
 * @returns 
 */
export const getRolePermissionDetail = (roleCode: string, opts: IOptions = {data: {}}) => {
  return <Promise<permission[]>>createService({
    apiMethodName: "getRolePermissionDetail",
    url: `/role/permissions`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      roleCode,
    },
  });
};

export const getRolePermissionTemplate = (roleCode: string, opts: IOptions = {data: {}}) => {
  return <Promise<permission[]>>createService({
    apiMethodName: "getRolePermissionTemplate",
    url: `/permission-template/role`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      roleCode,
    },
  }); 
};
