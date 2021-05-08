"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectInfo = exports.getDeviceInfoWithDP = exports.getDeviceDP = exports.modifyDeviceDP = exports.modifyDeviceInfo = exports.removeDeviceById = exports.getDeviceInfoByDeviceId = exports.getDevicesInfoByAssetId = void 0;
var tslib_1 = require("tslib");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
/**
 * 获取指定资产下的设备信息
 * @param assetId
 * @param opts
 */
var getDevicesInfoByAssetId = function (assetId, pageNum, pageSize, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getDevicesInfoByAssetId", url: "/assets/" + assetId + "/deviceInfos", method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_id: assetId, page_no: pageNum, page_size: pageSize }) })).then(function (res) {
        if (res) {
            return res;
        }
        return [];
    });
};
exports.getDevicesInfoByAssetId = getDevicesInfoByAssetId;
/**
 * 获取设备信息
 * @param deviceId
 * @param opts
 */
var getDeviceInfoByDeviceId = function (deviceId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getDeviceInfoByDeviceId", url: "/device/" + deviceId, method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { device_id: deviceId }) })).then(function (res) {
        if (res) {
            return res;
        }
        return null;
    });
};
exports.getDeviceInfoByDeviceId = getDeviceInfoByDeviceId;
/**
 * 删除设备
 */
var removeDeviceById = function (deviceId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "removeDeviceById", url: "/device/" + deviceId, method: "DELETE" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { device_id: deviceId }) })).then(function (res) {
        return !!res;
    });
};
exports.removeDeviceById = removeDeviceById;
/**
 * 修改设备
 */
var modifyDeviceInfo = function (deviceId, name, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "modifyDeviceInfo", url: "/device/" + deviceId, method: "PUT" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { device_id: deviceId, name: name }) })).then(function (res) {
        return !!res;
    });
};
exports.modifyDeviceInfo = modifyDeviceInfo;
/**
 * 控制设备
 */
var modifyDeviceDP = function (deviceId, deviceStatuses, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "modifyDeviceDP", url: "/device/command/" + deviceId, method: "POST" }, opts), { data: deviceStatuses })).then(function (res) {
        return !!res;
    });
};
exports.modifyDeviceDP = modifyDeviceDP;
/**
 * 获取设备指令
 */
var getDeviceDP = function (deviceId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getDeviceDP", url: "/device/specification/" + deviceId, method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { device_id: deviceId }) })).then(function (res) {
        return res;
    });
};
exports.getDeviceDP = getDeviceDP;
/**
 * 获取设备详情&指令
 */
var getDeviceInfoWithDP = function (deviceId, opt) {
    if (opt === void 0) { opt = { data: {} }; }
    return Promise.all([
        exports.getDeviceDP(deviceId, opt),
        exports.getDeviceInfoByDeviceId(deviceId, opt),
    ]).then(function (data) {
        var dp = data[0], info = data[1];
        var statusInfo = info === null || info === void 0 ? void 0 : info.status;
        var functions = dp === null || dp === void 0 ? void 0 : dp.functions;
        var statusDP = dp === null || dp === void 0 ? void 0 : dp.status;
        if (statusInfo && (functions || statusDP)) {
            var tempObj_1 = {};
            statusInfo.forEach(function (item) {
                tempObj_1[item.code] = item;
            });
            if (Array.isArray(statusDP) && statusDP.length) {
                statusDP.forEach(function (item) {
                    var elem = tempObj_1[item.code];
                    if (elem) {
                        tempObj_1[item.code] = Object.assign({}, elem, {
                            editable: false,
                            type: item.type,
                            options: item.values,
                            name: item.name ? item.name : "",
                        });
                    }
                });
            }
            if (Array.isArray(functions) && functions.length) {
                functions.forEach(function (item) {
                    var elem = tempObj_1[item.code];
                    if (elem) {
                        tempObj_1[item.code] = Object.assign({}, elem, {
                            editable: true,
                            type: item.type,
                            options: item.values,
                            name: item.name,
                        });
                    }
                });
            }
            info.status = Object.keys(tempObj_1).map(function (key) {
                return tempObj_1[key];
            });
        }
        return tslib_1.__assign({}, info);
    });
};
exports.getDeviceInfoWithDP = getDeviceInfoWithDP;
var getProjectInfo = function (opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign({ apiMethodName: "getProjectInfo", url: "/device/qrcode", method: "GET" }, opts)).then(function (res) {
        return res;
    });
};
exports.getProjectInfo = getProjectInfo;
