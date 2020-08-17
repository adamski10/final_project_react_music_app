import React, {Component} from 'react';
import {ScriptCache} from '../helpers/ScriptCache';

class SpotifyWebPlayer extends Component {

    constructor(props) {
        super(props)
        new ScriptCache([
            {
                name: "https://sdk.scdn.co/spotify-player.js",
                callback: this.spotifySDKCallback
            }]);
    }

    spotifySDKCallback() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = this.accessToken;
            const player = new window.Spotify.Player({
              name: 'Web Playback SDK Quick Start Player',
              getOAuthToken: cb => { cb(token); }
            });
        player.connect();
        }
    }

    render() {
        return (
            <h3>Spotify</h3>
        )
    }

}

export default SpotifyWebPlayer;