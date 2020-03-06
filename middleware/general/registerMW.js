var requireOption = require('../common').requireOption;

module.exports = function (objRepo) {

    var userModel = requireOption(objRepo, 'userModel');
  
    return function(req, res, next){


        userModel.findOne({ email: req.body.registerEmail }, function(err, result){
          if((err) || (result !== null)){
            return res.status(403).send("email");
          }
          if (req.body.regUser.length < 3) {
            return res.status(403).send("user");
          }
          if (req.body.regPass.length < 5 || req.body.regPass !== req.body.regRePassword){
            return res.status(403).send("pass");    
          }
          else{

          var newUser = new userModel();
          newUser.username = req.body.regUser;
          newUser.email = req.body.registerEmail;
          newUser.password = req.body.regPass;
          newUser.save(function (err) {
            //redirect to /login
            //return res.send('/events/list/');
            next();
          });
        }});
      };
};