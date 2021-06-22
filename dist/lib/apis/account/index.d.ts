import { errorType, IOptions } from "../../common/types";
export declare type UserToken = {
    nickName: string | null;
    token: string;
    role_type: string[];
    userId: string;
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
export declare const forgetPassword: ({ code, newPassword, ...rest }: emailForgetPwdParams | phoneForgetPwdParams, opts?: IOptions) => Promise<boolean | errorType>;
export interface verifyCodeParamsPhone {
    language: string;
    countryCode: string;
    phone: string;
}
export interface verifyCodeParamsEmail {
    mail: string;
    language: string;
}
/**
 * 获取验证码
 * @params params[verifyCodeParamsEmail | verifyCodeParamsPhone]
 */
export declare const getVerifyCode: (params: verifyCodeParamsEmail | verifyCodeParamsPhone, opts?: IOptions) => Promise<boolean | errorType>;
