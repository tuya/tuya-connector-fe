import { initConfig } from "..";
import { login, logout, multiLogin, resetPassword } from "../../../lib/apis/account";

beforeAll(() => {
  initConfig();
});

describe("#login()", function () {
  test("should return true", function () {
    return login("test", "A123456").then((res) => {
      expect(res).toMatchObject({
        nick_name: "test",
        token: "123123123123123",
        role_type: 1,
      });
    });
  });

  test("should return false", function () {
    return login("test", "A123456").catch((err) => {
      expect(err.msg).toEqual("username or password error");
    });
  });
});

describe("multiLogin", function () {
  test("email case, should return true", function () {
    return multiLogin({
      userName: "test",
      pwd: "A123456",
    }).then((res) => {
      expect(res).toMatchObject({
        nick_name: "test",
        token: "123123123123123",
        role_type: 1,
      });
    });
  });

  test("telephone case, return true", function () {
    return multiLogin({
      countryCode: "86",
      phoneNum: "13011112222",
      pwd: "A123456",
    }).then((res) => {
      expect(res).toMatchObject({
        nick_name: "13011112222",
        token: "123123123123123",
        role_type: 1,
      });
    });
  });
});

describe("#resetPassword()", function () {
  test("should return true", function () {
    return resetPassword("test", "A123456", "123456A").then((res) => {
      expect(res).toBeTruthy();
    });
  });

  test("should return false", function () {
    return resetPassword("123", "123", "test1").then((res) => {
      expect(res).toBeFalsy();
    });
  });
});

describe("#logout", function () {
  test("return true", function () {
    return logout().then((res) => {
      expect(res).toBeTruthy();
    });
  });
});
