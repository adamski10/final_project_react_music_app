import React from "react";
import "./Track.css"

const Track = (props) => {

    return (
        <div>
            <li>
                <img src={props.image} alt="" className="album-cover"/>
                <div className="track-album-div">
                    <h3 className="title">{props.title}</h3>
                    <h6 className="album">{props.album}</h6>
                </div>
                <h4 className="artist">By {props.artist}</h4>
                
            </li>
        </div>
    )

}

export default Track;