import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "../components/Login";



class Spicify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valence: null,
            tracks: null,
            userSongs: [],
            loggedIn: false
        }
        this.changeLoggedIn = this.changeLoggedIn.bind(this);
        this.setTracks = this.setTracks.bind(this);
    }

    changeLoggedIn() {
        this.setState({ loggedIn: true })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loggedIn !== this.state.loggedIn) {
            const url = "http://localhost:8080/songs"

            fetch(url)
            .then(res => res.json())
            .then(userSongs => this.setState({ userSongs: userSongs }))
            .catch(err => console.error)
        }
    };

    checkIfSongIsWithinRange(songCategory, moodCategory) {
        const delta = 0.1;
        if (songCategory <= (moodCategory + delta) && songCategory >= (moodCategory - delta)) {
            return true
        }
    }

    setTracks() {

        const mood = {
            valence: 0.5,
            danceability: 0.4,
            energy: 0.9,
            acousticness: 0.0,
            instrumentalness: 0.0
        };

        this.setState({ tracks: this.state.userSongs.filter(song => {
            if (
                this.checkIfSongIsWithinRange(song.valence, mood.valence) && 
                this.checkIfSongIsWithinRange(song.danceability, mood.danceability) &&
                this.checkIfSongIsWithinRange(song.energy, mood.energy) && 
                this.checkIfSongIsWithinRange(song.acousticness, mood.acousticness) && 
                this.checkIfSongIsWithinRange(song.instrumentalness, mood.instrumentalness)
                ) {
                return song
            }
        })})
    }

    render() {
        return (
            <Router>
                <>
                    <Route exact path="/" component={Login}/>
                    <Route 
                        path="/spicify"
                        render={() => <Home 
                        handleLoggedIn={this.changeLoggedIn}
                        handleSetTracks={this.setTracks}
                        />} 
                    />
                </>
            </Router>
        )
    }
}

export default Spicify;