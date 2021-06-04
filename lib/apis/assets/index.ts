import createService from "../../common/service";
import { IOptions } from "../../common/types";

export type BaseAsset = {
  asset_id: string;
  asset_name: string;
  full_asset_name: string;
  is_authorized: boolean;
};

export type Asset = BaseAsset & {
  child_asset_count: number;
  child_device_count: number;
};

export type AssetDeep = Asset & {
  subAssets: AssetDeep[];
};

export const addAsset = (
  assetName: string,
  parentAssetId: string = "",
  opts: IOptions = { data: {} }
) => {
  return <Promise<string>>createService({
    apiMethodName: "addAsset",
    url: `/assets`,
    method: "POST",
    ...opts,
    data: {
      ...opts.data,
      asset_name: assetName,
      parent_asset_id: parentAssetId,
    },
  });
};

export const editAsset = (
  assetId: string,
  assetName: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "editAsset",
    url: `/assets/${assetId}`,
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      asset_name: assetName,
      asset_id: assetId,
    },
  });
};

export const removeAsset = (assetId: string, opts: IOptions = { data: {} }) => {
  return <Promise<string>>createService({
    apiMethodName: "removeAsset",
    url: `/assets/${assetId}`,
    method: "DELETE",
    ...opts,
    params: {
      ...opts.data,
      asset_id: assetId,
    },
  });
};

// 获取指定asset下的asset list，一级节点
export const getChildrenAssetsByAssetId = (
  assetId: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<Asset[]>>createService({
    apiMethodName: "getChildrenAssetsByAssetId",
    url: `/assets/${assetId}`,
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      asset_id: assetId,
    },
  }).then((res) => {
    if (res) {
      return <Asset[]>res.map((item: any) => {
        return {
          ...item,
          parent_id: assetId,
          has_children: !!item.child_asset_count,
        };
      });
    }
    return [];
  });
};

export const searchAssetByName = (
  assetName: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<Asset[]>>createService({
    apiMethodName: "searchAssetByName",
    url: "/assets",
    method: "GET",
    ...opts,
    params: {
      ...opts.data,
      asset_name: assetName,
    },
  }).then((res) => {
    if (res) {
      return <Asset[]>res;
    }
    return [];
  });
};

export const getSubTree = (assetId: string, opts: IOptions = { data: {} }) => {
  return <Promise<AssetDeep>>createService({
    apiMethodName: "getEntireTree",
    url: `/assets/tree/${assetId}`,
    method: "GET",
    ...opts,
  }).then((res) => {
    if (res) {
      return <AssetDeep>res;
    }
    return {};
  });
};

export const getEntireTree = (opts: IOptions = { data: {} }) => {
  return getSubTree("-1", opts).then((res) => {
    if (res.subAssets) {
      return res.subAssets;
    }
    return [];
  });
};

/**
 * 获取一级子节点，加速版
 * @param assetId
 * @param opts
 * @returns
 */
export const getSubTreeFast = (
  assetId: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<Asset[]>>createService({
    apiMethodName: "getSubTreeFast",
    url: `/assets/tree-fast/${assetId}`,
    method: "GET",
    ...opts,
  }).then((res) => {
    if (res) {
      return <Asset[]>res;
    }
    return {};
  });
};

export type PermissionAsset = Omit<Asset, 'child_device_count'>; 

// fetch the whole asset tree, only admin has this right
export const getAdminAssetPermissionTree = (opts: IOptions = { data: {} }) => {
  return <Promise<PermissionAsset[]>>createService({
    apiMethodName: "getAdminAssetPermissionTree",
    url: `/assets`,
    method: "GET",
    ...opts,
  }).then((res) => {
    if (res) {
      return <PermissionAsset[]>res;
    }
    return [];
  });
};

// fetch user asset tree
export const getUserAssetPermissionTree = (userId: string, opts: IOptions = { data: {} }) => {
  return <Promise<PermissionAsset[]>>createService({
    apiMethodName: "getUserAssetPermissionTree",
    url: `/assets/auths`,
    method: "GET",
    ...opts,
    params: {
      userId,
    }
  }).then((res) => {
    if (res) {
      return <PermissionAsset[]>res;
    }
    return [];
  });
};

export const grantUserAssetPermission = (userId: string, assetIds: string[], opts: IOptions= {data: {}}) => {
  return <Promise<boolean>>createService({
    apiMethodName: "grantUserAssetPermission",
    url: `/assets/auths`,
    method: "PUT",
    ...opts,
    data: {
      userId,
      assetIds
    }
  }).then(() => {
    return true;
  });
};
