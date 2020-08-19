import React, {Component} from 'react';
import MoodSelector from './MoodSelector';
import Logo from './Logo.js';
import MoodTracker from './MoodTracker.js';
import PlayBar from './PlayBar.js';
import PlayList from './PlayList.js';
import SpotifyWebPlayer from './WebPlayer';

class Home extends Component {

    constructor(props) {
        super(props);
        this.handleGeneratePlaylist = this.handleGeneratePlaylist.bind(this)
    }

    componentDidMount() {
        this.props.handleLoggedIn();
    }

    handleGeneratePlaylist() {
        this.props.handleSetTracks();
    }

    render() {
        return (
            <div className="home">
                <Logo />
                <MoodSelector 
                setSliderValence={this.props.setSliderValence} 
                setEmotion={this.props.setEmotion} 
                emotion={this.props.emotion}
                setSliderDanciness={this.props.setSliderDanciness}
                setSliderEnergy={this.props.setSliderEnergy}
                />
                <button onClick={this.handleGeneratePlaylist}>Generate Playlist</button>
                <SpotifyWebPlayer
                    selectedSongUri={this.props.selectedSongUri}
                    accessToken={this.props.accessToken}
                    tracks={this.props.tracks}
                />
                <PlayList userId={this.props.userId} accessToken={this.props.accessToken} handleSelectedSongUri={this.props.handleSelectedSongUri} tracks={this.props.tracks}/>
            </div>
        )
        }

}

export default Home;