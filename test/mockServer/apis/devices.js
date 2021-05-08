const { successResp } = require("./baseResp");

module.exports.getDevicesInfoByAssetId = (req, res) => {
  const { asset_id } = req.query;
  if (asset_id !== "1") {
    return successResp(res, {
      result: {
        page_no: 1,
        page_size: 10,
        total: 0,
        data: [],
      },
    });
  }
  return successResp(res, {
    result: {
      page_no: 1,
      page_size: 10,
      total: 1,
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
    },
  });
};

module.exports.getDeviceInfoByDeviceId = (req, res) => {
  const { device_id } = req.query;
  if (device_id !== "deviceId1") {
    return successResp(res, {
      result: null,
    });
  }

  return successResp(res, {
    result: {
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
  });
};

module.exports.removeDeviceById = (req, res) => {
  const { device_id } = req.query;
  if (device_id !== "12") {
    return successResp(res, {
      result: true,
    });
  }
  return successResp(res, {
    result: true,
  });
};

module.exports.modifyDeviceInfo = (req, res) => {
  const { device_id } = req.body;
  if (device_id !== "12") {
    return successResp(res, {
      result: false,
    })
  }

  return successResp(res, {
    result: true,
  });
};

module.exports.modifyDeviceDP = (req, res) => {
  return successResp(res, {
    result: true,
  });
};

module.exports.getDeviceDP = (req, res) => {
  const { device_id } = req.query;
  if (device_id !== "deviceId1") {
    return successResp(res, {
      result: [],
    })
  }

  return successResp(res, {
      result: {
        category: "wsdcg",
        functions: [
          {
            code: "temp_unit_convert",
            desc: '{"range":["c","f"]}',
            name: "温标切换",
            type: "Enum",
            values: '{"range":["c","f"]}',
          },
          {
            code: "maxtemp_set",
            desc: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
            name: "温度上限设置",
            type: "Integer",
            values: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "minitemp_set",
            desc: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
            name: "温度下限设置",
            type: "Integer",
            values: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "maxhum_set",
            desc: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
            name: "湿度上限设置",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "minihum_set",
            desc: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
            name: "湿度下限设置",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
        ],
        status: [
          {
            code: "va_temperature",
            type: "Integer",
            values: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "va_humidity",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "battery_percentage",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "charge_state",
            type: "Boolean",
            values: "{}",
          },
          {
            code: "temp_unit_convert",
            type: "Enum",
            values: '{"range":["c","f"]}',
          },
          {
            code: "maxtemp_set",
            type: "Integer",
            values: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "minitemp_set",
            type: "Integer",
            values: '{"unit":"℃","min":-399,"max":800,"scale":1,"step":1}',
          },
          {
            code: "maxhum_set",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "minihum_set",
            type: "Integer",
            values: '{"unit":"%","min":0,"max":100,"scale":0,"step":1}',
          },
          {
            code: "temp_alarm",
            type: "Enum",
            values: '{"range":["loweralarm","upperalarm","cancel"]}',
          },
          {
            code: "hum_alarm",
            type: "Enum",
            values: '{"range":["loweralarm","upperalarm","cancel"]}',
          },
        ],
      },
    });
};

module.exports.getProjectInfo = (req, res) => {
  return successResp(res, {
    result: {
      project_name: 'test',
      project_code: 'test',
    }
  });
};
