var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AG11M9', {useNewUrlParser: true});

module.exports = mongoose;