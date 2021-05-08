import { initConfig } from "..";
import {
  getDeviceDP,
  getDeviceInfoByDeviceId,
  getDeviceInfoWithDP,
  getDevicesInfoByAssetId,
  getProjectInfo,
  modifyDeviceDP,
  modifyDeviceInfo,
  removeDeviceById,
} from "../../../lib/apis/devices";

beforeAll(() => {
  initConfig();
});

describe("device", function () {
  describe("#getDevicesInfoByAssetId()", function () {
    test("should return empty array", function () {
      return getDevicesInfoByAssetId("2", 1, 10).then((res) => {
        return expect(res).toEqual({
          total: 0,
          page_no: 1,
          page_size: 10,
          data: [],
        });
      });
    });

    test("should return devices array", function () {
      return getDevicesInfoByAssetId("1", 1, 10).then((res) => {
        return expect(res).toMatchObject({
          total: 1,
          page_no: 1,
          page_size: 10,
          data: [
            {
              id: "deviceId1",
              name: "deviceId1",
              uid: "uid1",
              local_key: "local_key",
              category: "category",
              product_id: "product_id",
              product_name: "product_name",
              sub: true,
              uuid: "uuid",
              online: true,
              active_time: 1615175477,
              icon: "icon",
              ip: "127.0.0.1",
              create_time: 1615175477,
              update_time: 1615175477,
              time_zone: "+08:00",
              status: [
                {
                  code: "va_temperature",
                  value: 243,
                },
                {
                  code: "va_humidity",
                  value: 55,
                },
                {
                  code: "battery_percentage",
                  value: 40,
                },
                {
                  code: "charge_state",
                  value: false,
                },
                {
                  code: "temp_unit_convert",
                  value: "c",
                },
                {
                  code: "maxtemp_set",
                  value: 535,
                },
                {
                  code: "minitemp_set",
                  value: 0,
                },
                {
                  code: "maxhum_set",
                  value: 95,
                },
                {
                  code: "minihum_set",
                  value: 10,
                },
                {
                  code: "temp_alarm",
                  value: "upperalarm",
                },
                {
                  code: "hum_alarm",
                  value: "cancel",
                },
              ],
            },
          ],
        });
      });
    });
  });

  describe("#getDeviceInfoByDeviceId()", function () {
    test("should return null", function () {
      return getDeviceInfoByDeviceId("tt").then((res) => {
        return expect(res).toEqual(null);
      });
    });

    test("should return device info object", function () {
      return getDeviceInfoByDeviceId("deviceId1").then((res) => {
        return expect(res).toMatchObject({
          id: "deviceId1",
          name: "deviceId1",
          uid: "uid1",
          local_key: "local_key",
          category: "category",
          product_id: "product_id",
          product_name: "product_name",
          sub: true,
          uuid: "uuid",
          online: true,
          active_time: 1615175477,
          icon: "icon",
          ip: "127.0.0.1",
          create_time: 1615175477,
          update_time: 1615175477,
          time_zone: "+08:00",
          status: [
            {
              code: "va_temperature",
              value: 243,
            },
            {
              code: "va_humidity",
              value: 55,
            },
            {
              code: "battery_percentage",
              value: 40,
            },
            {
              code: "charge_state",
              value: false,
            },
            {
              code: "temp_unit_convert",
              value: "c",
            },
            {
              code: "maxtemp_set",
              value: 535,
            },
            {
              code: "minitemp_set",
              value: 0,
            },
            {
              code: "maxhum_set",
              value: 95,
            },
            {
              code: "minihum_set",
              value: 10,
            },
            {
              code: "temp_alarm",
              value: "upperalarm",
            },
            {
              code: "hum_alarm",
              value: "cancel",
            },
          ],
        });
      });
    });
  });

  test("removeDeviceById", () => {
    return removeDeviceById("12").then((res) => {
      return expect(res).toBeTruthy();
    });
  });
  test("modifyDeviceInfo", () => {
    return modifyDeviceInfo("12", "newDeviceName").then((res) => {
      return expect(res).toBeTruthy();
    });
  });
  test("modifyDeviceDP", () => {
    return modifyDeviceDP("12", [{ code: "abc", value: 2 }]).then((res) => {
      return expect(res).toBeTruthy();
    });
  });
  test("getDeviceDP", () => {
    return getDeviceDP("deviceId12").then((res) => {
      return expect(res).toMatchObject([]);
    });
  });
});

describe("#getDeviceInfoWithDP()", () => {
  test("getDeviceInfoWithDP", () => {
    return getDeviceInfoWithDP("deviceId1").then((res) => {
      return expect(res).toEqual({
        id: "deviceId1",
        name: "deviceId1",
        uid: "uid1",
        local_key: "local_key",
        category: "category",
        product_id: "product_id",
        product_name: "product_name",
        sub: true,
        uuid: "uuid",
        online: true,
        active_time: 1615175477,
        icon: "icon",
        ip: "127.0.0.1",
        create_time: 1615175477,
        update_time: 1615175477,
        time_zone: "+08:00",
        status: [
          {
            code: "va_temperature",
            value: 243,
            editable: false,
            type: "Integer",
            options: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
            name: "",
          },
          {
            code: "va_humidity",
            value: 55,
            editable: false,
            type: "Integer",
            options: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
            name: "",
          },
          {
            code: "battery_percentage",
            value: 40,
            name: "",
            editable: false,
            type: "Integer",
            options: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "charge_state",
            value: false,
            editable: false,
            type: "Boolean",
            options: "{}",
            name: "",
          },
          {
            code: "temp_unit_convert",
            value: "c",
            editable: true,
            name: "温标切换",
            type: "Enum",
            options: '{"range":["c","f"]}',
          },
          {
            code: "maxtemp_set",
            value: 535,
            editable: true,
            name: "温度上限设置",
            type: "Integer",
            options: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "minitemp_set",
            value: 0,
            editable: true,
            name: "温度下限设置",
            type: "Integer",
            options: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "maxhum_set",
            value: 95,
            editable: true,
            name: "湿度上限设置",
            type: "Integer",
            options: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "minihum_set",
            value: 10,
            name: "湿度下限设置",
            editable: true,
            type: "Integer",
            options: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "temp_alarm",
            value: "upperalarm",
            type: "Enum",
            editable: false,
            options: '{"range":["loweralarm","upperalarm","cancel"]}',
            name: "",
          },
          {
            code: "hum_alarm",
            value: "cancel",
            type: "Enum",
            editable: false,
            options: '{"range":["loweralarm","upperalarm","cancel"]}',
            name: "",
          },
        ],
      });
    });
  });
});

describe("#getProjectInfo", function () {
  test("should return projectInfo", () => {
    return getProjectInfo().then((res) => {
      expect(res).toEqual({
        project_name: "test",
        project_code: "test",
      });
    });
  });
});
