module.exports = function (objectrepository) {

    return function (req, res, next) {
      if (typeof req.session.userId === 'undefined') {
        return res.redirect('/');
      }
      return next();
    };
  
  };