/*
 2XX means request success. (result)
 1XX means request success, but couldn't find the information requested. (errorMessage)
 3XX means server internal error. (errorMessage)

 The return body will be like this:
 {
    "statusCode": 200,
    "result": {

    }
    "errorMessage":
 }
*/

var responseTable = {
    200: '',
    100: 'The email is already existed',
    101: 'Invalid email format',
    102: 'Invalid parameter format',
    103: 'Wrong password',
    300: 'Failed to get result from database',
  };

function createResJson(statusCode, result) {
  var result = result || '';
  var res = {};
  res.statusCode = statusCode;
  res.result = {};
  res.errorMessage = '';

  if (199 < statusCode  && statusCode < 300) {
    res.result = result;
  } else {
    res.errorMessage = responseTable[statusCode] || '';
  }

  return JSON.stringify(res);
}

module.exports = {
  SUCCESS: 200, // request success, no return value
  AUTH_TOKEN: 201,
  EMAIL_ALREADY_EXIST: 100,
  INVALID_EMAIL_FORMAT: 101,
  INVALID_PARAM_FORMAT: 102,
  WRONG_PASSWORD: 103,
  DATABASE_ERROR: 300,
  createResJson: createResJson
};
