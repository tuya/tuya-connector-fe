"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
var tslib_1 = require("tslib");
var request_1 = tslib_1.__importDefault(require("./request"));
var config_1 = require("./config");
exports.request = request_1.default();
var createService = function (options, instance) {
    if (options === void 0) { options = { apiMethodName: '' }; }
    var requestInstance = instance || exports.request;
    var globalConfig = config_1.getGlobalConfig();
    return requestInstance.request(tslib_1.__assign(tslib_1.__assign({}, globalConfig), options)).then(function (resp) {
        var _a, _b, _c, _d;
        if ((resp.statusText === 'OK' || (resp.status >= 200 && resp.status < 300)) && ((_a = resp.data) === null || _a === void 0 ? void 0 : _a.success)) {
            return (_b = resp.data) === null || _b === void 0 ? void 0 : _b.result;
        }
        // http 状态不对，抛异常；success fail，抛异常
        var errorObj = {
            apiMethodName: options.apiMethodName,
            msg: (_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.msg,
            code: (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.code,
            httpCode: resp.status,
        };
        if (globalConfig.onError) {
            globalConfig.onError(errorObj);
        }
        return Promise.reject(errorObj);
    });
};
exports.default = createService;
