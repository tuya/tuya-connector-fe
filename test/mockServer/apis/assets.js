const { successResp, errorResp } = require("./baseResp");

module.exports.getChildrenAssetsByAssetId = (req, res) => {
  const { asset_id } = req.query;
  if (asset_id === "1") {
    return successResp(res, {
      result: [
        {
          asset_id: "11",
          asset_name: "11",
          full_asset_name: "11",
          child_device_count: 0,
          child_asset_count: 0,
        },
      ],
    });
  }

  return successResp(res, {
    result: [],
  });
};

module.exports.addAsset = (req, res) => {
  const { asset_name, parent_asset_id } = req.body;
  if (parent_asset_id === "5") {
    return successResp(res, {
      result: false,
    });
  }

  return successResp(res, {
    result: true,
  });
};

module.exports.editAsset = (req, res) => {
  const { asset_id, asset_name } = req.body;
  if (asset_id === "1") {
    return successResp(res, {
      result: false,
    });
  }

  return successResp(res, {
    result: true,
  });
};

module.exports.removeAsset = (req, res) => {
  const { asset_id } = req.query;
  if (asset_id === "1") {
    return successResp(res, {
      result: false,
    });
  }

  return successResp(res, {
    result: true,
  });
};

module.exports.searchAssetByName = (req, res) => {
  const { asset_name } = req.query;
  if (asset_name === "11") {
    return successResp(res, {
      result: [
        {
          asset_id: "11",
          asset_name: "11",
          full_asset_name: "11",
          child_device_count: 0,
          child_asset_count: 0,
        },
      ],
    });
  }
  return successResp(res, {
    result: [],
  });
};

module.exports.getSubTree = (req, res) => {
  const { assetId } = req.params;
  if (assetId == "-1") {
    return successResp(res, {
      result: {
        asset_id: "-1",
        asset_name: "-1",
        full_asset_name: "-1",
        child_device_count: 0,
        child_asset_count: 0,
        subAssets: [
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
        ],
      }
    });
  }

  if (assetId === "1") {
    return successResp(res, {
      result: {
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
      }
    });
  }

  return successResp(res, {});
};
