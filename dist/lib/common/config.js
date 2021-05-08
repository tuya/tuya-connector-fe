"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponseRaw = exports.initGlobalConfig = exports.setGlobalConfig = exports.getGlobalConfig = void 0;
var apiGlobalConfig = {
    baseURL: '',
    method: 'GET',
    onError: function () { },
};
var getGlobalConfig = function () {
    return apiGlobalConfig;
};
exports.getGlobalConfig = getGlobalConfig;
var setGlobalConfig = function (options) {
    return Object.assign(apiGlobalConfig, options);
};
exports.setGlobalConfig = setGlobalConfig;
var initGlobalConfig = function (options) {
    exports.setGlobalConfig(options);
};
exports.initGlobalConfig = initGlobalConfig;
var isResponseRaw = function (options) {
    if (apiGlobalConfig.responseRaw || options.responseRaw) {
        return true;
    }
    return false;
};
exports.isResponseRaw = isResponseRaw;
