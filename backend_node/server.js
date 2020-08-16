const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');
dotenv.config();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const cors = require('cors');
const createRouter = require('./helpers/create_router.js')
const axios = require('axios');
const atob = require('atob');
const Blob = require("cross-blob");


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

app.post('/upload', async (req, result) => {
  const  {postData}  = req.body;
  
  //our azure key (will be moved to back-end)
  const subscriptionKey = '93ecc4bb25084ec184cce4d68f0869ae';

  //our azure endpoint (will be moved to back-end)
  const url = 'https://spicifytest.cognitiveservices.azure.com/face/v1.0/detect';

  //this is the function that makes the Azure Face API call
  const callCognitiveApi = (data) => {
    const config = {
        // application/octet-stream is a format to stream an image blob 
        headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': subscriptionKey },
        // these are the Azure params 
        params : {
            returnFaceId: true,
            returnFaceLandmarks: false,
            //we can add more to these like sex, age etc
            returnFaceAttributes: 'emotion'
            }
        };
       const response = axios
            .post(url, data, config)
            .then((res) => {
              result.status(200).json(res.data[0].faceAttributes.emotion);
              console.log(res);
              console.log(res.data[0].faceAttributes.emotion)
            })
            .catch((error) => {
              result.status(200).send(error);
              console.error(error);
            });
  };
  //This function converts base64 encoded image to a blob (binary large blob)
  const b64toBlob = (b64DataStr, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64DataStr);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  //we split the imageSrc so we can just get at the image data (at index 1), we're not interested in the metadata (at index 0)
  const splitImageSrc = postData.split(',');
  const blob = b64toBlob(splitImageSrc[1]);

  // arrayBuffer() returns a promise that waits for the blob to stream as an arrayBuffer to Axios's post request
  const buffer = await blob.arrayBuffer();

  callCognitiveApi(buffer);
  
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
