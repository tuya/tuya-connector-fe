"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyUserRole = exports.batchModifyUserRole = exports.editAccountPwd = exports.removeAccount = exports.batchRemoveAccount = exports.editAccountName = exports.addAccount = exports.getPermissionListByAccount = exports.getAccountList = void 0;
var tslib_1 = require("tslib");
var js_sha256_1 = require("js-sha256");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
/**
 * fetch account list
 * @returns
 */
var getAccountList = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'getAccountList', url: "/users", method: 'GET' }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function (res) {
        return res;
    });
};
exports.getAccountList = getAccountList;
/**
 * 获取用户权限列表
 */
var getPermissionListByAccount = function (uid, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'getPermissionListByAccount', url: "/users/" + uid + "/permissions", method: 'GET' }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { uid: uid }) }));
};
exports.getPermissionListByAccount = getPermissionListByAccount;
/**
 * create new account
 * @param params
 * @param opts
 * @returns
 */
var addAccount = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'addAccount', url: "/users", method: 'POST' }, opts), { data: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, opts.data), params), { password: js_sha256_1.sha256(params.password) }) })).then(function () {
        return true;
    });
};
exports.addAccount = addAccount;
/**
 * edit account nickname
 * @param userId
 * @param nickName
 * @param opts
 * @returns
 */
var editAccountName = function (userId, nickName, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'editAccountName', url: "/users", method: 'PUT' }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userId: userId,
            nickName: nickName }) })).then(function () {
        return true;
    });
};
exports.editAccountName = editAccountName;
/**
 * batch remove account
 * @param userIds
 * @param opts
 * @returns
 */
var batchRemoveAccount = function (userIds, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'batchRemoveAccount', url: "/users", method: 'DELETE' }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userIds: userIds.join(',') }) })).then(function () {
        return true;
    });
};
exports.batchRemoveAccount = batchRemoveAccount;
var removeAccount = function (userId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'removeAccount', url: "/users/" + userId, method: 'DELETE' }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userId: userId }) })).then(function () {
        return true;
    });
};
exports.removeAccount = removeAccount;
var editAccountPwd = function (userName, newPwd, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'editAccountPwd', url: "/users/pwd", method: 'PUT' }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userName: userName, newPwd: js_sha256_1.sha256(newPwd) }) })).then(function () {
        return true;
    });
};
exports.editAccountPwd = editAccountPwd;
/**
 * batch modify user role
 * @returns
 */
var batchModifyUserRole = function (userIds, roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'batchModifyUserRole', url: "/users/roles", method: 'PUT' }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userIds: userIds,
            roleCode: roleCode }) })).then(function () {
        return true;
    });
};
exports.batchModifyUserRole = batchModifyUserRole;
var modifyUserRole = function (userId, roleCode, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'modifyUserRole', url: "/users", method: 'PUT' }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { userId: userId, roleCodes: [roleCode] }) })).then(function () {
        return true;
    });
};
exports.modifyUserRole = modifyUserRole;
