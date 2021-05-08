import { initConfig } from "..";
import {
  getChildrenAssetsByAssetId,
  addAsset,
  removeAsset,
  editAsset,
  searchAssetByName,
  getEntireTree,
} from "../../../lib/apis/assets";

beforeAll(() => {
  initConfig();
});

describe("assets", function () {
  describe("#getChildrenAssetsByAssetId()", function () {
    test("should return empty array", function () {
      return getChildrenAssetsByAssetId("abc").then((res) => {
        return expect(res).toEqual([]);
      });
    });

    test("should return assets array", function () {
      return getChildrenAssetsByAssetId("1").then((res) => {
        return expect(res).toEqual([
          {
            parent_id: "1",
            has_children: false,
            asset_id: "11",
            asset_name: "11",
            full_asset_name: "11",
            child_asset_count: 0,
            child_device_count: 0,
          },
        ]);
      });
    });
  });

  describe("#addAsset()", function () {
    test("should return true", function () {
      return addAsset("123", "321").then((res) => {
        return expect(res).toBeTruthy();
      });
    });

    test("should return true", function () {
      return addAsset("1", "").then((res) => {
        return expect(res).toBeTruthy();
      });
    });

    test("should return false", function () {
      return addAsset("12", "5").then((res) => {
        return expect(res).toBeFalsy();
      });
    });
  });
});

describe("#editAsset()", function () {
  test("should return true", function () {
    return editAsset("12", "5name").then((res) => {
      return expect(res).toBeTruthy();
    });
  });
  test("should return false", function () {
    return editAsset("1", "5name").then((res) => {
      return expect(res).toBeFalsy();
    });
  });
});

describe("#removeAsset()", function () {
  test("should return true", function () {
    return removeAsset("2").then((res) => {
      return expect(res).toBeTruthy();
    });
  });
  test("should return false", function () {
    return removeAsset("1").then((res) => {
      return expect(res).toBeFalsy();
    });
  });
});

describe("#searchAssetByName()", function () {
  test("should return assets", () => {
    return searchAssetByName("11").then((res) => {
      return expect(res).toEqual([
        {
          asset_id: "11",
          asset_name: "11",
          full_asset_name: "11",
          child_device_count: 0,
          child_asset_count: 0,
        },
      ]);
    });
  });

  test("should return empty array", () => {
    return searchAssetByName("1").then((res) => {
      return expect(res).toEqual([]);
    });
  });
});

describe("#getEntireTree()", function () {
  test("should return nestedObj", () => {
    return getEntireTree().then((res) => {
      return expect(res).toMatchObject([
          {
            asset_id: "1",
            asset_name: "1",
            full_asset_name: "1",
            child_device_count: 0,
            child_asset_count: 0,
            subAssets: [
              {
                asset_id: "11",
                asset_name: "11",
                full_asset_name: "11",
                child_device_count: 0,
                child_asset_count: 0,
              },
            ],
          },
        ]);
    });
  });
});
