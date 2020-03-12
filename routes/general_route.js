var redirectMW = require('../middleware/general/redirect');
var loginMW = require('../middleware/general/loginMW');
var renderMW = require('../middleware/general/render')
var registerMW = require('../middleware/general/registerMW');
var getUserDataMW = require('../middleware/general/getUserDataMW');
var authMW = require('../middleware/general/auth');
var spotifyLoginMW = require('../middleware/general/spotifyLogin');


var userModel = require('../models/user');

module.exports = function (app) {

    var objRepository = {
        userModel : userModel
    };
    

    app.get('/',
        redirectMW('/login'));

    app.get('/login',
        renderMW('login'));

    app.post('/login',
        spotifyLoginMW(),
        loginMW(objRepository),
        );

    app.get('/register',
        renderMW('register'));

    app.post('/register',    
    registerMW(objRepository),
    renderMW('login'));

    app.get('/messenger',
    authMW(),
    getUserDataMW(objRepository),
    renderMW('index'));

    app.get('/spotifyLogin',
    renderMW('index')
    );

}