import { IOptions } from "../../common/types";
export declare type BaseAsset = {
    asset_id: string;
    asset_name: string;
    full_asset_name: string;
};
export declare type Asset = BaseAsset & {
    child_asset_count: number;
    child_device_count: number;
};
export declare type AssetDeep = Asset & {
    subAssets: AssetDeep[];
};
export declare const addAsset: (assetName: string, parentAssetId?: string, opts?: IOptions) => Promise<string>;
export declare const editAsset: (assetId: string, assetName: string, opts?: IOptions) => Promise<boolean>;
export declare const removeAsset: (assetId: string, opts?: IOptions) => Promise<string>;
export declare const getChildrenAssetsByAssetId: (assetId: string, opts?: IOptions) => Promise<Asset[]>;
export declare const searchAssetByName: (assetName: string, opts?: IOptions) => Promise<Asset[]>;
export declare const getSubTree: (assetId: string, opts?: IOptions) => Promise<AssetDeep>;
export declare const getEntireTree: (opts?: IOptions) => Promise<AssetDeep[]>;
