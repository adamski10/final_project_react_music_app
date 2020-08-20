import React, {Component} from 'react';
import Script from 'react-load-script';
import previous from '../Images/prev_icon.svg'
import next from '../Images/next_button.svg'
import play from '../Images/play_button.svg'
import pause from '../Images/pause_button.svg'

class SpotifyWebPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            webPlayer: null,
            playerInitialise: null,
            playerResume: null,
            playerPause: null,
            device_id: null,
            volume: null,
            trackUris: null,
            userHasChosenSpecificTrack: null,
            currentTrack: null,
            currentState: null,
            nextTrack: null,
            currentPosition: 0,
            intervalReference: null
        }

        this.handleScriptError = this.handleScriptError.bind(this);
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.setPlayerVolume = this.setPlayerVolume.bind(this);
        this.setPreviousTrack = this.setPreviousTrack.bind(this);
        this.setNextTrack = this.setNextTrack.bind(this);
        this.resumePlayback = this.resumePlayback.bind(this);
        this.pausePlayback = this.pausePlayback.bind(this);
        this.startPlayback = this.startPlayback.bind(this);
        this.handleSelectedContextUri = this.handleSelectedContextUri.bind(this);
        this.getCurrentPlayback = this.getCurrentPlayback.bind(this);
        this.playButtonLogic = this.playButtonLogic.bind(this);
        this.getPlaybackProgress = this.getPlaybackProgress.bind(this);
    }

    handleSelectedContextUri() {
        if (this.props.selectedSongUri) {
            return { "uri": `${this.props.selectedSongUri}` }
            this.getCurrentPlayback();
        }
        return { "position": 0 }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tracks !== this.props.tracks) {
            this.setState( { trackUris: this.props.tracks.map(track => track.uri)})
        }
        if (prevProps.selectedSongUri !== this.props.selectedSongUri) {
            this.startPlayback()
        }
        // if (prevState.currentPosition !== this.state.currentPosition) {
        //     this.getPlaybackProgress()
        // }
    }

    componentDidMount() {
    }

    handleScriptError() {
        console.log("SPOTIFY SDK SCRIPT LOAD ERROR.")
    }

    handleScriptLoad() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log("SCRIPT LOADED")
            const token = this.props.accessToken;
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });
            player.connect();
            this.setState(prevState => {
                return {
                    ...prevState,
                    webPlayer: player
                }
            }, () => {
                console.log("Player connected", this.state.webPlayer)
            })
            player.addListener('ready', ({ device_id }) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        device_id: device_id
                    }
                }, () => {
                    console.log("Device ID loaded", this.state.device_id)
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
            this.getCurrentPlayback();
            this.getPlaybackProgress();
        })
    }

    setNextTrack() {
        this.state.webPlayer.nextTrack()
        .then(() => {
            this.getCurrentPlayback();
            this.getPlaybackProgress();
        })
    }

    resumePlayback() {
        this.state.webPlayer.resume()
        .then(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    playerInitialise: true,
                    playerResume: true,
                    playerPause: false
                }
            }, () => {
                this.getCurrentPlayback();
                this.getPlaybackProgress();
            })
        })
        
    }

    pausePlayback() {
        this.state.webPlayer.pause()
        .then(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    playerInitialise: true,
                    playerResume: false,
                    playerPause: true
                }
            }, () => console.log("Player paused"))
        })
    }

    getPlaybackProgress() { //change name
        if (this.state.playerInitialise) {
            fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Authorization": `Bearer ${this.props.accessToken}`
                }
            })
            .then(res => res.json())
            .then((playback => this.setState({currentPosition: playback.progress_ms})))
            // .then((playback) => {
            //     this.setState(prevState => {
            //         return {
            //             ...prevState,
            //             currentPosition: playback.progress_ms
            //         }
            //     }, () => console.log(this.state.currentPosition))
            // })
        }  
    }

    getCurrentPlayback() { //change name
        if (this.state.playerInitialise || this.state.playerResume) {
            this.state.webPlayer.getCurrentState()
            .then(state => {
                console.log(state)
                const {current_track, next_tracks} = state.track_window
                this.setState(prevState => {
                    return {
                        ...prevState,
                        currentTrack: current_track,
                        currentState: state,
                        nextTrack: next_tracks
                    }
                }) 
            })
        }
    }

    initialiseProgressBar() {
        const intervalReference = setInterval(this.getPlaybackProgress, 1000)
        this.setState({intervalReference: intervalReference})
    }

    componentWillUnmount(){
        console.log("component unmount, interval stopped")
        clearInterval(this.state.intervalReference)
    }

    playButtonLogic() {
        if (!this.state.playerInitialise) {
            this.startPlayback()
            this.initialiseProgressBar();
        }
        else if (this.state.playerPause && this.state.playerInitialise) {
            this.resumePlayback()
        }
        else {
            this.pausePlayback()
        }
    }

    playButtonNameLogic() {
        if (this.state.playerResume) {
            return pause
        }
        if (this.state.playerPause || !this.state.playerInitialise) {
            return play
        }
    }

    startPlayback() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.device_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.accessToken}`
            },
            body: JSON.stringify({
                "uris": this.props.tracks.map(track => track.uri),
                "offset": this.handleSelectedContextUri()
            })
        }).then(() => {
            this.setState((prevState) => {
            return {
                ...prevState,
                playerInitialise: true,
                playerResume: true,
                playerPause: false
            }
        }, () => {
            this.getCurrentPlayback()
            this.getPlaybackProgress();
        })})
        
    }
    render() {
        return (
            <>
                <div className="play_controls_container">
                    <Script 
                        url="https://sdk.scdn.co/spotify-player.js"
                        onCreate={this.handleScriptCreate}
                        onError={this.handleScriptError} 
                        onLoad={this.handleScriptLoad}>
                    </Script>
                    <div className="controls_parent_triplet"></div>
                    <div className="controls_parent_centre">
                        <img className="media_button" src={previous} onClick={this.setPreviousTrack}/>
                        <img className="media_button" src={this.playButtonNameLogic()} onClick={() => {
                            this.playButtonLogic()
                            this.getPlaybackProgress()
                        }}/>
                        <img className="media_button" src={next} onClick={this.setNextTrack}/>
                    </div>
                    <input //seek bar stuff - commented out for now
                        type="range"
                        id="seek-bar"
                        min="0"
                        max={this.state.currentTrack ? this.state.currentTrack.duration_ms : 0}
                        step="0.05"
                        value={this.state.currentPosition}>
                    </input>
                    <div className="controls_parent_triplet">
                        <input 
                            type="range" 
                            id="volume-slider" 
                            min="0" 
                            max="1" 
                            step="0.01"
                            // value={this.state.volume}
                            onChange={this.setPlayerVolume}>
                        </input>
                    </div>
                </div>
            </>
        )
    }

    // render() {
    //     return (
    //         <>
    //             <Script 
    //                 url="https://sdk.scdn.co/spotify-player.js"
    //                 onCreate={this.handleScriptCreate}
    //                 onError={this.handleScriptError} 
    //                 onLoad={this.handleScriptLoad}>
    //             </Script>
    //             <button onClick={this.setPreviousTrack}>Previous</button>
    //             {/* <button onClick={this.playButtonLogic}>
    //                 {this.state.playerPause ? "RESUME" : "PAUSE"}
    //             </button> */}
    //             <input 
    //                 type="image" 
    //                 onClick={() => {
    //                     this.playButtonLogic()
    //                     // this.getPlaybackProgress(); - seek bar stuff - commented out for now
    //                 }} 
    //                 src={this.playButtonNameLogic()}
    //                 width="50"
    //                 height="50">
    //             </input>
    //             {/* <label htmlFor="seek-bar">Seek bar</label> */}
    //             {/* <input //seek bar stuff - commented out for now
    //                 type="range"
    //                 id="seek-bar"
    //                 min="0"
    //                 max={this.state.currentTrack ? `${this.state.currentTrack.duration_ms}` : 0}
    //                 step="0.05"
    //                 value={this.state.currentPosition}
    //                 onInput={this.seekBar()}
    //                 >
    //             </input> */}
    //             <button onClick={this.setNextTrack}>Next</button>
    //             <label htmlFor="volume-slider">Set Volume</label>
    //             <input 
    //                 type="range" 
    //                 id="volume-slider" 
    //                 min="0" 
    //                 max="1" 
    //                 step="0.01"
    //                 // value={this.state.volume}
    //                 onChange={this.setPlayerVolume}>
    //             </input>
    //         </>
    //     )
    // }

}

export default SpotifyWebPlayer;