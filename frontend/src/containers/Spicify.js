import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyApiContext } from 'react-spotify-api';

class Spicify extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        console.log(params.access_token);
        this.state = {
            valence: null,
            tracks: null,
            userToken: params.access_token
        }
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
                    <Route 
                        path="/spicify"
                        render={() => <Home />} />
                </>
            </Router>
        )
    }
}

export default Spicify;