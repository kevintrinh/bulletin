var mongoose = require('mongoose');
var config = require('./config');


var db_users = mongoose.createConnection(config.db_users);

module.exports = {
    users: db_users
}