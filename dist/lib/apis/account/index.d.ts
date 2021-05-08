import { errorType, IOptions } from "../../common/types";
export declare type UserToken = {
    nick_name: string;
    token: string;
    role_type: number;
};
export declare const login: (username: string, pwd: string, opts?: IOptions) => Promise<UserToken>;
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
export declare const multiLogin: ({ userName, pwd, countryCode, phoneNum }: loginParams, opts?: IOptions) => Promise<UserToken>;
/**
 * 修改密码
 * @param username
 * @param oldPwd
 * @param newPwd
 * @param opts
 * @returns
 */
export declare const resetPassword: (username: string, oldPwd: string, newPwd: string, opts?: IOptions) => Promise<boolean>;
/**
 * 登出
 * @param opts
 * @returns
 */
export declare const logout: (opts?: IOptions) => Promise<boolean | errorType>;
/**
 * 忘记密码，用户密码重置
 */
export interface verifyCodeParamsPhone {
    country_code: string;
    telephone: string;
}
export interface verifyCodeParamsEmail {
    email: string;
}
/**
 * 获取验证码
 */
