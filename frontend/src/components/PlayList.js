import React, {Component} from 'react';
import Track from "./Track";
import SavePlaylist from "./SavePlaylist";


class PlayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savePlaylist: false,
      newPlaylist: null
    }
    this.updateSave = this.updateSave.bind(this)
    this.addTracksToPlaylist = this.addTracksToPlaylist.bind(this);
  }

  updateSave() {
    this.setState({ savePlaylist: true })
  }

  handleSavePlaylist(playlistName) {
    fetch(`https://api.spotify.com/v1/users/${this.props.userId}/playlists`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": `${playlistName}`
      })
    }).then(res => res.json()).then(data => this.setState({newPlaylist: data}))
    fetch(`http://localhost:8080/new_playlist/${playlistName}`)
    .then(res => res.json())
    .then(data => console.log(data))
  }
  
  addTracksToPlaylist() {
    console.log("HELLO THERE AHOY ", this.props.accessToken)
    const uriArray = this.props.tracks.map(track => track.uri)
    console.log("HELLO THERE AGAIN, THIS IS AN ARRAY: ", this.props.tracks.map(track => track.uri))
    fetch("https://api.spotify.com/v1/playlists/2eMv4Q5fnpM3ds61IZ8rrF/tracks", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "uris": [ "spotify:track:1VL5suyLzfMm59Gu2O16rq" ]
      })
    })
  }

  render() {
    if (this.props.tracks !== null ) {
      const trackNodes = this.props.tracks.map(track => {
        return (
          <>
          <button onClick={this.addTracksToPlaylist}>CLICK ME FOR FUCKS SAKE</button>
          <Track
            key={track.id} 
            title={track.name}
            album={track.album.name}
            artist={track.artists[0].name}
            image={track.album.images[2].url}
            uri={track.uri}
            handleSelectedSongUri={this.props.handleSelectedSongUri}
          />
          </>
        )
      })
  
      return (
        <>
          <SavePlaylist 
          save={this.state.savePlaylist} 
          handleSave={this.updateSave}
          handleClickSave={this.handleSavePlaylist}
          />
          <ul>
            { trackNodes }
          </ul>
        </>
      )
    } return null;
  }

}

export default PlayList;