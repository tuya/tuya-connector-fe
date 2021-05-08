"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.multiLogin = exports.login = void 0;
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
 * 获取验证码
 */
// export const getVerifyCode = (params: verifyCodeParamsEmail | verifyCodeParamsPhone, opts: IOptions = {data: {}}) => {
//   return <Promise<boolean | errorType>>createService({
//     apiMethodName: 'getVerifyCode',
//     url: '/verification-code',
//     method: 'GET',
//     ...opts,
//     params: {
//       ...opts.data,
//       ...params,
//     },
//   }).then(() => {
//     return true;
//   }).catch((err) => {
//     return err;
//   });
// };
