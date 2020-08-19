import React from 'react'
import Track from "./Track"

const PlayList = (props) => {

  if (props.tracks !== null ) {
    const trackNodes = props.tracks.map(track => {
      return (
        <Track
          key={track.id} 
          title={track.name}
          album={track.album.name}
          artist={track.artists[0].name}
          image={track.album.images[2].url}
          uri={track.uri}
          handleSelectedSongUri={props.handleSelectedSongUri}
        />
      )
    })

    return (
      <ul>
        { trackNodes }
      </ul>
    )
  } return null;



}

export default PlayList;