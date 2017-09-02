var mongoose = require('mongoose');
var config = require('./config');
var dbUsers = mongoose.createConnection(config.dbUsers);

module.exports = {
        users: dbUsers
      };
