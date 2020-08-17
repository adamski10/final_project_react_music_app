import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';



class Spicify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valence: null,
            tracks: null,
            emotionApiResponse: null
        }
        this.setEmotion = this.setEmotion.bind(this)
    }

    setEmotion(value){
        this.setState({emotionApiResponse: value})
    }

    render() {
        return (
            <Router>
                <>
                    <Route 
                        path="/spicify"
                        render={() => <Home setEmotion={this.setEmotion}/>} />
                </>
            </Router>
        )
    }
}

export default Spicify;