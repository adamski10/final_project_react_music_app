import React from "react";

const SavePlaylist = (props) => {

    function passSaveToParent() {
        props.handleSave()
    }

    if (props.save === true) {
        //display form and save button
        return (
            <p>Hey</p>
        )
    }
    return (
        // button that will update the save in parent
        <button onClick={passSaveToParent}>
            Save Playlist
        </button>
    )

}

export default SavePlaylist;