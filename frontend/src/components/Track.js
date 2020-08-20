import React, {Component} from "react";
import "./Track.css"
import PlayIcon from "../Images/play_transparent.png"

class Track extends Component {

    constructor(props) {
        super(props)
        this.handleSongSelection = this.handleSongSelection.bind(this)
    }

    handleSongSelection() {
        console.log(this.props.uri)
        this.props.handleSelectedSongUri(this.props.uri)
    }

    render() {
        return (
            <>
                
                <div className="list-item">
                    <div className="track-play-wrapper">
                        <img className="track-play-button"  onClick={this.handleSongSelection} src={PlayIcon}/>
                    </div>
                    <img className="album-cover" src={this.props.image} alt="" />
                    <h4 className="title">{this.props.title}</h4>
                    <h6 className="album">{this.props.album}</h6>
                    <h5 className="artist">By {this.props.artist}</h5> 
                </div>
            </>
        )
    }
}

export default Track;