import { sha256 } from "js-sha256";
import createService from "../../common/service";
import { errorType, IOptions } from "../../common/types";

export type UserToken = {
  nick_name: string; // 用户名
  token: string;
  role_type: number; // 角色类型，暂时先定为1
};

export const login = (
  username: string,
  pwd: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<UserToken>>createService({
    apiMethodName: "login",
    url: "/login",
    method: "POST",
    ...opts,
    data: {
      ...opts.data,
      user_name: username,
      login_password: sha256(pwd),
    },
  }).then((res) => {
    if (res) {
      return <UserToken>res;
    }
    return null;
  });
};

export interface loginParams {
  userName?: string;
  pwd: string;
  countryCode?: string;
  phoneNum?: string;
}

/**
 * 聚合登录，电话 or email
 * @param params
 * @param opts
 * @returns
 */
export const multiLogin = (
  { userName, pwd, countryCode, phoneNum }: loginParams,
  opts: IOptions = { data: {} }
) => {
  const params: any = {
    login_password: sha256(pwd),
  };
  if (userName) {
    params.user_name = userName;
  }

  if (countryCode && phoneNum) {
    params.country_code = countryCode;
    params.telephone = phoneNum;
  }

  return <Promise<UserToken>>createService({
    apiMethodName: "login",
    url: "/login",
    method: "POST",
    ...opts,
    data: {
      ...opts.data,
      ...params,
    },
  }).then((res) => {
    if (res) {
      return <UserToken>res;
    }
    return null;
  });
};

/**
 * 修改密码
 * @param username
 * @param oldPwd
 * @param newPwd
 * @param opts
 * @returns
 */
export const resetPassword = (
  username: string,
  oldPwd: string,
  newPwd: string,
  opts: IOptions = { data: {} }
) => {
  return <Promise<boolean>>createService({
    apiMethodName: "resetPassword",
    url: "/user/password",
    method: "PUT",
    ...opts,
    data: {
      ...opts.data,
      user_name: username,
      current_password: sha256(oldPwd),
      new_password: sha256(newPwd),
    },
  });
};

/**
 * 登出
 * @param opts
 * @returns
 */
export const logout = (opts: IOptions = { data: {} }) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: "logout",
    url: "/logout",
    method: "POST",
    ...opts,
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * 忘记密码，用户密码重置
 */
// export const forgetPassword = (username: string, newPwd: string, code: string, opts: IOptions = {data: {}}) => {
//   return <Promise<boolean | errorType>>createService({
//     apiMethodName: 'resetPasswordV2',
//     url: '/user/password/reset',
//     method: 'PUT',
//     ...opts,
//     data: {
//       ...opts.data,
//       user_name: username,
//       new_password: sha256(newPwd),
//       verification_code: code,
//     },
//   }).then(() => {
//     return true;
//   }).catch((err) => {
//     return err;
//   });
// };

export interface verifyCodeParamsPhone {
  country_code: string,
  telephone: string,
}

export interface verifyCodeParamsEmail {
  email: string,
}

/**
 * 获取验证码
 */
// export const getVerifyCode = (params: verifyCodeParamsEmail | verifyCodeParamsPhone, opts: IOptions = {data: {}}) => {
//   return <Promise<boolean | errorType>>createService({
//     apiMethodName: 'getVerifyCode',
//     url: '/verification-code',
//     method: 'GET',
//     ...opts,
//     params: {
//       ...opts.data,
//       ...params,
//     },
//   }).then(() => {
//     return true;
//   }).catch((err) => {
//     return err;
//   });
// };
