"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyCode = exports.forgetPassword = exports.logout = exports.resetPassword = exports.multiLogin = exports.login = void 0;
var tslib_1 = require("tslib");
var js_sha256_1 = require("js-sha256");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
var login = function (username, pwd, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "login", url: "/login", method: "POST" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { user_name: username, login_password: js_sha256_1.sha256(pwd) }) })).then(function (res) {
        if (res) {
            return res;
        }
        return null;
    });
};
exports.login = login;
/**
 * 聚合登录，电话 or email
 * @param params
 * @param opts
 * @returns
 */
var multiLogin = function (_a, opts) {
    var userName = _a.userName, pwd = _a.pwd, countryCode = _a.countryCode, phoneNum = _a.phoneNum;
    if (opts === void 0) { opts = { data: {} }; }
    var params = {
        login_password: js_sha256_1.sha256(pwd),
    };
    if (userName) {
        params.user_name = userName;
    }
    if (countryCode && phoneNum) {
        params.country_code = countryCode;
        params.telephone = phoneNum;
    }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "login", url: "/login", method: "POST" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function (res) {
        if (res) {
            return res;
        }
        return null;
    });
};
exports.multiLogin = multiLogin;
/**
 * 修改密码
 * @param username
 * @param oldPwd
 * @param newPwd
 * @param opts
 * @returns
 */
var resetPassword = function (username, oldPwd, newPwd, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "resetPassword", url: "/user/password", method: "PUT" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { user_name: username, current_password: js_sha256_1.sha256(oldPwd), new_password: js_sha256_1.sha256(newPwd) }) }));
};
exports.resetPassword = resetPassword;
/**
 * 登出
 * @param opts
 * @returns
 */
var logout = function (opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign({ apiMethodName: "logout", url: "/logout", method: "POST" }, opts))
        .then(function () {
        return true;
    })
        .catch(function (err) {
        return err;
    });
};
exports.logout = logout;
/**
 * 忘记密码，用户密码重置
 */
var forgetPassword = function (_a, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    var code = _a.code, newPassword = _a.newPassword, rest = tslib_1.__rest(_a, ["code", "newPassword"]);
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'forgetPassword', url: '/user/password/reset', method: 'POST' }, opts), { data: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, opts.data), { newPassword: js_sha256_1.sha256(newPassword), code: code }), rest) })).then(function () {
        return true;
    }).catch(function (err) {
        return err;
    });
};
exports.forgetPassword = forgetPassword;
/**
 * 获取验证码
 * @params params[verifyCodeParamsEmail | verifyCodeParamsPhone]
 */
var getVerifyCode = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'getVerifyCode', url: '/user/password/reset/captcha', method: 'POST' }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function () {
        return true;
    }).catch(function (err) {
        return err;
    });
};
exports.getVerifyCode = getVerifyCode;
