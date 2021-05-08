const success = {
  code: 200,
  success: true,
  msg: '',
};

const error = {
  code: 400,
  success: false,
};

module.exports.successResp = (res, value = {}) => {
  res.send(Object.assign({}, success, {...value}));
};

module.exports.errorResp = (res, value = {}) => {
  res.send(Object.assign({}, error, {...value}));
};
