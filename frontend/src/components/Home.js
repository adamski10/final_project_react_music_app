import React, {Component} from 'react';
import MoodSelector from './MoodSelector';
import Logo from './Logo.js'
import MoodTracker from './MoodTracker.js'
import PlayBar from './PlayBar.js'
import PlayList from './PlayList.js'

class Home extends Component {

    constructor(props) {
        super(props);
        this.test = this.test.bind(this)
    }

    componentDidMount() {
        this.props.handleLoggedIn();
    }

    // handleMoodCaptured(mood) {
    //     this.props.setTracks(mood);
    // }
    test() {
        this.props.handleSetTracks();
    }

    render() {
        return (
            <div className="home">
                <Logo />
                <button onClick={this.test}>Heeeey</button>
                <MoodSelector updateMoodCaptured={this.handleMoodCaptured}/>
                <PlayBar />
                <PlayList />
            </div>
        )
        }

}

export default Home;