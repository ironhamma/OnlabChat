var requireOption = require('../common').requireOption;


module.exports = function (objRepo) {

  var userModel = requireOption(objRepo, 'userModel');

  return function (req, res, next) {

    userModel.findOne({
      username: req.body.username
    }, function (err, result) {
      if ((err) || !result) {
        res.status(403).send('/login');
        next();
      }
      else {
        if (result.password !== req.body.password) {
          res.status(403).send('/login');
          next();
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
            global.logedInUsers.push({userId: req.session.userId, username: req.session.username});
          }
          console.log(global.logedInUsers);
          res.redirect('/messenger');
          next();
        }
      }
    })

  };
};