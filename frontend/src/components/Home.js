import React, {Component} from 'react';
import MoodSelector from './MoodSelector';
import LogoHome from './Logo.js';
import MoodTracker from './MoodTracker.js';
import PlayBar from './PlayBar.js';
import PlayList from './PlayList.js';
import SpotifyWebPlayer from './WebPlayer';
import mygif2003 from '../Images/coffee.gif';
import "./Home.css"

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
        this.handleGeneratePlaylist = this.handleGeneratePlaylist.bind(this)
        // this.play = this.play.bind(this)
        // this.pause = this.pause.bind(this)
        // this.playPause = this.playPause.bind(this)
    }

    componentDidMount() {
        this.props.handleLoggedIn();
        
    }

    // componentDidUpdate(prevState){
    //     if(prevState.isPlaying === false){
    //         this.pause()
    //         this.play()
    //     }
    // }

    // play(){
    //     const song = new Audio(Song)
    //     song.play()
    //     this.setState({
    //         isPlaying: true
    //     })
    // }

    // pause(){
    //     this.setState({
    //         isPlaying: false
    //     })
    // }

    // playPause() {
        
    //     if(this.state.isPlaying == false){
    //         this.play()
    //     }else{
    //         this.pause()
    //     }
        
    // }

    handleGeneratePlaylist() {
        this.props.handleSetTracks();
    }

    

    

    render() {
        return (
            <div className="home">
                <LogoHome id="logo-home"/>
                <MoodSelector 
                setSliderValence={this.props.setSliderValence} 
                setEmotion={this.props.setEmotion} 
                emotion={this.props.emotion}
                setSliderDanciness={this.props.setSliderDanciness}
                setSliderEnergy={this.props.setSliderEnergy}
                />
                <div className="button-wrap">
                    <button className="generate-button" onClick={this.handleGeneratePlaylist}>Generate Playlist</button>
                </div>
                <SpotifyWebPlayer
                    selectedSongUri={this.props.selectedSongUri}
                    accessToken={this.props.accessToken}
                    tracks={this.props.tracks}
                />
                <PlayList handleSelectedSongUri={this.props.handleSelectedSongUri} tracks={this.props.tracks}/>
                <div className="secret">
                    <div id="hovershow1" className='coffee_gif'>
                    { <img onClick={this.playPause} src={mygif2003}/> }
                    </div>
                </div>
            </div>
        )
        }

}

export default Home;
