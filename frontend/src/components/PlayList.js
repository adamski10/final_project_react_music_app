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
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this)
    this.saveTracksToPlaylist = this.saveTracksToPlaylist.bind(this)
  }

  updateSave() {
    this.setState({ savePlaylist: true })
  }

  saveTracksToPlaylist() {
    const trackUris = this.props.tracks.map(track => track.uri)
    console.log(trackUris);
    fetch(`http://localhost:8080/add_to_playlist/${this.state.newPlaylist.body.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({trackUris})
    })
    .then(res => res.json())
    .then(tracks => console.log("Success!"))
  }

  handleSavePlaylist(playlistName) {

    fetch(`http://localhost:8080/new_playlist/${playlistName}`)
    .then(res => res.json())
    .then(newPlaylist => {
      // this.setState({ newPlaylist: newPlaylist})
      this.setState(prevState => {
        return {
          ...prevState,
          newPlaylist: newPlaylist
        }
      }, () => {
        this.saveTracksToPlaylist()
      })
    })
    // .then(() => {
      // const trackUris = this.props.tracks.map(track => track.uri)
      // fetch(`http://localhost:8080/add_to_playlist/${this.state.newPlaylist.body.id}/${trackUris}`)
      // .then(res => res.json())
      // .then(tracks => console.log("Success!"))
    // })
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