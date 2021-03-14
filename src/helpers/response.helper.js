const errorConfig = require('../config/errors.config');

function makeErrorObject(key, payload) {
  const str = payload === undefined ? '' : String(payload);
  return {
    status: "error",
    error: {
      code: errorConfig[key].code || errorConfig.unknown_error.code,
      message: errorConfig[key].message + str || errorConfig.unknown_error.message,
    }
  };
}

function makeServerErrorObject(message) {
  return {
    status: "error",
    error: {
      code: errorConfig.server_error.code,
      message: message || errorConfig.server_error.message,
    }
  };
}

function makeSuccessObject(payloadObject) {
  return {
    status: "ok",
    result: payloadObject || {}
  };
}

const helpers = {
  makeErrorObject,
  makeServerErrorObject,
  makeSuccessObject
};
module.exports = helpers;