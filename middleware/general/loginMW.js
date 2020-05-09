var requireOption = require('../common').requireOption;
const md5 = require('js-md5');


module.exports = function (objRepo) {

  var userModel = requireOption(objRepo, 'userModel');

  return function (req, res, next) {

    userModel.findOne({
      username: req.body.username
    }, function (err, result) {
      if ((err) || !result) {
        res.tpl.error.push('You are not registered as it seems!');
         return next();
      }
      else {
        if (result.password !== md5(req.body.password)) {
          res.tpl.error.push('Wrong password!');
          return next();
        }
        else {
          req.session.userId = result._id;
          req.session.access_token = "";
          req.session.username = result.username;
          var newUser = true;
            
          var usArray = global.logedInUsers;
          console.log(usArray);
          if(usArray.some(item => item.username == result.username)){
            var newUser = false;
          }
          console.log(usArray.some(item => item.username == result.username));
          if(!newUser){
          } else if(newUser){
            global.logedInUsers.push({userId: req.session.userId, username: req.session.username, socketId: ""});
          }
          res.redirect('/messenger');
        }
      }
    })
  };
};