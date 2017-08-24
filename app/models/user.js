var mongoose = require('mongoose');
var db = require('../database/connect');

var Schema = mongoose.Schema;

var userSchema = Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/.test(email)
            },
            message: '{VALUE} is not a valid .edu email'
        }
    },
    password: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
}, {collection: 'users'});

//save date
userSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    next();
});

module.exports = db.users.model('users', userSchema, 'users');