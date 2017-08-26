var express = require('express');
var q = require('Q');
var User = require('../models/user');
var resGenerator = require('../common/resGenerator');

var router = express.Router();

//Format checking if is valid email address. Also for string filtering reason.
router.use(function(req, res, next) {
    let email = req.body.email || req.query.email || ' ';
    if (checkEmailFormat(email)) {
      next();
    } else {
      res.status(200);
      res.send(resGenerator.createResJson(resGenerator.INVALID_EMAIL_FORMAT));
    }
  });

//Register a new users
router.post('/newuser', function(req, res) {

    let email = req.body.email;
    let password = req.body.password || ' ';
    res.status(200);
    if (!checkPasswordFormat(password)) {
      return res.send(resGenerator.createResJson(
          resGenerator.INVALID_EMAIL_FORMAT));
    }

    checkEmailExist(email)
        .then(function() {

            saveUserToDb(email, password)
                .then(function() {
                    return res.send(resGenerator.createResJson(
                        resGenerator.SUCCESS));
                  })
                .fail(function(err) {
                    return res.send(resGenerator.createResJson(
                        resGenerator.DATABASE_ERROR));
                  })
                .done();
          })

        .fail(function(err) {
            if (err == 400) {
              return res.send(resGenerator.createResJson(
                    resGenerator.EMAIL_ALREADY_EXIST));
            } else {
              return res.send(resGenerator.createResJson(
                  resGenerator.DATABASE_ERROR));
            }
          });

  });

router.get('/checkemail', function(req, res) {

    let email = req.query.email;
    res.status(200);

    checkEmailExist(email)
        .then(function() {
            return res.send(resGenerator.createResJson(resGenerator.SUCCESS));
          })
        .fail(function(err) {
            if (err == 400) {
              return res.send(resGenerator.createResJson(
                  resGenerator.EMAIL_ALREADY_EXIST));
            } else {
              return res.send(resGenerator.createResJson(
                  resGenerator.DATABASE_ERROR));
            }

          });

  });

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

function checkEmailFormat(email) {
  //reg for checking .edu email
  return email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$');
}

function checkPasswordFormat(password) {
  //reg for checking password format
  //password has to be at least 6 characters, contains one letter and one number
  return password.match('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$');
}

module.exports = router;
