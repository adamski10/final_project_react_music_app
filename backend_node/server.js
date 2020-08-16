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
    redirectUri: "http://localhost:3000/pleasework"
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

// app.get('/pleasework', (req, res) => {
//     let body1 = {
//         grant_type: "authorization_code",
//         code: req.query.code,
//         redirect_uri: "http://localhost:3000/pleasework",
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET
//     }
//     let access_token = ""
//     let refresh_token = ""
//     try {
//         fetch('https://accounts.spotify.com/api/token', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Accept": "application/json"
//             },
//             body: encodeFormData(body1)
//             // body: "grant_type=authorization_code&code=AQANCCNbzmn_YmW9rZfJo8BmCXRfBf1cU3gwXz7X0R4jG9n8xl7IEIdrWtsBq7FasQM6v5s-qS4dSdJ08BVdP9RuFZ_IJfF5vBhP8HhFgdntrU8mRER1RxJqC_lp_mHkSkpsAYfHLUu1mmZ0RXax2LN5C7Ygo9alEIgZ3cPLCjd-X5uhFvALG39da8rGYKlMYNP1jFPXl9Kg2-JDFyZ8hr1fM_81U-hvM606_8eglI6CYHfFROsM-i_qMcMW9Bdc-ce73knRrXMfUhW8aRw5fpwqrHWU2udoQIx_1QAbnBEZICH2zDJzjMhKEG1PD9ANGqLYNYvbbynZ6Nia6IsuS2wkJkWxQ-8QakXmzmXycxH09aHmIDVPE-zOxeGBhNuHQLuc9pzz6g4q9BL4IGjeEnfXxG0-iTWIKAUg5blcvl-cOEmD6jOzj9GjRIWQb8jhKZ-BTSOkhPsa3G287GkETbaqOdaxNsEpjEDzdsPWD4p9-PraCCjcbWKhvRhbaSClssFKwhlf1Tucu_qTJUS6Dmd-wGlgrWDNIMnWWe_etX6A_U1hoQB19n9zYpx-yndLZPjF1-2liBBMnYrIThaMnRGFjthLHd0fkEonwRhGi3-q5UPKlEFtDkiYUCchRQGfVAE4LwTlkeri6FfvgM99CFHwhlCCRX4EKuJ2W9n01_l6noyVSn3paWeHKXJrg5dWKaquAX87rRvwtfgO8WL05JwuU5rOAQ&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fpleasework&client_id=e4a55fa02520413487ad8a7abec7bce3&client_secret=f84d9789927240d8b2e3a24f92809306"
//         })
//         .then(res => res.json())
//         .then(data => {
//             access_token = data.access_token;
//             refresh_token = data.refresh_token;
//             console.log(access_token);
//             console.log(refresh_token);
//             let query = queryString.stringify(data);
//             // res.redirect(`http://localhost:3000/${query}`);
//             res.json(data)
//         })
//     } catch (err) {
//         res.status(400).send(err) 
//     }
// })

app.get('/pleasework', (req, res) => {
    const code = req.query.code;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
    
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
    
          let access_token = body.access_token,
              refresh_token = body.refresh_token;
    
          let options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
    
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
            res.json(body);
          });
    
        //   we can also pass the token to the browser to make requests from there
        //   res.redirect('/#' +
        //     queryString.stringify({
        //       access_token: access_token,
        //       refresh_token: refresh_token
        //     }));
        } 
        // else {
        //   res.redirect('/#' +
        //     queryString.stringify({
        //       error: 'invalid_token'
        //     }));
        // }
      });
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

// app.get('/:id', (req, res) => {
//     const token = req.params.id;
//     res.send(token);
// })

  
