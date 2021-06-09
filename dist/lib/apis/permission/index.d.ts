import { IOptions, paginationType } from "../../common/types";
export interface role {
    roleCode: string;
    roleName: string;
}
export interface roleListResp extends paginationType {
    data: role[];
}
/**
 * fetch the role list
 *
 * @param opts
 * @returns
 */
export declare const getRoleList: (pageNo: number | undefined, pageSize: number | undefined, opts: IOptions) => Promise<roleListResp>;
export declare const getEntireRoles: (opts?: IOptions) => Promise<role[]>;
export declare enum RoleType {
    manager = "manager",
    normal = "normal"
}
export interface addRoleParams {
    roleName: string;
    roleType: RoleType;
    roleRemark?: string;
}
/**
 * create new role
 * @param params
 * @param opts
 * @returns
 */
export declare const addRole: (params: addRoleParams, opts?: IOptions) => Promise<boolean>;
/**
 * remove role
 * @param roleCode
 * @param opts
 * @returns
 */
export declare const removeRole: (roleCode: string, opts?: IOptions) => Promise<boolean>;
export interface editRoleNameParams {
    roleCode: string;
    roleName: string;
    roleRemark?: string;
}
/**
 * modify roleName by roleCode
 * @param params
 * @param opts
 * @returns
 */
export declare const editRoleName: (params: editRoleNameParams, opts?: IOptions) => Promise<boolean>;
export interface grantPermissionByRoleParams {
    roleCode: string;
    permissionCodes: string[];
}
export declare const grantPermissionByRole: (params: grantPermissionByRoleParams, opts?: IOptions) => Promise<boolean>;
/**
 * fetch permissions by roleCode
 */
export declare const getPermissionsByRole: (roleCode: string, opts?: IOptions) => Promise<permission[]>;
/**
 * modify asset permission by account
 */
export declare enum PermissionType {
    menu = "menu",
    api = "api",
    button = "button",
    data = "data"
}
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
export declare const getRolePermissionDetail: (roleCode: string, opts?: IOptions) => Promise<permission[]>;
export declare const getRolePermissionTemplate: (roleCode: string, opts?: IOptions) => Promise<permission[]>;
