var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User',{
    userid: Schema.Types.Number,
    username: String,
    password: String,
    email: String,
});

module.exports = User;