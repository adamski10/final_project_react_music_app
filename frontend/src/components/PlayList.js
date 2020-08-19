import React, {Component} from 'react';
import Track from "./Track";
import SavePlaylist from "./SavePlaylist";


class PlayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savePlaylist: false
    }
    this.updateSave = this.updateSave.bind(this)
  }

  updateSave() {
    this.setState({ savePlaylist: true })
  }

  render() {
    if (this.props.tracks !== null ) {
      const trackNodes = this.props.tracks.map(track => {
        return (
          <Track
            key={track.id} 
            title={track.name}
            album={track.album.name}
            artist={track.artists[0].name}
            image={track.album.images[2].url}
            uri={track.uri}
            handleSelectedSongUri={this.props.handleSelectedSongUri}
          />
        )
      })
  
      return (
        <>
          <SavePlaylist save={this.state.savePlaylist} handleSave={this.updateSave}/>
          <ul>
            { trackNodes }
          </ul>
        </>
      )
    } return null;
  }

}

export default PlayList;