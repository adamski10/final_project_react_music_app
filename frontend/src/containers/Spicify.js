import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Spicify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valence: null
        }
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