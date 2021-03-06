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


索引
---

- [简介](#简介)
- [浏览器兼容](#浏览器兼容)
- [安装](#安装)
- [例子](#例子)
- [功能列表](#功能列表)
- [方法说明](#方法说明)
- [错误处理](#错误处理)
- [请求配置](#请求配置)
- [测试用例使用](#测试用例使用)


## 简介

Tuya Connector FE SDK 是 Tuya SaaS Admin 管理平台数据 API 的 JavaScript 封装。 
目前提供`账户登录和登出`，`修改密码`，`资产管理`，`设备管理`相关 API。

Demo 项目镜像请参考 [https://hub.docker.com/r/iotportal/iot-suite](https://hub.docker.com/r/iotportal/iot-suite)。


## 浏览器兼容
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


## 安装
```shell
npm install @tuya/connector

or

yarn add @tuya/connector
```

## 例子
```js
import {version, apiService} from '@tuya/connector'

// 当前sdk版本号 
console.log(version);

const {multiLogin} = apiService;

multiLogin({
  userName: 'test',
  pwd: '123123a',
}).then((res) => {
  if (res) {
    // 登录成功
    console.log('logged in');
  } else {
    console.error('fail to login');
  }
}).catch((err) => {
  // 登录失败
  console.error('login fail', err);
})
```

如需有特定domain 或者 port，可在使用前，初始化一下相关配置
```js
import {configMethod} from '@tuya/connector'

const {initGlobalConfig, getGlobalConfig, setGlobalConfig} = configMethod;

// 在项目初始化时调用，全局初始化一次即可
// 具体配置项参见Request Config
initGlobalConfig({
  baseURL: '',
  method: 'GET',
  onError: () => {}, // 全局错误回调
})

// 返回当前更改的配置，Request Config的默认配置不会携带
getGlobalConfig()

// 具体配置同initGlobalConfig，initGlobalConfig底层使用setGlobalConfig实现
setGlobalConfig({})
```

## 功能列表

- [login(userName, password[, config])](#login) 登录
- [multiLogin(loginParams[, config])](#multiLogin) 聚合登录
- [logout()](#logout) 登出
- [resetPassword(userName, currentPwd, newPwd[, config])](#resetPassword) 修改密码
- [forgetPassword(params[, config])](#forgetPassword) 重置密码
- [getVerifyCode(params[, config])](#getVerifyCode) 获取验证码

- [addAsset(assetName[, parentAssetId)[, config]]](#addAsset) 添加资产
- [editAsset(assetId, assetName[, config])](#editAsset) 编辑资产
- [removeAsset(assetId[, config])](#removeAsset) 移除指定资产
- [getChildrenAssetsByAssetId(assetId[, config])](#getChildrenAssetsByAssetId) 获取指定资产下的资产列表
- [searchAssetByName(assetName[, config])](#searchAssetByName) 资产模糊查询
- [getEntireTree([config])](#getEntireTree) 获取整棵资产树 （有设备信息）
- [getSubTree(assetId[, config])](#getSubTree) 获取指定资产的子树

- [getDevicesInfoByAssetId(assetId, pageNum, pageSize[, config])](#getDevicesInfoByAssetId) 获取指定资产下的设备信息
- [getDeviceInfoByDeviceId(deviceId[, config])](#getDeviceInfoByDeviceId) 获取设备信息
- [removeDeviceById(deviceId[, config])](#removeDeviceById) 删除设备
- [modifyDeviceInfo(deviceId, name[,config])](#modifyDeviceInfo) 修改设备
- [modifyDeviceDP(deviceId, deviceStatuses[, config])](#modifyDeviceDP) 控制设备
- [getDeviceDP(deviceId[,config])](#getDeviceDP) 获取设备指令
- [getDeviceInfoWithDP(deviceId[, config])](#getDeviceInfoWithDP) 获取设备信息和DP
- [getProjectInfo([config])](#getProjectInfo) 获取绑定设备二维码信息

- [getAccountList(params[, config])](#getAccountList) 获取用户列表
- [getPermissionListByAccount(uid[, config])](#getPermissionListByAccount) 获取用户权限列表
- [addAccount(params[, config])](#addAccount) 添加用户
- [batchRemoveAccount(userIds[, config])](#batchRemoveAccount) 批量删除用户
- [removeAccount(userId[, config])](#removeAccount) 删除单个用户
- [editAccountPwd(userName, newPwd[, config])](#editAccountPwd) 修改用户密码
- [batchModifyUserRole(userIds, roleCode[, config])](#batchModifyUserRole) 批量修改用户密码
- [modifyUserRole(userId, roleCode[, config])](#modifyUserRole) 修改单个用户角色
- [getEntireAssetTree([config])](#getEntireAssetTree) 获取整个资产树（无设备信息）
- [getUserAssetPermissionTree(userId)](#getUserAssetPermissionTree) 获取用户可用资产列表
- [grantUserAssetPermission(userId, assetIds[, config])](#grantUserAssetPermission) 修改用户资产授权
- [getRoleList(pageNo, pageSize, opts)](#getRoleList) 分页获取角色列表
- [getEntireRoles()](#getEntireRoles) 获取所有角色
- [addRole(params[, config])](#addRole) 添加角色
- [removeRole(roleCode[, config])](#removeRole) 移除角色
- [editRoleName(params[, config])](#editRoleName) 编辑角色名称
- [grantPermissionByRole(params[, config])](#grantPermissionByRole) 修改角色对应的权限
- [getRolePermissionDetail(roleCode[, config])](#getRolePermissionDetail) 获取角色的权限列表
- [getRolePermissionTemplate(roleCode[, config])](#getRolePermissionTemplate) 获取角色权限模板

## 方法说明
#### login
email 登录
```ts
type UserToken = {
  nick_name: string, // 用户名
  token: string,
  role_type: string[], // 角色类型
  userId: string;
}
/**
 * @param username: string
 * @param pwd: string
 */

login('test', 'test').then((<UserToken>res) => {
  // 操作成功返回UserToken
  console.log(res)
})

```

#### multiLogin
email 或者 手机号登录
```ts
interface loginParams {
  userName?: string,
  pwd: string,
  countryCode?: string,
  phoneNum?: string,
}

// email 登录
multiLogin({
  userName: 'xxx@email.com',
  pwd: 'test',
}).then((<UserToken>res) => {
  // 操作成功返回UserToken
  console.log(res)
});

// 手机号登录
multiLogin({
  countryCode: '86',
  phoneNum: '13000000000',
  pwd: 'test',
}).then((<UserToken>res) => {
  // 操作成功返回UserToken
  console.log(res)
})
```

#### logout
登出
```ts
logout().then(() => {
  // 服务器登录状态已清理，本地状态自行维护
  console.log('logout success');
});
```

#### resetPassword
修改密码
```js
/**
 * @param username
 * @param oldPwd
 * @param newPwd
 */
resetPassword('test', '123', '321').then((res) => {
  // boolean 操作是否成功
  console.log(res);
})

resetPassword('test', '123', '321', {
  baseURL: 'http://localhost:8000',
  method: 'POST'
}).then((res) => {
  // boolean 操作是否成功
  console.log(res);
})
```

#### forgetPassword
重置密码
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
获取验证码
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
获取一级子资产列表
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
搜索资产
```ts
/**
 * @param assetName: string
 */
searchAssetByName('test').then((res) => {
  console.log(<Asset[]>res);
})
```

#### addAsset
添加资产
```ts
/**
 * @param assetName: string,
 * @param parentAssetId: string = "",
 */
addAsset('newAsset', '1').then((res) => {
  // 新增资产id
  console.log(<string>res)
})
```

#### editAsset
编辑资产名称
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
  // 编辑成功
  console.log(<boolean>res)
}).catch((err) => {
  // 失败原因
  console.error(<errorType>err)
})
```

#### removeAsset
移除资产
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
  // 删除资产成功
  console.log(<boolean>res)
}).catch((err) => {
  // 失败原因
  console.error(<errorType>err)
})
```

#### getEntireTree
获取整棵资产树
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
  // 获取资产树成功
  console.log(<AssetDeep>res);
})
```

#### getSubTree
获取资产子树
```ts
/**
 * @param assetId: string,
 */
getSubTree('1').then((res) => {
  // 获取资产id为1的资产子树
  console.log(<AssetDeep>res);
});
```

#### getDevicesInfoByAssetId

```ts
type DeviceStatus = {
  code: string; // 	设备状态名
  value: Object; // 设备状态值
  options?: string; // dp取值配置
  editable?: boolean; // 是否可编辑
  name?: string; // dp名称
  type?: string; // dp类型
};

type DeviceInfo = {
  id: string; // 设备编号
  name: string; // 设备名称
  uid: string; // 用户Id
  local_key: string; // 密钥
  category: string; // 产品类别
  product_id: string; // 产品Id
  product_name: string; // 产品名称
  sub: boolean; // 判断是否为子设备
  uuid: string; // 设备唯一标识
  online: boolean; // 设备在线状态
  active_time: number; // 设备激活时间，时间戳，精确到秒
  icon: string; // 设备图标
  ip: string; // 设备IP
  create_time: number; // 设备创建时间，时间戳，精确到秒
  update_time: number; // 设备更新时间，时间戳，精确到秒
  time_zone: string; // 时区，比如: +08:00
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
  id: string; // 设备编号
  name: string; // 设备名称
  uid: string; // 用户Id
  local_key: string; // 密钥
  category: string; // 产品类别
  product_id: string; // 产品Id
  product_name: string; // 产品名称
  sub: boolean; // 判断是否为子设备
  uuid: string; // 设备唯一标识
  online: boolean; // 设备在线状态
  active_time: number; // 设备激活时间，时间戳，精确到秒
  icon: string; // 设备图标
  ip: string; // 设备IP
  create_time: number; // 设备创建时间，时间戳，精确到秒
  update_time: number; // 设备更新时间，时间戳，精确到秒
  time_zone: string; // 时区，比如: +08:00
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
删除设备
```ts
/**
 * @param deviceId: string,
 */
removeDeviceById('12').then((res) => {
  console.log(<boolean>res);
})
```

#### modifyDeviceInfo 
修改设备
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
控制设备

标准指令集详情地址，参考官网说明 https://developer.tuya.com/cn/docs/iot/open-api/standard-function/datatypedescription?id=K9i5ql2jo7j1k

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
modifyDeviceDP('12', [{code: '', value: 2}]).then((res) => {
  console.log(<boolean>res);
})
```

#### getDeviceDP
获取设备指令

标准指令集详情地址，参考官网说明 https://developer.tuya.com/cn/docs/iot/open-api/standard-function/datatypedescription?id=K9i5ql2jo7j1k

```ts
/**
 * @param deviceId: string,
 */
getDeviceDP('12').then((res) => {
  console.log(res)
})
```

#### getDeviceInfoWithDP
获取设备信息和DP

此方法为getDeviceDP 和 getDeviceInfoByDeviceId聚合结果，

将dp补充到deviceInfo 的 status 字段中。
```ts
/**
 * @param deviceId: string,
 */
getDeviceInfoWithDP('deviceId1').then((res) => {
  console.log(<DeviceInfo>res);
})

// 参考样例
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
      name: "温标切换",
      type: "Enum",
      options: "{\"range\":[\"c\",\"f\"]}",
    },
    {
      code: "maxtemp_set",
      value: 535,
      editable: true,
      name: "温度上限设置",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
    },
    {
      code: "minitemp_set",
      value: 0,
      editable: true,
      name: "温度下限设置",
      type: "Integer",
      options: "{\"unit\":\"℃\",\"min\":-399,\"max\":800,\"scale\":1,\"step\":1}",
    },
    {
      code: "maxhum_set",
      value: 95,
      editable: true,
      name: "湿度上限设置",
      type: "Integer",
      options: "{\"unit\":\"%\",\"min\":0,\"max\":100,\"scale\":0,\"step\":1}"
    },
    {
      code: "minihum_set",
      value: 10,
      name: "湿度下限设置",
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
获取绑定设备二维码信息

```ts
type ProjectInfo = {
  project_name: string;
  project_code: string;
};

getProjectInfo().then((res) => {
  // 获取绑定设备二维码信息成功
  console.log(<ProjectInfo>res);
})
```

#### getAccountList
获取账户列表

```ts
interface user {
  userId: string;
  nickName: string;
  userName: string; // login account
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
获取账户对应的权限列表

```ts
getPermissionListByAccount('uid').then((res) => {
  return <permission[]>res;
})
```

#### addAccount
添加账户

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
批量删除账户

```ts
batchRemoveAccount(['userId1', 'userId2']).then((res) => {
  return <boolean>res;
})
```

#### removeAccount
删除单个账户

```ts
removeAccount('userID').then((res) => {
  return <boolean>res;
})
```

#### editAccountPwd
修改账户密码

```ts
editAccountPwd('userName', '123456A').then((res) => {
  return <boolean>res;
})
```

#### batchModifyUserRole
批量修改账户角色

```ts
batchModifyUserRole(['userId1', 'userId2'], 'manager-1000').then((res) => {
  return <boolean>res;
})
```

#### modifyUserRole
修改单个账户角色

```ts
modifyUserRole('userId', 'manager-1000').then((res) => {
  return <boolean>res;
});
```

#### getEntireAssetTree
获取整颗资产树（无设备数量）

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
获取用户资产列表

```ts
getUserAssetPermissionTree('userId').then((res) => {
  return <PermissionAsset[]>res;
});
```

#### grantUserAssetPermission
修改用户资产列表

```ts
grantUserAssetPermission('userId', ['1', '2']).then((res) => {
  return <boolean>res;
});
```

#### getRoleList
获取角色列表

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
获取全部角色

```ts
getEntireRoles().then((res) => {
  return <role[]>res;
})
```

#### addRole
添加角色

```ts
enum RoleType {
  manager = 'manager',
  normal = 'normal',
}

interface addRoleParams {
  roleName: string;
  roleType: RoleType;
  roleRemark?: string; // role description
}
addRole({
  roleName: 'roleName',
  roleType: 'normal',
}).then((res) => {
  return <boolean>res;
})
```

#### removeRole
删除角色

```ts
removeRole('roleCode').then((res) => {
  return <boolean>res;
})
```

#### editRoleName
修改角色名

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
修改角色对应的权限列表

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
获取角色的对应的权限列表

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
获取角色权限模板

```ts
getRolePermissionTemplate('manager').then((res) => {
  return <permission[]>res;
})
```

---------

## 错误处理
当出现http异常时，apiService会统一捕获异常，请使用promise catch获取相关异常message
```ts
apiService.getDeviceInfoByDeviceId('1').catch(({msg, code}) => {
  console.error(msg);
})
```
或者
在initConfig里，注册全局错误处理方法
```ts
type ApiError = {
  httpCode: number, // http code
  code: number,
  msg: string,
  apiMethodName: string, // 调用方法名
}

initConfig({
  onError: (<ApiError>errorObj) => {}
})
```

## 请求配置
请求配置详情请参考 [Axios request config](https://github.com/axios/axios#request-config)



## 测试用例使用

前置准备，启动mock server

默认监听7001

```bash
npm run testServer
```

单元测试启动命令
```bash
npm run jest
```

## License

[MIT License](./LICENSE)
