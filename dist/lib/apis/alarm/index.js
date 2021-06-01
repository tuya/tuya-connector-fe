"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlarmList = void 0;
var tslib_1 = require("tslib");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
;
/**
 * 获取设备告警列表
 * @param params
 * @param options
 */
var getAlarmList = function (params, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: 'getAlarmList', url: '/device/alarms', method: 'GET' }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), params) })).then(function (res) {
        if (res) {
            return res;
        }
        return null;
    });
};
exports.getAlarmList = getAlarmList;
