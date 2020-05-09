var requireOption = require('../common').requireOption;

module.exports = function (objRepo) {
  var userModel = requireOption(objRepo, 'userModel');

      return function (req, res, next) {
        userModel.findOne({_id: req.session.userId}, function(err, obj){
          res.tpl.userObj = obj;
          res.tpl.sessID = req.session.userId;
          res.tpl.users = logedInUsers;
          next();
        });
    };  
  };