import React, {Component} from 'react';
import Script from 'react-load-script';

class SpotifyWebPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            webPlayer: null,
            playerResume: null,
            playerPause: null,
            device_id: null,
            volume: null,
            trackUris: null
        }
        this.handleScriptError = this.handleScriptError.bind(this);
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.setPlayerVolume = this.setPlayerVolume.bind(this);
        this.setPreviousTrack = this.setPreviousTrack.bind(this);
        this.setNextTrack = this.setNextTrack.bind(this);
        this.resumePlayback = this.resumePlayback.bind(this);
        this.pausePlayback = this.pausePlayback.bind(this);
        this.startPlayback = this.startPlayback.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tracks != this.props.tracks) {
            this.setState( { trackUris: this.props.tracks.map(track => track.uri)})
        }
    }

    handleScriptError() {
        console.log("SPICY. GTFO, NERD.")
    }

    handleScriptLoad() {
        window.onSpotifyWebPlaybackSDKReady = () => {
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
                this.setState({
                    device_id: device_id
                })
            })  
        }
    }

    setPlayerVolume(volume) {
        this.state.webPlayer.setVolume(volume.target.value);
        this.setState({
            volume: volume.target.value
        })
    }

    setPreviousTrack() {
        this.state.webPlayer.previousTrack()
        .then(() => {
            console.log("Previous track")
        })
    }

    setNextTrack() {
        this.state.webPlayer.nextTrack()
        .then(() => {
            console.log("Set to next track")
        })
    }

    resumePlayback() {
        this.state.webPlayer.resume()
        .then(() => {
            this.setState({
                playerPause: false
            })
        })
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
                "uris": this.state.trackUris
            })
        })
        this.setState({
            playerPause: false
        })
    }

    render() {
        return (
            <>
                <Script 
                    url="https://sdk.scdn.co/spotify-player.js"
                    onCreate={this.handleScriptCreate}
                    onError={this.handleScriptError} 
                    onLoad={this.handleScriptLoad}>
                </Script>
                <button onClick={this.setPreviousTrack}>Previous</button>
                <button onClick={() => {
                    if (!this.state.playerPause) {
                        this.pausePlayback()
                    }
                    else {
                          this.resumePlayback()
                    }
                }}>
                    {this.state.playerPause ? "CAUSE I'M HAVING A GOOD TIME" : "DON'T STOP ME NOW"}
                </button>
                <button onClick={this.setNextTrack}>Next</button>
                <button onClick={this.startPlayback}>HIT ME BABY ONE MORE TIME</button>
                <label htmlFor="volume-slider">Set Volume</label>
                <input 
                    type="range" 
                    id="volume-slider" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    // value={this.state.volume}
                    onChange={this.setPlayerVolume}>
                </input>
            </>
        )
    }

}

export default SpotifyWebPlayer;