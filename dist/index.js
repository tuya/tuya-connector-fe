"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = exports.version = exports.configMethod = exports.apiService = void 0;
var tslib_1 = require("tslib");
var service_1 = tslib_1.__importDefault(require("./lib/common/service"));
var configMethod = tslib_1.__importStar(require("./lib/common/config"));
exports.configMethod = configMethod;
var package_json_1 = tslib_1.__importDefault(require("./package.json"));
var apiService = tslib_1.__importStar(require("./lib/apis"));
exports.apiService = apiService;
var version = package_json_1.default.version;
exports.version = version;
var apiClient = function (config) {
    return service_1.default(Object.assign({}, config, { apiMethodName: "" }));
};
exports.apiClient = apiClient;
var coreSdk = {
    version: version,
    apiClient: apiClient,
    configMethod: configMethod,
    apiService: apiService,
};
exports.default = coreSdk;
