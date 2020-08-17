import React, {Component} from 'react';
import {ScriptCache} from '../helpers/ScriptCache';

// this is horrible, blame Alex
let context = null

class SpotifyWebPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player: null,
            device_id: null
        }
        new ScriptCache([
            {
                name: "https://sdk.scdn.co/spotify-player.js",
                callback: this.spotifySDKCallback
            }]);
        this.startPlayback = this.startPlayback.bind(this);
        context = this
        // this.spotifySDKCallback = this.spotifySDKCallback.bind(this);
    }

    spotifySDKCallback() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQB98kpaWXcHp1kxyTOzZM-fT-JegDWSi773IxEF_prAFfA5HUlKmxuwK6TA12G2qrhlLBa4hPu4xyqJMF6m6dmfcVqg3QR2cue1w7QAlUG4UYhc0cNN8uggIUVHup7WlHV4NOewnoFAOqZEsmcOIL56ohctzM8ERq3A6_ttUH7UuNTiRxNO_CmWIMqWH683sRwevyKLNKhdcqjDS3qhM3noxa7FNKF3p4Ez0bT9mBo5RTtjB4pcV1PVguEReRZoVTVtMxkXRcNreR8cToRgwTibGYEtG1nxD2OoOG34fzY7DaQ';
            const player = new window.Spotify.Player({
              name: 'Web Playback SDK Quick Start Player',
              getOAuthToken: cb => { cb(token); }
            });
            player.addListener('ready', ({ device_id }) => {
                console.log(context);
                context.setState({
                    device_id: device_id
                })
            })
            
            player.connect();
        }
        console.log(this);
    }

    startPlayback() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.device_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer BQB98kpaWXcHp1kxyTOzZM-fT-JegDWSi773IxEF_prAFfA5HUlKmxuwK6TA12G2qrhlLBa4hPu4xyqJMF6m6dmfcVqg3QR2cue1w7QAlUG4UYhc0cNN8uggIUVHup7WlHV4NOewnoFAOqZEsmcOIL56ohctzM8ERq3A6_ttUH7UuNTiRxNO_CmWIMqWH683sRwevyKLNKhdcqjDS3qhM3noxa7FNKF3p4Ez0bT9mBo5RTtjB4pcV1PVguEReRZoVTVtMxkXRcNreR8cToRgwTibGYEtG1nxD2OoOG34fzY7DaQ"
            },
            body: JSON.stringify({
                "uris": ["spotify:track:43LrnQSfEZULp0nRhOqdU3", "spotify:track:5uEnSz3GJbQeI1bEhvzKyb"]
            })
        })
    }

    render() {
        return (
            <>
                <h3>Spotify</h3>
                <button onClick={this.spotifySDKCallback}>Connect</button>
                <button onClick={this.startPlayback}>Play</button>
            </>
        )
    }

}

export default SpotifyWebPlayer;