import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyWebPlayer from '../components/WebPlayer';
import Login from "../components/Login";

class Spicify extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        this.state = {
            tracks: null,
            userToken: params.access_token,
            userSongs: [],
            loggedIn: false,
            valence: 0.5, //the 0.5 is just a random default value for when the page loads, feel free to change
            danciness: 0.5, //the 0.5 is just a random default value for when the page loads, feel free to change
            energy: 0.5, //the 0.5 is just a random default value for when the page loads, feel free to change
            tracks: null,
            emotionApiResponse: {}
        }
        this.setEmotion = this.setEmotion.bind(this)
        this.setSliderValence = this.setSliderValence.bind(this)
        this.setSliderDanciness = this.setSliderDanciness.bind(this)
        this.setSliderEnergy = this.setSliderEnergy.bind(this)
        this.changeLoggedIn = this.changeLoggedIn.bind(this);
        this.filterTracksBasedOnMood = this.filterTracksBasedOnMood.bind(this);
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

    checkIfSongIsWithinRange(song, mood) {
        const delta = 0.1;
        const moodKeys = Object.keys(mood);
        for (const key of moodKeys) {
            if (song[key] <= (mood[key] += delta) && song[key] >= (mood[key] -= delta)) {
                return true
            }
        }
    }

    filterTracksBasedOnMood() {

        const mood = {
            valence: 0.5,
            danceability: 0.4,
            energy: 0.9,
            acousticness: 0.0,
            instrumentalness: 0.0
        };

        this.setState( { tracks: this.state.userSongs.filter(song => {
            if (this.checkIfSongIsWithinRange(song, mood)) {
                return song
            }
        })})
            
    }

    setEmotion(value){
        this.setState({emotionApiResponse: value})
    }
    setSliderValence(value){
        this.setState({valence: value})
    }
    
    setSliderDanciness(value){
        this.setState({danciness: value})
    }

    setSliderEnergy(value){
        this.setState({energy: value})
    }

    render() {
        return (
            <Router>
                <>
                    <SpotifyWebPlayer accessToken={this.state.userToken}></SpotifyWebPlayer>
                    <Route exact path="/" component={Login}/>
                    <Route 
                        path="/spicify"
                        render={() => <Home 
                        handleSetTracks={this.filterTracksBasedOnMood}    
                        handleLoggedIn={this.changeLoggedIn}
                        setSliderValence={this.setSliderValence} 
                                    setSliderDanciness={this.setSliderDanciness}
                                    setSliderEnergy={this.setSliderEnergy}
                                    setEmotion={this.setEmotion} 
                                    emotion={this.state.emotionApiResponse.happiness}
                        />} 
                    />
                </>            
            </Router>
        )
    }
}

export default Spicify;