import React, {Component} from 'react';
import Script from 'react-load-script';

class SpotifyWebPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            webPlayer: null,
            playerResume: null,
            playerPause: null,
            device_id: null
        }
        this.handleScriptError = this.handleScriptError.bind(this);
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.pausePlayback = this.pausePlayback.bind(this);
        this.startPlayback = this.startPlayback.bind(this);
    }

    handleScriptError() {
        console.log("GTFO, NERD")
    }

    handleScriptLoad() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log(this)
            const token = this.props.accessToken;
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });
            player.connect();
            this.setState({
                webPlayer: player
            })
            player.addListener('ready', ({ device_id }) => {
                // console.log(device_id)
                // this.props.handleDeviceId(device_id)
                this.setState({
                    device_id: device_id
                })
            })  
        }
    }

    pausePlayback() {
        this.state.webPlayer.pause()
        .then(() => {
            this.setState({
                playerPause: true
            })
        })
    }

    startPlayback() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.device_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.accessToken}`
            },
            body: JSON.stringify({
                "uris": ["spotify:track:43LrnQSfEZULp0nRhOqdU3", "spotify:track:5uEnSz3GJbQeI1bEhvzKyb", "spotify:track:0cJZTQ1x6ko3gbtoLKaoQe", "spotify:track:1ZUsnvMUqF0uJkhhjZlvcY"]
            })
        })
    }

    render() {
        return (
            <>
                <Script 
                    url="https://sdk.scdn.co/spotify-player.js"
                    onCreate={this.handleScriptCreate}
                    onError={this.handleScriptError} 
                    onLoad={this.handleScriptLoad}
                />
                <button onClick={this.pausePlayback}>DON'T STOP ME NOW</button>
                <button onClick={this.startPlayback}>HIT ME BABY ONE MORE TIME</button>
            </>
        )
    }

}

export default SpotifyWebPlayer;