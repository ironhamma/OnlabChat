var requireOption = require('../common').requireOption;
const md5 = require('js-md5');

module.exports = function (objRepo) {

    var userModel = requireOption(objRepo, 'userModel');
  
    return function(req, res, next){


        userModel.findOne({ email: req.body.registerEmail }, function(err, result){
          if((err) || (result !== null)){
            res.tpl.error.push('Email already registered!');
            console.log("hiba");
            return next();
          }
          if (req.body.regUser.length < 3) {
            res.tpl.error.push("Username must be at least 3 characters long!");
            console.log("hiba");
            return next();
          }
          if (req.body.regPass.length < 5){
            res.tpl.error.push("Password must be at least 5 characters long!");   
            console.log("hiba");
            return next();
          }
          if(req.body.regPass !== req.body.regRePassword){
            res.tpl.error.push("Passwords must match!");  
            console.log("hiba");
            return next();
          }
          
            console.log("nohiba");
            var newUser = new userModel();
            newUser.username = req.body.regUser;
            newUser.email = req.body.registerEmail;
            console.log(md5(req.body.regPass));
            newUser.password = md5(req.body.regPass);
              
            newUser.save(function (err) {
              res.redirect('/login');
            });
        });
      };
};