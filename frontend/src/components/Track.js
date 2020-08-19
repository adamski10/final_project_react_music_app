import React, {Component} from "react";
import "./Track.css"
import PlayIcon from "../Images/play_transparent.png"

class Track extends Component {

    constructor(props) {
        super(props)
        this.handleSongSelection = this.handleSongSelection.bind(this)
    }

    handleSongSelection(event) {
        console.log(event.target.value)
        this.props.handleSelectedSongUri(event.target.value)
    }

    render() {
        return (
            <>
                
                <div className="list-item">
                    <div className="track-play-wrapper">
                        <button className="track-play-button" value={this.props.uri} onClick={this.handleSongSelection}><img src={PlayIcon}/></button>
                    </div>
                    <img className="album-cover" src={this.props.image} alt="" />
                    <h3 className="title">{this.props.title}</h3>
                    <h6 className="album">{this.props.album}</h6>
                    <h4 className="artist">By {this.props.artist}</h4> 
                </div>
            </>
        )
    }
}

export default Track;