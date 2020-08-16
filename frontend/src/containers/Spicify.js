import React, {Component} from 'react';
import MoodSelector from '../components/MoodSelector';

class Spicify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moodValence: null
        }
    }

    setMood(newValence) {
        
    }

    render() {
        return (
            <MoodSelector valence={this.state.moodValence} />
        )
    }
        
    

}

export default Spicify;