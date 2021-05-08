"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
function createRequest() {
    var instance = axios_1.default.create();
    return instance;
}
exports.default = createRequest;
;
