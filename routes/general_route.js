var redirectMW = require('../middleware/general/redirect');
var loginMW = require('../middleware/general/loginMW');
var renderMW = require('../middleware/general/render')

module.exports = function (app) {

    /*var objRepository = {
        userModel : userModel
    };
    */

    app.get('/',
        redirectMW('/login'));

    app.get('/login',
        renderMW('login'));

}