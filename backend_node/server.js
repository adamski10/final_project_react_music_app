const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');
dotenv.config();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const cors = require('cors');
const createRouter = require('./helpers/create_router.js')
const path = require('path');
// import encodeFormData from './helpers/encodeFormData';
const encodeFormData = require('./helpers/encodeFormData');
const queryString = require('querystring');
const fetch = require('node-fetch');
let request = require('request');
const { promises } = require('fs');

//cors and body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(BodyParser.json());

//database environment variable
const databaseURL = process.env.DATABASE_URL;

MongoClient.connect(databaseURL)
    .then((client) => {
        const db = client.db('spicify');
    })
    .catch(console.error);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:8080/"
});

const scope = ["user-library-read user-follow-modify user-read-recently-played app-remote-control user-follow-read playlist-read-private user-read-currently-playing\
 user-read-playback-position user-top-read user-library-modify playlist-modify-public user-modify-playback-state playlist-read-collaborative user-read-private user-read-email playlist-modify-private ugc-image-upload user-read-playback-state streaming"]

// const authorizeURL = spotifyApi.createAuthorizeURL(scope);

app.get('/login', (req,res) => {
    const html = spotifyApi.createAuthorizeURL(scope)
    // console.log(html)
    res.redirect(html+"&show_dialog=true")  
})

app.get('/', async (req,res) => {
    const { code } = req.query;
    try {
      let data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
  
      res.redirect('http://localhost:8080/songs');
    } 
    catch(err) {
      res.redirect('/#/error/invalid token');
    }
});

const convertPromisesToOne = (promises) => {
  return Promise.all(promises)
}

const getAllTracksForPlaylists = (playlists) => {
  return playlists.body.items.map(playlist => {
    return spotifyApi.getPlaylistTracks(playlist.id)
  })
}

//GET LIST OF ALL USER'S SONGS WITH THEIR AUDIO FEATURES
app.get('/songs', (req,res) => {
  try {
    spotifyApi.getUserPlaylists({limit: 50}).catch((e) => {console.log(e.message)})
    .then(getAllTracksForPlaylists)
    .then(convertPromisesToOne)
    .then((playlistTracks) => {
      const trackIds = playlistTracks.map((playlist) => {
        return playlist.body.items.map((playlistItem) => {return playlistItem.track.id})
      }).flat()

      const tracksMoodsPromises = trackIds.map(id => {
        return spotifyApi.getAudioFeaturesForTrack(id)
          .then(result => result.body)
      })

      Promise.all(tracksMoodsPromises)
        .then(tracksMoods => res.json(tracksMoods))
    })

  } catch (err) {
    res.status(400).send(err)
  }
});

app.get('/:id', (req, res) => {
    const token = req.params.id;
    res.json(token);
})

app.get("/refresh_token", (req, res) => {
  spotifyApi.refreshAccessToken().then(
    function(data) {
      console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Could not refresh access token', err);
    }
  );
})

  
