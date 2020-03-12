var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function (objectrepository) {

    return function (req, res, next) {
      
        var spotifyApi = new SpotifyWebApi({
            clientId: '413f02f1efce4fccaccd0d29b6c85555',
            clientSecret: '6cba98454fde429e8747159316c9200d',
            redirectUri: 'http://bencica.sch.bme.hu:3000/messenger'
          });

          var scopes = ['playlist-modify-public', 'playlist-modify-private','app-remote-control','streaming'];
          var state = '202';
          var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
          global.authLink = authorizeURL;

      return next();
    };
}