const errorConfig = require('../config/errors.config');

function makeErrorObject(key) {
  return {
    status: "error",
    error: {
      code: errorConfig[key].code || errorConfig.unknown_error.code,
      message: errorConfig[key].message || errorConfig.unknown_error.message,
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