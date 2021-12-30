const axios = require('axios');
const CryptoJS = require('crypto-js');
const btoa = require('btoa');

const KotakAccessToken = (req, res, next) => {
  let vRanKey = Math.floor(Math.random() * 8080808080808080 + 1);
  let key = CryptoJS.enc.Utf8.parse(vRanKey);
  let iv = CryptoJS.enc.Utf8.parse(vRanKey);

  let vEncryptedLogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('BP000001'), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  let vEncryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('Admin@1234'), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  vEncryptedLogin = btoa(vEncryptedLogin);
  vEncryptedPassword = btoa(vEncryptedPassword);

  const url = 'https://kgibridgeuat.kotakmahindrageneralinsurance.com/BPOS_USER_SERVICE/wsUserManagementServices.svc/Fn_Get_Service_Access_Token_For_User';
  const headers = {
    vRanKey: vRanKey,
    'Content-Type': 'application/json',
  };
  const postData = {
    vLoginEmailId: vEncryptedLogin,
    vPassword: vEncryptedPassword,
  };

  axios
    .post(url, postData, { headers: headers })
    .then((response) => {
      if (response.data.vErrorMsg === 'Success') {
        req.body = {
          ...req.body,
          authentication: {
            token: response.data.vTokenCode,
            email: response.data.vLoginEmailId,
          },
        };
        next(req, res);
      } else {
        res.status(500).send({ message: response.data.vErrorMsg });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

const KotakAccessTokenAll = async (client_object, next) => {
  let vRanKey = Math.floor(Math.random() * 8080808080808080 + 1);
  let key = CryptoJS.enc.Utf8.parse(vRanKey);
  let iv = CryptoJS.enc.Utf8.parse(vRanKey);

  let vEncryptedLogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('BP000001'), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  let vEncryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('Admin@1234'), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  vEncryptedLogin = btoa(vEncryptedLogin);
  vEncryptedPassword = btoa(vEncryptedPassword);

  const url = 'https://kgibridgeuat.kotakmahindrageneralinsurance.com/BPOS_USER_SERVICE/wsUserManagementServices.svc/Fn_Get_Service_Access_Token_For_User';
  const headers = {
    vRanKey: vRanKey,
    'Content-Type': 'application/json',
  };
  const postData = {
    vLoginEmailId: vEncryptedLogin,
    vPassword: vEncryptedPassword,
  };

  try {
    const { data } = await axios.post(url, postData, { headers: headers });
    if (data.vErrorMsg === 'Success') {
      client_object = {
        ...client_object,
        authentication: {
          token: data.vTokenCode,
          email: data.vLoginEmailId,
        },
      };
      return next(client_object);
    } else {
      return {
        error: true,
        company_name: 'kotak',
        message: 'Invalid authentication',
      };
    }
  } catch (error) {
    return {
      error: true,
      company_name: 'kotak',
      message: 'Something went wrong....!',
    };
  }
};

module.exports = { KotakAccessToken, KotakAccessTokenAll };
