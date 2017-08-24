var express = require('express');
var q = require('Q');
var User = require('../models/user');

var router = express.Router();

//Format checking if is valid email address. Also for string filtering reason.
router.use(function (req, res, next) {
    let email = req.body.email || req.query.email || " ";
    if (checkEmailFormat(email)) {
        next();
    } else {
        res.status(400);
        res.send('Bad Request: invalid email format');
    }
});

//Register a new users
router.post('/newuser',function(req, res) {

    let email = req.body.email;
    let password = req.body.password || " ";

    if (!checkPasswordFormat(password)) {
        res.status(400);
        return res.send('Bad Request: invalid password format');
    }

    checkEmailExist(email)
        .then (function() {

            saveUserToDb(email, password)
                .then(function() {
                    res.status(200);
                    return res.send('Success: user has successfully created!');
                })
                .fail(function() {
                    res.status(500);
                    return res.send('Server Internal Error: not able to save data into mongodb');
                })
                .done()
        })

        .fail(function() {
            res.status(400);
            return res.send('Bad Request: email already existed');
        });




});

router.get('/checkemail', function(req, res) {

    let email = req.query.email;
    console.log(email);
    checkEmailExist(email)
        .then(function() {
            res.status(200);
            return res.send('Success: the email does not exist!');
        })
        .fail(function() {
            res.status(202);
            return res.send('Accept: the mail is already exist!');
        });

});

function saveUserToDb(email, password) {

    var deferred = q.defer();
    var newUser = new User({
        email: email,
        password: password
    });

    newUser.save(function (err) {
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
    console.log("look for ", email)
    User.findOne( {
        email: email
    }, function (err, result) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        } else {
            console.log(result);
            if (result == null) {
                deferred.resolve()
            } else {
                deferred.reject();
            }
        }

    });

    return deferred.promise;

}

function checkEmailFormat(email) {
    //reg for checking .edu email
   return email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$");
}

function checkPasswordFormat(password) {
    //reg for checking password format
    //password has to be at least 6 characters, contains one letter and one number
    return password.match("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$");
}



module.exports = router;