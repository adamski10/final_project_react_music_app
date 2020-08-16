const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');
dotenv.config();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const cors = require('cors');
const createRouter = require('./helpers/create_router.js')

//cors and body parser
app.use(cors());
app.use(BodyParser.json({limit: '50mb'}));

//database environment variable
const databaseURL = process.env.DATABASE_URL;

MongoClient.connect(databaseURL)
    .then((client) => {
        const db = client.db('spicify');
    })
    .catch(console.error);

const port = process.env.PORT;


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

const scope = ["user-library-read user-follow-modify user-read-recently-played app-remote-control user-follow-read playlist-read-private user-read-currently-playing\
 user-read-playback-position user-top-read user-library-modify playlist-modify-public user-modify-playback-state playlist-read-collaborative user-read-private user-read-email playlist-modify-private ugc-image-upload user-read-playback-state streaming"]

// const authorizeURL = spotifyApi.createAuthorizeURL(scope);

app.get('/login', (req,res) => {
    const html = spotifyApi.createAuthorizeURL(scope)
    console.log(html)
    res.redirect(html+"&show_dialog=true")  
})

app.get('/', async (req,res) => {
    const { code } = req.query;
    console.log(code)
    try {
      let data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
  
      res.redirect('https://www.google.com');
    } 
    catch(err) {
      res.redirect('/#/error/invalid token');
    }
});

app.get('/playlists', async (req,res) => {
    try {
      let result = await spotifyApi.getUserPlaylists();
      console.log(result.body);
      res.status(200).send(result.body);
    } catch (err) {
      res.status(400).send(err)
    }
  
  });

app.post('/upload', (req, res) => {
  const image = req.body;
  console.log(image);
  res.status(200).send(image)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
