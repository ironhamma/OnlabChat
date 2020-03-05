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
          req.session.username = result.username;
          global.logedInUsers.push({userId: req.session.userId, username: req.session.username});
          res.redirect('/messenger');
          next();
        }
      }
    })

  };
};