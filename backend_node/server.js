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
    redirectUri: process.env.REDIRECT_URI
});

const scope = ["user-library-read user-follow-modify user-read-recently-played app-remote-control user-follow-read playlist-read-private user-read-currently-playing\
 user-read-playback-position user-top-read user-library-modify playlist-modify-public user-modify-playback-state playlist-read-collaborative user-read-private user-read-email playlist-modify-private ugc-image-upload user-read-playback-state streaming"]

// const authorizeURL = spotifyApi.createAuthorizeURL(scope);

app.get('/login', (req,res) => {
    const html = spotifyApi.createAuthorizeURL(scope)
    // console.log(html)
    res.redirect(html+"&show_dialog=true")  
})

// app.get('/', async (req,res) => {
//     const { code } = req.query;
//     console.log(code)
//     try {
//       let data = await spotifyApi.authorizationCodeGrant(code)
//       const { access_token, refresh_token } = data.body;
//       spotifyApi.setAccessToken(access_token);
//       spotifyApi.setRefreshToken(refresh_token);
  
//       res.redirect('http://localhost:3001/spicify');
//     } 
//     catch(err) {
//       res.redirect('/#/error/invalid token');
//     }
// });

app.get('/', (req, res) => {
    let body1 = {
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
    let access_token = ""
    let refresh_token = ""
    try {
        fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: encodeFormData(body1)
        })
        .then(res => res.json())
        .then(data => {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
            console.log(access_token);
            console.log(refresh_token);
            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);
            let query = queryString.stringify(data);
            res.redirect(`http://localhost:3000/#${query}`);
            // res.json(data)
        })
    } catch (err) {
        res.status(400).send(err) 
    }
})

app.get('/playlists', async (req,res) => {
    try {
      let result = await spotifyApi.getUserPlaylists();
    //   console.log(result.body);
      res.status(200).send(result.body);
    } catch (err) {
      res.status(400).send(err)
    }
});

app.get("/playlists/:token", async (req, res) => {
  await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  })
  .then(response => response.json())
  .then(data => res.json(data))
})

app.get("/playlists/:playlistid/:token", async (req, res) => {
  await fetch(`https://api.spotify.com/v1/playlists/${req.params.playlistid}/tracks`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  })
  .then(response => response.json())
  .then(data => res.json(data))
})

app.get("/user/:userid/:token", async (req, res) => {
  await fetch(`https://api.spotify.com/v1/users/${req.params.userid}`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  })
  .then(response => response.json())
  .then(data => res.json(data))
})

app.get("/track/:trackid/:token", async (req, res) => {
  await fetch(`https://api.spotify.com/v1/tracks/${req.params.trackid}`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  })
  .then(response => response.json())
  .then(data => res.json(data))
})

app.get("/track/audio_features/:trackid/:token", async (req, res) => {
  await fetch(`https://api.spotify.com/v1/audio-features/${req.params.trackid}`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  })
  .then(response => response.json())
  .then(data => res.json(data))
})


app.get('/:id', (req, res) => {
    const token = req.params.id;
    res.json(token);
})

  
