import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Spicify extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Home />
        )
    }
}

export default Spicify;