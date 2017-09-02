var express = require('express');
var q = require('Q');
var User = require('../models/user');
var resGenerator = require('../common/resGenerator');
var bbutil = require('../common/bbutil');
var dbutil = require('../common/dbutil');

var router = express.Router();

//Format checking if is valid email address. Also for string filtering reason.
router.use(function(req, res, next) {
    let email = req.body.email || req.query.email || ' ';
    if (util.checkEmailFormat(email)) {
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
    if (!util.checkPasswordFormat(password)) {
      return res.send(resGenerator.createResJson(
          resGenerator.INVALID_EMAIL_FORMAT));
    }

    dbutil.checkEmailExist(email)
        .then(function() {

            dbutil.saveUserToDb(email, password)
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

    dbutil.checkEmailExist(email)
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

module.exports = router;
