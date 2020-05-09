module.exports = function (target) {

    return function (req, res, next) {
      res.render(target, res.tpl);
      next();
    };  
  };