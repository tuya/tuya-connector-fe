<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>


<center><p align="center">
  <a href="https://www.npmjs.com/package/@tuya/connector" target="_blank">
    <img src="https://img.shields.io/npm/v/@tuya/connector/latest.svg" />
  </a>

<img src="https://img.shields.io/github/license/tuya/tuya-connector-fe.svg" />

<img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" />
</p>
</center>

Tuya Connector FE SDK
===


[English](README.md) | [中文版](README_zh.md)


Contents
---

- [Overview](#Overview)
- [Compatible browsers](#Compatible-browsers)
- [Installation](#Installation)
- [Examples](#Examples)
- [Features](#Features)
- [Methods](#Methods)
- [Error handling](#Error-handling)
- [Configure requests](#Configure-requests)
- [Test cases](#Test-cases)


## Overview

Tuya Connector FE SDK encapsulates APIs in JavaScript that allow the Tuya SaaS Admin to manage data. 
Currently, it provides APIs related to `account login and logout`, `password change`, `asset management`, and `device management`.

For more information about the image of the demo project,visit [https://hub.docker.com/r/iotportal/iot-suite](https://hub.docker.com/r/iotportal/iot-suite).


## Compatible browsers

| ![Google Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Microsoft Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Internet Explorer](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
| Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


## Installation

```shell
npm install @tuya/connector

or

yarn add @tuya/connector
```

## Examples

```js
import {version, apiService} from '@tuya/connector'

// Current SDK version number.
console.log(version);

const {multiLogin} = apiService;

multiLogin({
  userName: 'test',
  pwd: '123123a',
}).then((res) => {
  if (res) {
    // Login is successful.
    console.log('logged in');
  } else {
    console.error('fail to login');
  }
}).catch((err) => {
  // Failed to log in.
  console.error('login fail', err);
})
```

If a specific domain or port is required, you can initialize the relevant configuration before use.

```js
import {configMethod} from '@tuya/connector'

const {initGlobalConfig, getGlobalConfig, setGlobalConfig} = configMethod;

// Called when the project is initialized. Global initialization is required only once.
// For specific configurations, see Request Config.
initGlobalConfig({
  baseURL: '',
  method: 'GET',
  onError: () => {}, // Global error callback.
})

// Returns the currently changed configuration. The default configuration of Request Config will not be carried.
getGlobalConfig()

// The specific configuration is the same as initGlobalConfig, and the underlying layer of initGlobalConfig is implemented using setGlobalConfig.
setGlobalConfig({})
```

## Features

- [login(userName, password[, config])](#login) Log in
- [multiLogin(loginParams[, config])](#multiLogin) Log in with an email or phone number
- [logout()](#logout) Log out
- [resetPassword(userName, currentPwd, newPwd[, config])](#resetPassword) Change the password
- [forgetPassword(params[, config])](#forgetPassword) Reset the password
- [getVerifyCode(params[, config])](#getVerifyCode) Get a verification code

- [addAsset(assetName[, parentAssetId)[, config]]](#addAsset) Add an asset
- [editAsset(assetId, assetName[, config])](#editAsset) Edit a specified asset
- [removeAsset(assetId[, config])](#removeAsset) Remove a specified asset
- [getChildrenAssetsByAssetId(assetId[, config])](#getChildrenAssetsByAssetId) Get the list of assets by asset ID
- [searchAssetByName(assetName[, config])](#searchAssetByName) Perform a fuzzy search for assets
- [getEntireTree([config])](#getEntireTree) Get a specified asset tree (with device information)
- [getSubTree(assetId[, config])](#getSubTree) Get the subtree of the specified asset

- [getDevicesInfoByAssetId(assetId, pageNum, pageSize[, config])](#getDevicesInfoByAssetId) Get device information under the specified asset
- [getDeviceInfoByDeviceId(deviceId[, config])](#getDeviceInfoByDeviceId) Get device information
- [removeDeviceById(deviceId[, config])](#removeDeviceById) Remove a device
- [modifyDeviceInfo(deviceId, name[,config])](#modifyDeviceInfo) Modify a device
- [modifyDeviceDP(deviceId, deviceStatuses[, config])](#modifyDeviceDP) Control a device
- [getDeviceDP(deviceId[,config])](#getDeviceDP) Get a device control command
- [getDeviceInfoWithDP(deviceId[, config])](#getDeviceInfoWithDP) Get device information and data point (DP)
- [getProjectInfo([config])](#getProjectInfo) Get the QR code to bind a device

- [getAccountList(params[, config])](#getAccountList) Get the list of users
- [getPermissionListByAccount(uid[, config])](#getPermissionListByAccount) Get the list of user permissions
- [addAccount(params[, config])](#addAccount) Add a user
- [batchRemoveAccount(userIds[, config])](#batchRemoveAccount) Delete multiple users
- [removeAccount(userId[, config])](#removeAccount) Delete a user
- [editAccountPwd(userName, newPwd[, config])](#editAccountPwd) Modify the password
- [batchModifyUserRole(userIds, roleCode[, config])](#batchModifyUserRole) Modify multiple passwords
- [modifyUserRole(userId, roleCode[, config])](#modifyUserRole) Modify a single user role
- [getEntireAssetTree([config])](#getEntireAssetTree) Get the entire asset tree (without the information about device quantity)
- [getUserAssetPermissionTree(userId)](#getUserAssetPermissionTree) Get the list of a user's available assets
- [grantUserAssetPermission(userId, assetIds[, config])](#grantUserAssetPermission) Modify a user's asset authorization
- [getRoleList(pageNo, pageSize, opts)](#getRoleList) Get the list of roles on pages
- [getEntireRoles()](#getEntireRoles) Get all roles
- [addRole(params[, config])](#addRole) Add a role
- [removeRole(roleCode[, config])](#removeRole) Remove a role
- [editRoleName(params[, config])](#editRoleName) Edit a role name
- [grantPermissionByRole(params[, config])](#grantPermissionByRole) Modify the permissions of a specified role
- [getRolePermissionDetail(roleCode[, config])](#getRolePermissionDetail) Get the permission list of a specified role
- [getRolePermissionTemplate(roleCode[, config])](#getRolePermissionTemplate) Get the template of role permissions

## Methods
#### login

Log in with an email address.

```ts
type UserToken = {
  nick_name: string, // Username.
  token: string,
  role_type: string[], // Role type.
  userId: string;
}
/**
 * @param username: string
 * @param pwd: string
 */

login('test', 'test').then((<UserToken>res) => {
  // Returns UserToken on success.
  console.log(res)
})
```

#### multiLogin

Log in with an email address or mobile phone number.

```ts
interface loginParams {
  userName?: string,
  pwd: string,
  countryCode?: string,
  phoneNum?: string,
}

// Log in with an email address.
multiLogin({
  userName: 'xxx@email.com',
  pwd: 'test',
}).then((<UserToken>res) => {
  // Returns UserToken on success.
  console.log(res)
});

// Log in with a mobile phone number.
multiLogin({
  countryCode: '86',
  phoneNum: '13000000000',
  pwd: 'test',
}).then((<UserToken>res) => {
  // Returns UserToken on success.
  console.log(res)
})
```

#### logout

Log out of the current account.

```ts
logout().then(() => {
  // The login status in the server has been cleaned up, and you must maintain the local status.
  console.log('logout success');
});
```

#### resetPassword

Change the password.

```js
/**
 * @param username
 * @param oldPwd
 * @param newPwd
 */
resetPassword('test', '123', '321').then((res) => {
  // Boolean type. It indicates whether the operation is successful.
  console.log(res);
})

resetPassword('test', '123', '321', {
  baseURL: 'http://localhost:8000',
  method: 'POST'
}).then((res) => {
  // Boolean type. It indicates whether the operation is successful.
  console.log(res);
})
```

#### forgetPassword

Reset the password.

```ts
interface forgetPwdParams {
  code: string;
  newPassword: string;
}

interface emailForgetPwdParams extends forgetPwdParams {
  mail: string;
}

interface phoneForgetPwdParams extends forgetPwdParams {
  countryCode: string;
  phone: string;
}

const params1 = {
  countryCode: '86',
  phone: '13100001111',
  code: '123456',
  newPassword: 'abcdefg123',
} : phoneForgetPwdParams;

forgetPassword(params1).then((res) => {
  console.log(<boolean>res);
});

const params1 = {
  mail: 'xx@tuya.com',
  code: '123456',
  newPassword: 'abcdefg123',
} : emailForgetPwdParams;
forgetPassword(params1).then((res) => {
  console.log(<boolean>res);
});
```

#### getVerifyCode

Get a verification code.

```ts
interface verifyCodeParamsPhone {
  language: string,
  countryCode: string,
  phone: string,
}

interface verifyCodeParamsEmail {
  mail: string,
  language: string,
}

const params1 = {
  countryCode: '86',
  phone: '13100001111',
  language: 'zh-CN',
}: verifyCodeParamsPhone;

getVerifyCode(params1).then((res) => {
  console.log(<boolean>res);
});

const params2 = {
  mail: 'xx@tuya.com',
  language: 'en-US',
}: verifyCodeParamsEmail;

getVerifyCode(params2).then((res) => {
  console.log(<boolean>res);
});
```

#### getChildrenAssetsByAssetId

Get the list of first-level sub-assets.

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

Search for an asset.

```ts
/**
 * @param assetName: string
 */
searchAssetByName('test').then((res) => {
  console.log(<Asset[]>res);
})
```

#### addAsset

Add an asset.

```ts
/**
 * @param assetName: string,
 * @param parentAssetId: string = "",
 */
addAsset('newAsset', '1').then((res) => {
  // The ID of the new asset.
  console.log(<string>res)
})
```

#### editAsset

Edit the asset name.

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
editAsset('assetId', 'assetName').then((res) => {
  // Edited the asset name successfully.
  console.log(<boolean>res)
}).catch((err) => {
  // Failure reason.
  console.error(<errorType>err)
})
```

#### removeAsset

Remove an asset.

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
  // Deleted the asset successfully.
  console.log(<boolean>res)
}).catch((err) => {
  // Failure reason.
  console.error(<errorType>err)
})
```

#### getEntireTree

Get the entire asset tree.

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
  // Got the asset tree successfully.
  console.log(<AssetDeep>res);
})
```

#### getSubTree

Get the asset subtree.

```ts
/**
 * @param assetId: string,
 */
getSubTree('1').then((res) => {
  // Get the asset subtree of which the asset ID is `1`.
  console.log(<AssetDeep>res);
});
```

#### getDevicesInfoByAssetId

```ts
type DeviceStatus = {
  code: string; // Status name
  value: Object; // Status value
  options?: string; // DP value configuration
  editable?: boolean; // Indicates whether it is editable
  name?: string; // DP name
  type?: string; // DP type
};

type DeviceInfo = {
  id: string; // Device number
  name: string; // Device name
  uid: string; // User ID
  local_key: string; // Key
  category: string; // Product category
  product_id: string; // Product ID
  product_name: string; // Product name
  sub: boolean; // Indicates whether a sub-device is used
  uuid: string; // The universally unique identifier of a device
  online: boolean; // The online status of a device
  active_time: number; // The timestamp when a device is activated, in seconds
  icon: string; // The icon of a device
  ip: string; // The IP address of a device
  create_time: number; // The timestamp when a device is created, in seconds
  update_time: number; // The timestamp when a device is updated, in seconds
  time_zone: string; // Time zone, for example, `+08:00`
  status: DeviceStatus[];
}

/**
 * @param assetId: string,
 * @param pageNum: number,
 * @param pageSize: number,
 */
getDevicesInfoByAssetId('1', 1, 20).then((res) => {
  console.log(<DeviceInfo[]>res);
})
```

#### getDeviceInfoByDeviceId

```ts
type DeviceInfo = {
  id: string; // Device number
  name: string; // Device name
  uid: string; // User ID
  local_key: string; // Key
  category: string; // Product category
  product_id: string; // Product ID
  product_name: string; // Product name
  sub: boolean; // Indicates whether a sub-device is used
  uuid: string; // The universally unique identifier of a device
  online: boolean; // The online status of a device
  active_time: number; // The timestamp when a device is activated, in seconds
  icon: string; // The icon of a device
  ip: string; // The IP address of a device
  create_time: number; // The timestamp when a device is created, in seconds
  update_time: number; // The timestamp when a device is updated, in seconds
  time_zone: string; // Time zone, for example, `+08:00`
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

Remove a device.

```ts
/**
 * @param deviceId: string,
 */
removeDeviceById('12').then((res) => {
  console.log(<boolean>res);
})
```

#### modifyDeviceInfo

Modify the information about a device.

```ts
/**
 * @param deviceId: string,
 * @param devicename: string,
 */
modifyDeviceInfo('12', 'devicename').then((res) => {
  console.log(<boolean>res);
})
```

#### modifyDeviceDP
Control a device.

For more information about standard instruction sets, see the [official website](https://developer.tuya.com/en/docs/iot/datatypedescription?id=K9i5ql2jo7j1k).

```ts
type DeviceStatus = {
  code: string; //   Status name
  value: Object; // Status value
  options?: string; // DP value configuration
  editable?: boolean; // Indicates whether it is editable
  name?: string; // DP name
  type?: string; // DP type
};
/**
 * @param deviceId: string,
 * @param deviceStatuses: DeviceStatus[],
 */
modifyDeviceDP('12', [{code: '', value: 2}]).then((res) => {
  console.log(<boolean>res);
})
```

#### getDeviceDP

Get the instructions.

For more information about standard instruction sets, see the [official website](https://developer.tuya.com/en/docs/iot/datatypedescription?id=K9i5ql2jo7j1k).

```ts
/**
 * @param deviceId: string,
 */
getDeviceDP('12').then((res) => {
  console.log(res)
})
```

#### getDeviceInfoWithDP

Get the device information and DP.

This method is the aggregation result of `getDeviceDP` and `getDeviceInfoByDeviceId`. Specify the DP in the `status` field of `deviceInfo`.

 
```ts
/**
 * @param deviceId: string,
 */
getDeviceInfoWithDP('deviceId1').then((res) => {
  console.log(<DeviceInfo>res);
})

// Sample
{
  id: 'deviceId1',
  name: 'deviceId1',
  uid: 'uid1',
  local_key: 'local_key',
  category: 'category',
  product_id: 'product_id',
  product_name: 'product_name',
  sub: true,
  uuid: 'uuid',
  online: true,
  active_time: 1615175477,
  icon: 'icon',
  ip: '127.0.0.1',
  create_time: 1615175477,
  update_time: 1615175477,
  time_zone: '+08:00',
  status: [
    {
      code: "va_temperature",
      value: 243,
      editable: false,
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
      name: '',
    },
    {
      code: "va_humidity",
      value: 55,
      editable: false,
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}",
      name: '',
    },
    {
      code: "battery_percentage",
      value: 40,
      name: '',
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
      name: '',
    },
    {
      code: "temp_unit_convert",
      value: "c",
      editable: true,
      name: "Temperature unit conversion",
      type: "Enum",
      options: "{\"range\":[\"c\",\"f\"]}",
    },
    {
      code: "maxtemp_set",
      value: 535,
      editable: true,
      name: "Maximum temperature",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
    },
    {
      code: "minitemp_set",
      value: 0,
      editable: true,
      name: "Minimum temperature",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
    },
    {
      code: "maxhum_set",
      value: 95,
      editable: true,
      name: "Maximum humidity",
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}"
    },
    {
      code: "minihum_set",
      value: 10,
      name: "Minimum humidity",
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
      name: '',
    },
    {
      code: "hum_alarm",
      value: "cancel",
      type: "Enum",
      editable: false,
      options: "{\"range\":[\"loweralarm\",\"upperalarm\",\"cancel\"]}",
      name: '',
    }
  ]
}
```

#### getProjectInfo

Get the QR code to bind a device.

```ts
type ProjectInfo = {
  project_name: string;
  project_code: string;
};

getProjectInfo().then((res) => {
  // Got the QR code successfully.
  console.log(<ProjectInfo>res);
})
```

#### getAccountList

Get the list of accounts.

```ts
interface user {
  userId: string;
  nickName: string;
  userName: string; // The login account
  createTime: string;
  roles: role[];
}

interface getAccountListParams {
  searchKey: string;
  roleCode: string;
  pageNo: number;
  pageSize: number;
  }

interface userListResp {
  total: number;
  pageNo: number;
  pageSize: number;
  data: user[];
  }
getAccountList({
  searchKey: '',
  roleCode: '',
  pageNo: 1,
  pageSize: 20,
}).then((res) => {
  return <userListResp>res;
})
```

#### getPermissionListByAccount

Get the list of permissions granted to the account.

```ts
getPermissionListByAccount('uid').then((res) => {
  return <permission[]>res;
})
```

#### addAccount

Add an account.

```ts
interface addAccountParams {
  password: string;
  nickName?: string;
  roleCodes: string[];
  userName: string,
  countryCode?: string,
  }
addAccount({
  password: '123123A',
  roleCodes: ['manager-1000'],
  userName: 'xxx@tuya.com',
}).then((res) => {
  return <boolean>res;
})
```

#### batchRemoveAccount

Delete multiple accounts in a call.

```ts
batchRemoveAccount(['userId1', 'userId2']).then((res) => {
  return <boolean>res;
})
```

#### removeAccount

Delete an account.

```ts
removeAccount('userID').then((res) => {
  return <boolean>res;
})
```

#### editAccountPwd

Change the account password.

```ts
editAccountPwd('userName', '123456A').then((res) => {
  return <boolean>res;
})
```

#### batchModifyUserRole

Modify multiple account roles.

```ts
batchModifyUserRole(['userId1', 'userId2'], 'manager-1000').then((res) => {
  return <boolean>res;
})
```

#### modifyUserRole

Modify an account role.

```ts
modifyUserRole('userId', 'manager-1000').then((res) => {
  return <boolean>res;
});
```

#### getEntireAssetTree

Get the entire asset tree (without the information about device quantity).

```ts
type PermissionAsset = Omit<Asset, 'child_device_count'>; 
type PermissionAssetTree = PermissionAsset & {
  subAssets: PermissionAssetTree[];
};
getEntireAssetTree().then((res) => {
  return <PermissionAsset[]>res;
});
```

#### getUserAssetPermissionTree

Get the list of user assets.

```ts
getUserAssetPermissionTree('userId').then((res) => {
  return <PermissionAsset[]>res;
});
```

#### grantUserAssetPermission

Modify the list of user assets.

```ts
grantUserAssetPermission('userId', ['1', '2']).then((res) => {
  return <boolean>res;
});
```

#### getRoleList

Get the list of roles.

```ts
interface role {
  roleCode: string;
  roleName: string;
  }
interface paginationType {
  total: number;
  pageNo: number;
  pageSize: number;
};
interface roleListResp extends paginationType {
  data: role[],
  }
getRoleList(1, 20).then((res) => {
  return <roleListResp>res;
})
```

#### getEntireRoles

Get all roles.

```ts
getEntireRoles().then((res) => {
  return <role[]>res;
})
```

#### addRole

Add a role.

```ts
enum RoleType {
  manager = 'manager',
  normal = 'normal',
  }

interface addRoleParams {
  roleName: string;
  roleType: RoleType;
  roleRemark?: string; // Role description
  }
addRole({
  roleName: 'roleName',
  roleType: 'normal',
}).then((res) => {
  return <boolean>res;
})
```

#### removeRole

Delete a role.

```ts
removeRole('roleCode').then((res) => {
  return <boolean>res;
})
```

#### editRoleName

Modify a role name.

```ts
interface editRoleNameParams {
  roleCode: string,
  roleName: string,
  roleRemark?: string,
  }
editRoleName({
  roleCode: 'normal-xxx',
  roleName: '321',
}).then((res) => {
  return <boolean>res;
})
```

#### grantPermissionByRole

Modify the list of permissions granted to a role.

```ts
interface grantPermissionByRoleParams {
  roleCode: string;
  permissionCodes: string[];
  }
grantPermissionByRole({
  roleCode: 'normal-xxxxx',
  permissionCodes: ['1000', '2000'],
}).then((res) => {
  return <boolean>res;
})
```

#### getRolePermissionDetail

Get the list of permissions granted to a role.

```ts
enum PermissionType {
  menu = 'menu',
  api = 'api',
  button = 'button',
  data = 'data',
};

interface permission {
  permissionCode: string;
  permissionName: string;
  permissionType: PermissionType;
  parentCode: string;
  order: string;
  remark: string;
  authorizable: boolean;
  }

getRolePermissionDetail('manager-1000').then((res) => {
  return <permission[]>res;
})
```

#### getRolePermissionTemplate

Get the template of role permissions.

```ts
getRolePermissionTemplate('manager').then((res) => {
  return <permission[]>res;
})
```

---------

## Error handling
If an HTTP error occurs, `apiService` will get the error. You can use `promise catch` to get the error message.

```ts
apiService.getDeviceInfoByDeviceId('1').catch(({msg, code}) => {
  console.error(msg);
})
```
 
Alternatively, you can register the global error handling methods in `initConfig`.

```ts
type ApiError = {
  httpCode: number, // HTTP code
  code: number,
  msg: string,
  apiMethodName: string, // The API method name
  }

initConfig({
  onError: (<ApiError>errorObj) => {}
})
```

## Configure requests

For more information about request configuration, see [Axios request config](https://github.com/axios/axios#request-config).



## Test cases

As a preparation, start the mock server.

Listen on port 7001 by default.

```bash
npm run testServer
```

Start the unit test.

```bash
npm run jest
```

## License

For more information about the license, see [MIT License](./LICENSE).
