module.exports = function (target) {

    return function (req, res, next) {
      res.redirect(target);
      next();
    };
  };