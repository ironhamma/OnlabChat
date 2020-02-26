module.exports = function (target) {

    return function (req, res, next) {
      res.redirect('/static/html/login.html');
      next();
    };
  };