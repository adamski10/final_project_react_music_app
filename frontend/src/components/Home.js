import React from 'react';
import MoodSelector from './MoodSelector';
import Logo from './Logo.js'
import MoodTracker from './MoodTracker.js'
import PlayBar from './PlayBar.js'
import PlayList from './PlayList.js'

const Home = (props) => {

    return (
        <div className="home">
            <Logo />
            <MoodSelector setEmotion={props.setEmotion}/>
            <PlayBar />
            <PlayList />
        </div>
    )

}

export default Home;