var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');

mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(helmet());
app.set('view engine', 'ejs'); 


var User = mongoose.model('User', {name: String, pw: String});
/*var sanyi = new User({ name: 'Sanyi', pw: 'asd1234'});
sanyi.save(function(err){
  console.log("rawr");
});*/

app.use('/static', express.static('static'));
require('./routes/general_route')(app);
/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/html/index.html');
  });

app.get('/login',function(req, res){
  res.sendFile(__dirname + '/static/html/login.html');
});
*/
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
