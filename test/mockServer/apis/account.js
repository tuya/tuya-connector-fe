const {successResp, errorResp} = require('./baseResp');

module.exports.login = (req, res) => {
  const {user_name, login_password, country_code, telephone} = req.body;
  if (user_name === 'test' && login_password === 'ac3704c5e852cec884a7695a2da26aaed697dae6bdb1d6ae830698e4e3666309') {
    return successResp(res, {
      result: {
        nick_name: 'test',
        token: '123123123123123',
        role_type: 1,
      },
    });
  }
  if (country_code === '86' && telephone === '13011112222' && login_password === 'ac3704c5e852cec884a7695a2da26aaed697dae6bdb1d6ae830698e4e3666309') {
    return successResp(res, {
      result: {
        nick_name: '13011112222',
        token: '123123123123123',
        role_type: 1,
      },
    });
  }

  return errorResp(res, {
    result: {},
    msg: 'username or password error'
  });
}

module.exports.resetPassword = (req, res) => {
  const {user_name, current_password, new_password} = req.body;
  if (user_name === 'test' && current_password === 'ac3704c5e852cec884a7695a2da26aaed697dae6bdb1d6ae830698e4e3666309' && new_password === '5fdf54dc68d6348b46c269d4c190f407d74de4b657b3c88a6b96750d7cc3b5bd') {
    return successResp(res, {
      result: true,
    });
  }
  return successResp(res, {
    result: false,
  });
}

module.exports.logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  return successResp(res, {});
};

module.exports.forgetPassword = (req, res) => {
  const {user_name, new_password, verification_code} = req.body;
  if (user_name === 'test' && new_password === 'ac3704c5e852cec884a7695a2da26aaed697dae6bdb1d6ae830698e4e3666309' && verification_code === '123321') {
    return successResp(res, {});
  }
  return errorResp(res, {});
};

module.exports.getVerifyCode = (req, res) => {
  const {email, country_code, telephone} = req.query;

  if (email === 'test123@tuya.com') {
    return successResp(res, {});
  }

  if (country_code === '86' && telephone === '13011112222') {
    return successResp(res, {});
  }

  return errorResp(res, {});
};

