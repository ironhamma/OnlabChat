function requireOption(objRepo, propertyName) {
    if (objRepo && objRepo[propertyName]) {
      return objRepo[propertyName];
    }
    throw new TypeError(propertyName + ' required');
  }
  
  module.exports.requireOption = requireOption;