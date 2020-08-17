import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SpotifyWebPlayer from '../components/WebPlayer';

class Spicify extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        console.log("HI HERE I AM ", token)
        console.log(params);
        this.state = {
            valence: null,
            playlists: null,
            playlistTracks: null,
            tracks: null,
            userToken: params.access_token,
            userId: null
        }
        this.fetchMyPlaylists = this.fetchMyPlaylists.bind(this);
        this.fetchMyPlaylistTracks = this.fetchMyPlaylistTracks.bind(this);
        this.fetchMyTracks = this.fetchMyTracks.bind(this);
    }

    fetchMyPlaylists() {
        const baseUrl = `http://localhost:8080/playlists/${this.state.userToken}`
        fetch(baseUrl)
        .then(res => res.json())
        .then(data => this.setState({
            playlists: data
        }))
        console.log(this.state.playlists)
    }

    fetchMyPlaylistTracks() {
        const promises = this.state.playlists.items.map((playlist) => {
            return fetch(`http://localhost:8080/playlists/${playlist.id}/${this.state.userToken}`)
                .then(res => res.json());
            });

        Promise.all(promises)
            .then((results) => {
                this.setState({
                    playlistTracks: results
                })
            })
        
        console.log(this.state.playlistTracks);
    }

    fetchMyTracks() {
        const promises = this.state.playlistTracks.map((playlist) => {
            return playlist.items.map((tracks) => {
                // console.log(tracks)
                return fetch(`http://localhost:8080/track/audio_features/${tracks.track.id}/${this.state.userToken}`).then(res => res.json())
            })
        })

        Promise.all(promises)
            .then((results) => {
                this.setState({
                    tracks: results
                })
            })
        console.log(this.state.tracks);
    }

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      }

    render() {
        return (
            <Router>
                <>
                    <SpotifyWebPlayer accessToken={this.state.userToken}></SpotifyWebPlayer>
                    <button onClick={this.fetchMyPlaylists}>PLAYLISTS</button>
                    <button onClick={this.fetchMyPlaylistTracks}>PLAYLIST TRACKS</button>
                    <button onClick={this.fetchMyTracks}>TRACK FEATURES</button>
                    <Route 
                        path="/spicify"
                        render={() => <Home />} />
                </>
            </Router>
        )
    }
}

export default Spicify;