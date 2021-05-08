import {
  initGlobalConfig,
  getGlobalConfig,
  setGlobalConfig,
  isResponseRaw,
} from "../../../lib/common/config";
import createService from '../../../lib/common/service';
import {initConfig} from '../index';

describe("config", function () {
  describe("#getGlobalConfig()", function () {
    test('should return {"baseURL": "", "method": "GET"}', function () {
      expect(getGlobalConfig()).toMatchObject({
        baseURL: "",
        method: "GET",
      });
    });
  });

  describe("#setGlobalConfig", function () {
    test("setGlobalConfig should modify the config", function () {
      setGlobalConfig({ baseURL: "https://tuya.com" });

      expect(getGlobalConfig()).toMatchObject({
        baseURL: "https://tuya.com",
        method: "GET",
      });
    });

    test("after setGlobalConfig, getGlobalConfig should get the lastest config", function () {
      expect(getGlobalConfig()).toMatchObject({
        baseURL: "https://tuya.com",
        method: "GET",
      });
    });
  });

  describe("#initGlobalConfig", function () {
    test("initGlobalConfig should same as setGlobalConfig", function () {
      initGlobalConfig({
        url: "/api/test",
        data: {
          test: "test",
        },
        timeout: 60,
      });

      expect(getGlobalConfig()).toMatchObject({
        baseURL: "https://tuya.com",
        method: "GET",
        url: "/api/test",
        data: {
          test: "test",
        },
        timeout: 60,
      });
    });
  });

  describe("#isReponseRaw()", function () {
    test("should return false", function () {
      expect(isResponseRaw({})).toBeFalsy();
    });

    test("should return true", function () {
      expect(
        isResponseRaw({
          responseRaw: true,
        })
      ).toBeTruthy();
    });

    test("should return true", function () {
      setGlobalConfig({
        responseRaw: true,
      });
      expect(isResponseRaw({})).toBeTruthy();
    });
  });
});

describe("service error branch", function () {
  test("should catch error resp", () => {
    initConfig();
    return createService({
      apiMethodName: 'errorBranch',
      url: "/errorBranch",
      method: "GET",
    }).catch((res) => {
      return expect(res).toEqual({
        apiMethodName: 'errorBranch',
        code: 400,
        httpCode: 200,
        msg: '',
      });
    });
  });
});
