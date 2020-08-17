import React, {Component} from 'react';
import MoodSelector from './MoodSelector';
import Logo from './Logo.js'
import MoodTracker from './MoodTracker.js'
import PlayBar from './PlayBar.js'
import PlayList from './PlayList.js'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.handleLoggedIn();
    }

    render() {
        return (
            <div className="home">
                <Logo />
                <MoodSelector />
                <PlayBar />
                <PlayList />
            </div>
        )
        }

}

export default Home;