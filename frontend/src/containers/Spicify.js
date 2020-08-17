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

    }

    changeLoggedIn() {
        this.setState({ loggedIn: true })
    }

    //Will fetch from backend once logged in
    componentDidUpdate(prevProps, prevState) {
        if (prevState.loggedIn !== this.state.loggedIn) {
            const url = "http://localhost:8080/songs"

            fetch(url)
            .then(res => res.json())
            .then(userSongs => this.setState({ userSongs: userSongs }))
            .catch(err => console.error)
        }
    };

    render() {
        return (
            <Router>
                <>
                    <Route exact path="/" component={Login}/>
                    <Route 
                        path="/spicify"
                        render={() => <Home handleLoggedIn={this.changeLoggedIn}/>} />
                </>
            </Router>
        )
    }
}

export default Spicify;