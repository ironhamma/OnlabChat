var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var emoji = require('node-emoji');
var cv = require('opencv4nodejs');

mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(helmet());
app.set('view engine', 'ejs'); 

function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

app.use(session({
  secret: 'desktop monkey',
  cookie: {
    maxAge: 60000
  },
  resave: true,
  saveUninitialized: false
}));
app.use('/static', express.static('static'));

global.logedInUsers = new Array();

app.use(function (req, res, next){
  res.tpl = {};
  res.tpl.error = [];
  next();
});

require('./routes/general_route')(app);

io.on('connection', function(socket){
  users = [];
  for (let i = 0; i < logedInUsers.length; i++) {
    users.push(logedInUsers[i]['username']);          
  }
  io.emit('user connected',users);
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

socket.on('chat message', function(msg){
  var decoded = JSON.parse(msg);
  var sess = logedInUsers.find(o => o.userId == decoded.sessID);
  if(decoded.text != "")
    {
    var txt = emoji.emojify(escapeHtml(decoded.text));
    var txt2 = emoji.replace(txt, (emojiEl) => `${'<div class="emojiInText">'+emojiEl.emoji+'</div>'}`);
    var messageInfo = {
            sender : sess.username,
            text : txt2
          };
          messageInfo = JSON.stringify(messageInfo);
          io.emit('chat message', messageInfo);//server pakolja rá a dolgokat a kliensnek az üzire
    }
  });

  socket.on('image',function(data){
    socket.broadcast.emit('image', data);
  });  

  socket.on('videoId', function(data){
    //var ytLink = 'https://www.youtube.com/embed/' + data + '?enablejsapi=1';
    //console.log(ytLink);
    io.emit('videoId',data);
  })

  socket.on('ytPlay',function(data){
    io.emit('ytPlay',data);
    console.log(data);
  });
  
  socket.on('ytStop', function(data){
    io.emit('ytStop',data);
    console.log(data);
  });

});
















http.listen(3000, function(){
  console.log('listening on *:3000');
});

/* Spotify Integration */
