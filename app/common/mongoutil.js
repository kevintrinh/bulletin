/**
 * Created by yulong.chen on 9/2/17.
 */
var q = require('Q');
var User = require('../models/user');

function saveUserToDb(email, password) {

  var deferred = q.defer();
  var newUser = new User({
    email: email,
    password: password
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      deferred.resolve();
    }

  });
  return deferred.promise;
}

function checkEmailExist(email) {
  //logic for checking if email exist

  var deferred = q.defer();

  User.findOne({
    email: email
  }, function(err, result) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      if (result == null) {
        deferred.resolve();
      } else {
        deferred.reject(400);
      }
    }

  });

  return deferred.promise;
}

function checkUserExist(email) {
  var deferred = q.defer();

  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      if (!user) {
        deferred.reject(400);
      } else {
        deferred.resolve(user);
      }
    }
  });

  return deferred.promise;
}

module.exports = {
  saveUserToDb: saveUserToDb,
  checkEmailExist: checkEmailExist,
  checkUserExist: checkUserExist
};
