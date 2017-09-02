/**
 * Created by yulong.chen on 9/2/17.
 */

function checkEmailFormat(email) {
  //reg for checking .edu email
  return email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$');
}

function checkPasswordFormat(password) {
  //reg for checking password format
  //password has to be at least 6 characters, contains one letter and one number
  return password.match('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$');
}

module.exports = {
  checkEmailFormat: checkEmailFormat,
  checkPasswordFormat: checkPasswordFormat
};
