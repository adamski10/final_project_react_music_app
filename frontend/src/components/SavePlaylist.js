import React, {Component} from "react";

class SavePlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistName: null
        }
        this.passSaveToParent = this.passSaveToParent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event) {
        const newName = event.target.value
        this.setState(prevState => {
            return {
                playlistName: newName
            }
        }, () => {})
    }

    passSaveToParent() {
        this.props.handleSave()
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleClickSave(this.state.playlistName);
    }

    render() {
        if (this.props.save === true) {
            return (
                <form action="submit" onSubmit={this.handleSubmit} >
                    <input type="text" placeholder="Name your playlist" name="playlist-name" onChange={this.handleInput} required/>
                    <input type="submit" value="Save"/>
                </form>
            )
        }
    
    
        return (
            <button onClick={this.passSaveToParent}>
                Save Playlist
            </button>
        )
    }

}

export default SavePlaylist;