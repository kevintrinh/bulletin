var express = require('express');
var q = require('Q');
var jwt = require('jsonwebtoken');
var dbutil = require('mongoutil');
var bbutil = require('bbutil');
var resGenerator =  require('../common/bbutil');
var constants = require('../common/constants');
var router = express.Router();

router.post('/login', function(req, res) {
  let email = req.body.email || '';
  let password = req.body.password || '';
  res.status(200);
  if (!bbutil.checkEmailFormat(email) || bbutil.checkPasswordFormat(password)) {
    return res.send(resGenerator.createResJson(
        resGenerator.INVALID_PARAM.FORMAT));
  }

  dbutil.checkUserExist(email)
      .then(function(user) {

        if (user.password === password) {
          var token = jwt.sign(user, constants.TOKEN_SECRET);
          var json = {
              'token': token
            };
          return res.send(resGenerator.create(resGenerator.AUTH_TOKEN, json));
        } else {
          return res.send(resGenerator.create(resGenerator.WRONG_PASSWORD));
        }
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
