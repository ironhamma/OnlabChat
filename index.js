var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var emoji = require('node-emoji');

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
    var messageInfo = {
            sender : sess.username,
            text : txt
          };
          messageInfo = JSON.stringify(messageInfo);
          io.emit('chat message', messageInfo);//server pakolja rá a dolgokat a kliensnek az üzire
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

/* Spotify Integration */
/****************************************************************/
/****************************************************************/
/****************************************************************/
/****************************************************************/
/****************************************************************/

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: '413f02f1efce4fccaccd0d29b6c85555',
  clientSecret: '6cba98454fde429e8747159316c9200d',
  redirectUri: 'http://bencica.sch.bme.hu:3000/messenger'
});

var scopes = ['playlist-modify-public', 'playlist-modify-private', 'ugc-image-upload', 'user-modify-playback-state', 'user-read-playback-state', 'user-read-currently-playing', 'user-top-read', 'user-read-recently-played'];
          var state = '2';
          


io.on('connection', function(socket){
var authorizeURL = global.authLink;
io.emit('spotifyUrl', authorizeURL);
  
  socket.on('spotifyCode', function(data){
    var code = data.x;
    
    spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );


     });
  
});