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
            const token = 'BQBkGDSx9WwYv3jjq8NpiGrujtfT5ZBtipsQ7YcAomE874R8Log5fpe1rBuxiNmRn0QEhJFIYxmAwjnWkpPzJ2d-sMQXew2KU8wcVoIzqtfx30tAz_Ss9jwp1yUNmoxR7XCqJDBEs7NObtM9DWjcplntR74o__IHcytU_OpYuqJptK_b5eyT1TgZt7sKa99JpJB1czIDce8Tn9qlrk0V6zxraAKB0vGuupqGiA31P1x3bxmJ9RoEALA5U55eyE6KCNghCYBknK6WQhB-rzhMmK-QNLmgaCdUtPFDtH_yFqKRVO8';
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