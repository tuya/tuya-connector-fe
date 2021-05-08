const express = require("express");

const { errorResp } = require("./apis/baseResp");
const assets = require("./apis/assets");
const devices = require("./apis/devices");
const account = require("./apis/account");

const app = express();
app.use(express.json());

// 资产相关
app.route("/assets").get(assets.searchAssetByName).post(assets.addAsset);
app.get("/assets/:assetId", assets.getChildrenAssetsByAssetId);
app.get("/assets/:assetId/deviceInfos", devices.getDevicesInfoByAssetId);
app.put("/assets/:deviceId", assets.editAsset);
app.delete("/assets/:assetId", assets.removeAsset);
app.get("/assets/tree/:assetId", assets.getSubTree);

// 设备相关
app.get("/device/specification/:deviceId", devices.getDeviceDP);
app.get("/device/qrcode", devices.getProjectInfo);
app.get("/device/:deviceId", devices.getDeviceInfoByDeviceId);
app.post("/device/command/:deviceId", devices.modifyDeviceDP);
app.put("/device/:deviceId", devices.modifyDeviceInfo);
app.delete("/device/:deviceId", devices.removeDeviceById);

// 账户相关
app.post("/login", account.login);
app.put("/user/password", account.resetPassword);
app.get("/verification-code", account.getVerifyCode);
app.post("/logout", account.logout);
app.put("/user/password/reset", account.forgetPassword);

app.get("/errorBranch", (req, res) => {
  errorResp(res, {
    msg: "",
  });
});

const port = 7001;

app.listen(port, () => {
  console.log(`server is ready, http://127.0.0.1:${port}/`);
});
