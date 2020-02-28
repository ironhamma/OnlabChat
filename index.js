var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');

mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(helmet());
app.set('view engine', 'ejs'); 

/*var sanyi = new User({ name: 'Sanyi', pw: 'asd1234'});
sanyi.save(function(err){
  console.log("rawr");
});*/

app.use(session({
  secret: 'desktop monkey',
  cookie: {
    maxAge: 60000
  },
  resave: true,
  saveUninitialized: false
}));
app.use('/static', express.static('static'));

app.use(function (req, res, next){
  res.tpl = {};
  res.tpl.error = [];
  next();
});

require('./routes/general_route')(app);


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
io.on('connection', function(socket){
        socket.on('chat message', function(msg){
          console.log('message: ' + msg);
        });
      });
socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
