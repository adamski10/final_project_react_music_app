import React, {Component} from 'react';
import Home from '../components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';



class Spicify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valence: null,
            danciness: null,
            tracks: null,
            energy: null,
            emotionApiResponse: {}
        }
        this.setEmotion = this.setEmotion.bind(this)
        this.setSliderValence = this.setSliderValence.bind(this)
        this.setSliderDanciness = this.setSliderDanciness.bind(this)
        this.setSliderEnergy = this.setSliderEnergy.bind(this)
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
                
                    <Route 
                        path="/spicify"
                        render={() => <Home 
                                    setSliderValence={this.setSliderValence} 
                                    setSliderDanciness={this.setSliderDanciness}
                                    setSliderEnergy={this.setSliderEnergy}
                                    setEmotion={this.setEmotion} 
                                    emotion={this.state.emotionApiResponse.happiness} 
                                />}
                        />
                    
                
            </Router>
        )
    }
}

export default Spicify;