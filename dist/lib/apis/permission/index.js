"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolePermissionTemplate = exports.getRolePermissionDetail = exports.PermissionType = exports.getPermissionsByRole = exports.grantPermissionByRole = exports.editRoleName = exports.removeRole = exports.addRole = exports.RoleType = exports.getEntireRoles = exports.getRoleList = void 0;
var tslib_1 = require("tslib");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
/**
 * fetch the role list
 *
 * @param opts
 * @returns
 */
var getRoleList = function (pageNo, pageSize, opts) {
    if (pageNo === void 0) { pageNo = 20; }
    if (pageSize === void 0) { pageSize = 1; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getRoleList", url: "/roles", method: "GET" }, opts), { params: {
            pageSize: pageSize,
            pageNo: pageNo,
        } })).then(function (res) {
        return res;
    });
};
exports.getRoleList = getRoleList;
// todo 待测试
var getEntireRoles = function (opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, pageSize, loopFetchRoleList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    pageSize = 1;
                    loopFetchRoleList = function () {
                        return exports.getRoleList(20, pageSize, opts).then(function (res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        result.push.apply(result, res.data);
                                        pageSize += 1;
                                        if (!(result.length < res.total)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, loopFetchRoleList()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                    };
                    return [4 /*yield*/, loopFetchRoleList()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getEntireRoles = getEntireRoles;
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
var RoleType;
(function (RoleType) {
    RoleType["manager"] = "manager";
    RoleType["normal"] = "normal";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
/**
 * create new role
 * @param params
 * @param opts
 * @returns
 */
var addRole = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "addRole", url: "/roles", method: "POST" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function () {
        return true;
    });
};
exports.addRole = addRole;
/**
 * remove role
 * @param roleCode
 * @param opts
 * @returns
 */
var removeRole = function (roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "removeRole", url: "/roles/" + roleCode, method: "DELETE" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { roleCode: roleCode }) })).then(function () {
        return true;
    });
};
exports.removeRole = removeRole;
/**
 * modify roleName by roleCode
 * @param params
 * @param opts
 * @returns
 */
var editRoleName = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "editRoleName", url: "/role", method: "PUT" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function () {
        return true;
    });
};
exports.editRoleName = editRoleName;
var grantPermissionByRole = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "grantPermissionByRole", url: "/role/permissions", method: "PUT" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function () {
        return true;
    });
};
exports.grantPermissionByRole = grantPermissionByRole;
/**
 * fetch permissions by roleCode
 */
var getPermissionsByRole = function (roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getPermissionsByRole", url: "/role/permissions", method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { roleCode: roleCode }) }));
};
exports.getPermissionsByRole = getPermissionsByRole;
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
var PermissionType;
(function (PermissionType) {
    PermissionType["menu"] = "menu";
    PermissionType["api"] = "api";
    PermissionType["button"] = "button";
    PermissionType["data"] = "data";
})(PermissionType = exports.PermissionType || (exports.PermissionType = {}));
;
/**
 * fetch role permission detail
 * @param roleCode
 * @param opts
 * @returns
 */
var getRolePermissionDetail = function (roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getRolePermissionDetail", url: "/role/permissions", method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { roleCode: roleCode }) }));
};
exports.getRolePermissionDetail = getRolePermissionDetail;
var getRolePermissionTemplate = function (roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getRolePermissionTemplate", url: "/permission-template/role", method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { roleCode: roleCode }) }));
};
exports.getRolePermissionTemplate = getRolePermissionTemplate;
