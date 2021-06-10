import { sha256 } from "js-sha256";
import createService from "../../common/service";
import { errorType, IOptions } from "../../common/types";

export type UserToken = {
  nickName: string | null; // 用户名
  token: string;
  roleType: string[]; // 角色类型
  userId: string;
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

export interface forgetPwdParams {
  code: string;
  newPassword: string;
}

export interface emailForgetPwdParams extends forgetPwdParams {
  mail: string;
}

export interface phoneForgetPwdParams extends forgetPwdParams {
  countryCode: string;
  phone: string;
}

/**
 * 忘记密码，用户密码重置
 */
export const forgetPassword = ({
  code,
  newPassword,
  ...rest
}: emailForgetPwdParams | phoneForgetPwdParams, opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'forgetPassword',
    url: '/user/password/reset',
    method: 'POST',
    ...opts,
    data: {
      ...opts.data,
      newPassword: sha256(newPassword),
      code,
      ...rest,
    },
  }).then(() => {
    return true;
  }).catch((err) => {
    return err;
  });
};

export interface verifyCodeParamsPhone {
  language: string,
  countryCode: string,
  phone: string,
}

export interface verifyCodeParamsEmail {
  mail: string,
  language: string,
}

/**
 * 获取验证码
 * @params params[verifyCodeParamsEmail | verifyCodeParamsPhone]
 */
export const getVerifyCode = (params: verifyCodeParamsEmail | verifyCodeParamsPhone, opts: IOptions = {data: {}}) => {
  return <Promise<boolean | errorType>>createService({
    apiMethodName: 'getVerifyCode',
    url: '/user/password/reset/captcha',
    method: 'POST',
    ...opts,
    data: {
      ...opts.data,
      ...params,
    },
  }).then(() => {
    return true;
  }).catch((err) => {
    return err;
  });
};
