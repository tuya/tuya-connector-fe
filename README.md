<center><p align="center"><img src="https://images.tuyacn.com/rms-static/dc225080-25a5-11eb-8913-b53cc9e03c9c-1605267985800.png?tyName=tuya.png" width="36%" height="36%" /></p></center>

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Tuya Connector FE SDK
===


[English](README.md) | [中文版](./README_zh.md)


Index
---

- [Introduction](#Introduction)
- [Browser Compatible](#Browser-Compatible)
- [Install](#Install)
- [Example](#Example)
- [Function List](#Function-List)
- [Method Description](#Method-Description)
- [Error Handling](#Error-Handling)
- [Request Configuration](#Request-Configuration)
- [Test Case Usage](#Test-Case-Usage)
- [Demo Useage Instructions](#Demo-Useage-Instructions)


## Introduction

Tuya Connector FE SDK is a JavaScript package of Tuya SaaS Admin management platform data API
Currently provides `Account login and logout`, `Change password`, `Asset management`, `Device management` related APIs

Demo Project Image [https://hub.docker.com/r/iotportal/iot-suite](https://hub.docker.com/r/iotportal/iot-suite)


## Browser compatibility
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser -logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera] (https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master /src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png ) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


## Installation
```shell
npm install @tuya/tuya-connector

or

yarn add @tuya/tuya-connector
```

## Examples
```js
import {version, apiService} from'@tuya/tuya-connector'

// current sdk version number
console.log(version);

const {multiLogin} = apiService;

multiLogin({
  userName:'test',
  pwd: '123123a',
}).then((res) => {
  if (res) {
    // login successful
    console.log('logged in');
  } else {
    console.error('fail to login');
  }
}).catch((err) => {
  // Login failed
  console.error('login fail', err);
})
```

If you need a specific domain or port, you can initialize the relevant configuration before using it
```js
import {configMethod} from'@tuya/tuya-connector'

const {initGlobalConfig, getGlobalConfig, setGlobalConfig} = configMethod;

// Called when the project is initialized, global initialization is enough
// See Request Config for specific configuration items
initGlobalConfig({
  baseURL:'',
  method:'GET',
  onError: () => (), // global error callback
})

// Return the currently changed configuration, the default configuration of Request Config will not be carried
getGlobalConfig()

// The specific configuration is the same as initGlobalConfig, and the bottom layer of initGlobalConfig is implemented using setGlobalConfig
setGlobalConfig({})
```

## Function List

- [login(userName, password[, config])](#login) login
- [multiLogin(loginParams[, config])](#multiLogin) aggregate login
- [logout()](#logout) log out
- [resetPassword(userName, currentPwd, newPwd[, config])](#resetPassword) change password

- [addAsset(assetName[, parentAssetId)[, config]]](#addAssets) add assets
- [editAsset(assetId, assetName[, config])](#editAssets) Edit assets
- [removeAsset(assetId[, config])](#removeAssets) remove specified assets
- [getChildrenAssetsByAssetId(assetId[, config])](#getChildrenAssetsByAssetId) Get the list of assets under the specified asset
- [searchAssetByName(assetName[, config])](#searchAssetByName) fuzzy asset query
- [getEntireTree([config])](#getEntireTree) Get the entire asset tree
- [getSubTree(assetId[, config])](#getSubTree) Get the subtree of the specified asset

- [getDevicesInfoByAssetId(assetId, pageNum, pageSize[, config])](#getDevicesInfoByAssetId) Get device information under the specified asset
- [getDeviceInfoByDeviceId(deviceId[, config])](#getDeviceInfoByDeviceId) Get device information
- [removeDeviceById(deviceId[, config])](#removeDeviceById) remove device
- [modifyDeviceInfo(deviceId, name[,config])](#modifyDeviceInfo) modify device
- [modifyDeviceDP(deviceId, deviceStatuses[, config])](#modifyDeviceDP) control device dp
- [getDeviceDP(deviceId[,config])](#getDeviceDP) Get device instructions
- [getDeviceInfoWithDP(deviceId[, config])](#getDeviceInfoWithDP) Get device information and DP
- [getProjectInfo([config])](#getProjectInfo) Get the qrcode information of the bound device

## Method Description
#### login

```ts
type UserToken = {
  nick_name: string, // username
  token: string,
  role_type: number, // role type, temporarily set to 1
}
/**
 * @param username: string
 * @param pwd: string
 */

login('test','test').then((<UserToken>res) => {
  // Operation successfully returns UserToken
  console.log(res)
})

```

#### multiLogin
```ts
interface loginParams {
  userName?: string,
  pwd: string,
  countryCode?: string,
  phoneNum?: string,
}

// email
multiLogin({
  userName:'xxx@email.com',
  pwd:'test',
}).then((<UserToken>res) => {
  // Operation successfully returns UserToken
  console.log(res)
});

// telephone
multiLogin({
  countryCode: '86',
  phoneNum: '13000000000',
  pwd:'test',
}).then((<UserToken>res) => {
  // Operation successfully returns UserToken
  console.log(res)
})
```

#### logout
```ts
logout().then(() => {
  // The server login status has been cleared, and the local status is maintained
  console.log('logout success');
});
```

#### resetPassword

```js
/**
 * @param username
 * @param oldPwd
 * @param newPwd
 */
resetPassword('test', '123', '321').then((res) => {
  // Whether the boolean operation was successful
  console.log(res);
})

resetPassword('test', '123', '321', {
  baseURL:'http://localhost:8000',
  method:'POST'
}).then((res) => {
  // Whether the boolean operation was successful
  console.log(res);
})
```

#### getChildrenAssetsByAssetId

```ts
type Asset = {
  asset_id: string;
  asset_name: string;
  full_asset_name: string;
};

/**
 * @param assetId: string
 */
getChildrenAssetsByAssetId('1').then((res) => {
  console.log(<Asset[]>res);
})
```

#### searchAssetByName

```ts
/**
 * @param assetName: string
 */
searchAssetByName('test').then((res) => {
  console.log(<Asset[]>res);
})
```

#### addAsset

```ts
/**
 * @param assetName: string,
 * @param parentAssetId: string = "",
 */
addAsset('newAsset', '1').then((res) => {
  // Add asset id
  console.log(<string>res)
})
```

#### editAsset

```ts
type errorType = {
  apiMethodName: string;
  msg: string;
  code: number;
  httpCode: string;
}
/**
 * @param assetId: string,
 * @param assetName: string,
 */
editAsset('assetId','assetName').then((res) => {
  // Edit successfully
  console.log(<boolean>res)
}).catch((err) => {
  // Reason for failure
  console.error(<errorType>err)
})
```

#### removeAsset

```ts
type errorType = {
  apiMethodName: string;
  msg: string;
  code: number;
  httpCode: string;
}

/**
 * @param assetId: string,
 */
removeAsset('assetId').then((res) => {
  // Successfully delete assets
  console.log(<boolean>res)
}).catch((err) => {
  // Reason for failure
  console.error(<errorType>err)
})
```

#### getEntireTree

```ts
type BaseAsset = {
  asset_id: string;
  asset_name: string;
  full_asset_name: string;
};

type Asset = BaseAsset & {
  child_asset_count: number;
  child_device_count: number;
};

type AssetDeep = Asset & {
  subAssets: AssetDeep[];
};

getEntireTree().then((res) => {
  // Get the asset tree successfully
  console.log(<AssetDeep>res);
})
```

#### getSubTree
```ts
/**
 * @param assetId: string,
 */
getSubTree('1').then((res) => {
  // Get the asset subtree with asset id 1
  console.log(<AssetDeep>res);
});
```

#### getDevicesInfoByAssetId

```ts
type DeviceStatus = {
  code: string; // Device status name
  value: Object; // Device status value
  options?: string; // dp value configuration
  editable?: boolean; // Is it editable
  name?: string; // dp name
  type?: string; // dp type
};

type DeviceInfo = {
  id: string; // device number
  name: string; // device name
  uid: string; // User Id
  local_key: string; // key
  category: string; // product category
  product_id: string; // Product Id
  product_name: string; // product name
  sub: boolean; // Determine whether it is a sub-device
  uuid: string; // unique identification of the device
  online: boolean; // device online status
  active_time: number; // Device activation time, timestamp, accurate to the second
  icon: string; // device icon
  ip: string; // Device IP
  create_time: number; // Device creation time, timestamp, accurate to the second
  update_time: number; // Device update time, timestamp, accurate to the second
  time_zone: string; // Time zone, for example: +08:00
  status: DeviceStatus[];
}
/**
 * @param assetId: string,
 * @param pageNum: number,
 * @param pageSize: number,
 */
getDevicesInfoByAssetId('1', 1, 10).then((res) => {
  console.log(<DeviceInfo[]>res);
})
```

#### getDeviceInfoByDeviceId

```ts
type DeviceInfo = {
  id: string; // device number
  name: string; // device name
  uid: string; // User Id
  local_key: string; // key
  category: string; // product category
  product_id: string; // Product Id
  product_name: string; // product name
  sub: boolean; // Determine whether it is a sub-device
  uuid: string; // unique identification of the device
  online: boolean; // device online status
  active_time: number; // Device activation time, timestamp, accurate to the second
  icon: string; // device icon
  ip: string; // Device IP
  create_time: number; // Device creation time, timestamp, accurate to the second
  update_time: number; // Device update time, timestamp, accurate to the second
  time_zone: string; // Time zone, for example: +08:00
  status: DeviceStatus[];
}
/**
 * @param deviceId: string,
 */
getDeviceInfoByDeviceId('1').then((res) => {
  console.log(<DeviceInfo>res)
})
```

#### removeDeviceById
Delete device
```ts
/**
 * @param deviceId: string,
 */
removeDeviceById('12').then((res) => {
  console.log(<boolean>res);
})
```

#### modifyDeviceInfo
Modify device
```ts
/**
 * @param deviceId: string,
 * @param devicename: string,
 */
modifyDeviceInfo('12','devicename').then((res) => {
  console.log(<boolean>res);
})
```

#### modifyDeviceDP
controlling device

For the detailed address of the standard instruction set, please refer to the official website description https://developer.tuya.com/cn/docs/iot/open-api/standard-function/datatypedescription?id=K9i5ql2jo7j1k

```ts
type DeviceStatus = {
  code: string; // 	设备状态名
  value: Object; // 设备状态值
  options?: string; // dp取值配置
  editable?: boolean; // 是否可编辑
  name?: string; // dp名称
  type?: string; // dp类型
};
/**
 * @param deviceId: string,
 * @param deviceStatuses: DeviceStatus[],
 */
modifyDeviceDP('12', [{code:'', value: 2}]).then((res) => {
  console.log(<boolean>res);
})
```

#### getDeviceDP
Get device instructions

For the detailed address of the standard instruction set, please refer to the official website description https://developer.tuya.com/cn/docs/iot/open-api/standard-function/datatypedescription?id=K9i5ql2jo7j1k

```ts
getDeviceDP('12').then((res) => {
  console.log(res)
})
```

#### getDeviceInfoWithDP
Get device information and DP
This method is the aggregation result of getDeviceDP and getDeviceInfoByDeviceId
Add dp to the status field of deviceInfo
```ts
/**
 * @param deviceId: string,
 */
getDeviceInfoWithDP('deviceId1').then((res) => {
  console.log(<DeviceInfo>res);
})

// Reference sample
{
  id:'deviceId1',
  name:'deviceId1',
  uid:'uid1',
  local_key:'local_key',
  category:'category',
  product_id:'product_id',
  product_name:'product_name',
  sub: true,
  uuid:'uuid',
  online: true,
  active_time: 1615175477,
  icon:'icon',
  ip: '127.0.0.1',
  create_time: 1615175477,
  update_time: 1615175477,
  time_zone:'+08:00',
  status: [
    {
      code: "va_temperature",
      value: 243,
      editable: false,
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}" ,
      name:'',
    },
    {
      code: "va_humidity",
      value: 55,
      editable: false,
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}",
      name:'',
    },
    {
      code: "battery_percentage",
      value: 40,
      name:'',
      editable: false,
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}",
    },
    {
      code: "charge_state",
      value: false,
      editable: false,
      type: "Boolean",
      options: "{}",
      name:'',
    },
    {
      code: "temp_unit_convert",
      value: "c",
      editable: true,
      name: "Temperature Scale Switching",
      type: "Enum",
      options: "{\"range\":[\"c\",\"f\"]}",
    },
    {
      code: "maxtemp_set",
      value: 535,
      editable: true,
      name: "Temperature upper limit setting",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
    },
    {
      code: "minitemp_set",
      value: 0,
      editable: true,
      name: "Temperature lower limit setting",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}" ,
    },
    {
      code: "maxhum_set",
      value: 95,
      editable: true,
      name: "Humidity upper limit setting",
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}"
    },
    {
      code: "minihum_set",
      value: 10,
      name: "Humidity lower limit setting",
      editable: true,
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}"
    },
    {
      code: "temp_alarm",
      value: "upperalarm",
      type: "Enum",
      editable: false,
      options: "{\"range\":[\"loweralarm\",\"upperalarm\",\"cancel\"]}",
      name:'',
    },
    {
      code: "hum_alarm",
      value: "cancel",
      type: "Enum",
      editable: false,
      options: "{\"range\":[\"loweralarm\",\"upperalarm\",\"cancel\"]}",
      name:'',
    }
  ]
}
```

#### getProjectInfo

```ts
type ProjectInfo = {
  project_name: string;
  project_code: string;
};

getProjectInfo().then((res) => {
  // Get the two-dimensional information of the bound device successfully
  console.log(<ProjectInfo>res);
})
```


---------

## Error Handling
When an http exception occurs, apiService will catch the exception uniformly, please use promise catch to get the relevant exception message
```ts
apiService.getDeviceInfoByDeviceId('1').catch(({msg, code}) => {
  console.error(msg);
})
```
or
Register the global error handling method in initConfig
```ts
type ApiError = {
  httpCode: number, // http code
  code: number,
  msg: string,
  apiMethodName: string, // call method name
}

initConfig({
  onError: (<ApiError>errorObj) => {}
})
```

## Request Configuration
For details of request configuration, please refer to [Axios request config](https://github.com/axios/axios#request-config)



## Test case Useage

Pre-preparation, start the mock server
Default monitoring 7001
```bash
npm run testServer
```

Unit test start command
```bash
npm run jest
```