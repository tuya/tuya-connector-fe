"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubTreeFast = exports.getEntireTree = exports.getSubTree = exports.searchAssetByName = exports.getChildrenAssetsByAssetId = exports.removeAsset = exports.editAsset = exports.addAsset = void 0;
var tslib_1 = require("tslib");
var service_1 = tslib_1.__importDefault(require("../../common/service"));
var addAsset = function (assetName, parentAssetId, opts) {
    if (parentAssetId === void 0) { parentAssetId = ""; }
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "addAsset", url: "/assets", method: "POST" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_name: assetName, parent_asset_id: parentAssetId }) }));
};
exports.addAsset = addAsset;
var editAsset = function (assetId, assetName, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "editAsset", url: "/assets/" + assetId, method: "PUT" }, opts), { data: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_name: assetName, asset_id: assetId }) }));
};
exports.editAsset = editAsset;
var removeAsset = function (assetId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "removeAsset", url: "/assets/" + assetId, method: "DELETE" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_id: assetId }) }));
};
exports.removeAsset = removeAsset;
// 获取指定asset下的asset list，一级节点
var getChildrenAssetsByAssetId = function (assetId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "getChildrenAssetsByAssetId", url: "/assets/" + assetId, method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_id: assetId }) })).then(function (res) {
        if (res) {
            return res.map(function (item) {
                return tslib_1.__assign(tslib_1.__assign({}, item), { parent_id: assetId, has_children: !!item.child_asset_count });
            });
        }
        return [];
    });
};
exports.getChildrenAssetsByAssetId = getChildrenAssetsByAssetId;
var searchAssetByName = function (assetName, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign(tslib_1.__assign({ apiMethodName: "searchAssetByName", url: "/assets", method: "GET" }, opts), { params: tslib_1.__assign(tslib_1.__assign({}, opts.data), { asset_name: assetName }) })).then(function (res) {
        if (res) {
            return res;
        }
        return [];
    });
};
exports.searchAssetByName = searchAssetByName;
var getSubTree = function (assetId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign({ apiMethodName: "getEntireTree", url: "/assets/tree/" + assetId, method: "GET" }, opts)).then(function (res) {
        if (res) {
            return res;
        }
        return {};
    });
};
exports.getSubTree = getSubTree;
var getEntireTree = function (opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return exports.getSubTree("-1", opts).then(function (res) {
        if (res.subAssets) {
            return res.subAssets;
        }
        return [];
    });
};
exports.getEntireTree = getEntireTree;
/**
 * 获取一级子节点，加速版
 * @param assetId
 * @param opts
 * @returns
 */
var getSubTreeFast = function (assetId, opts) {
    if (opts === void 0) { opts = { data: {} }; }
    return service_1.default(tslib_1.__assign({ apiMethodName: "getSubTreeFast", url: "/assets/tree-fast/" + assetId, method: "GET" }, opts)).then(function (res) {
        if (res) {
            return res;
        }
        return {};
    });
};
exports.getSubTreeFast = getSubTreeFast;
