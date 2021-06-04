import createService from "./lib/common/service";
import * as configMethod from "./lib/common/config";
import { IOptions } from "./lib/common/types";
import packageJson from "./package.json";
import * as apiService from "./lib/apis";

const version = packageJson.version;
const apiClient = (config: IOptions) => {
  return createService(Object.assign({}, config, { apiMethodName: "" }));
};

const coreSdk = {
  version,
  apiClient,
  configMethod,
  apiService,
};

export type {
  Asset,
  BaseAsset,
  AssetDeep,
  DeviceInfo,
  DeviceStatus,
  DeviceInfoList,
  UserToken,
  ProjectInfo,
  verifyCodeParamsEmail,
  verifyCodeParamsPhone,
  loginParams,

  getAccountListParams,
  userListResp,
  user,
  addAccountParams,
  role,
  roleListResp,
  RoleType,
  addRoleParams,
  editRoleNameParams,
  grantPermissionByRoleParams,
  permission,
  PermissionType,
  alarmParams,
  alarmItem,
  alarmResp,
  AdminAsset,
} from "./lib/apis";
export type { errorType } from "./lib/common/types";

export { apiService, configMethod, version, apiClient };

export default coreSdk;
