import React, {Component} from "react";
import "./Track.css"

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
            <div>
                <li>
                    <button className="track-play-button" value={this.props.uri} onClick={this.handleSongSelection}></button>
                    <img src={this.props.image} alt="" className="album-cover"/>
                    <div className="track-album-div">
                        <h3 className="title">{this.props.title}</h3>
                        <h6 className="album">{this.props.album}</h6>
                    </div>
                    <h4 className="artist">By {this.props.artist}</h4>
                    
                </li>
            </div>
        )
    }
}

export default Track;