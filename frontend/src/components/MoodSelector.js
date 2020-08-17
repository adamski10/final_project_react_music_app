import React, {useState, useEffect, Component} from 'react';
import WebcamCapture from './Webcam';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as EmojiIcon } from '../Images/smileyface.svg';

class MoodSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mood: {
                valence: 0.5,
                danceability: 0.5,
                energy: 0.5,
                // loudness: null,
                // speechiness: null,
                acousticness: 0.5,
                instrumentalness: 0.5
                // tempo: 100,
                // liveness: null
            }
        }
        this.handleValenceInput = this.handleValenceInput.bind(this);
        this.handleDanceabilityInput = this.handleDanceabilityInput.bind(this);
        this.handleIntensityInput = this.handleIntensityInput.bind(this);
        this.handleCheerMeUpInput = this.handleCheerMeUpInput.bind(this);
        this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
    }
    
    handleNewPlaylist() {
        this.props.updateMoodCaptured(this.state.mood)
    }

    handleValenceInput(event) {
        let newValence = 0;
        if (event.target.value === ":D") {
            newValence = 1.00
        } else if (event.target.value === ":)") {
            newValence = 0.75
        } else if (event.target.value === ":/") {
            newValence = 0.50
        } else {
            newValence = 0.25
        }
        this.setState( { mood: { valence: newValence } })
    }

    handleDanceabilityInput(event) {
        const newDanceability = event.target.value / 100.0;
        const newAcousticness = (100 - event.target.value) / 100.0;
        this.setState( { mood: { danceability: newDanceability, acousticness: newAcousticness } })
    }

    handleIntensityInput(event) {
        const newEnergy = event.target.value / 100.0;
        const newInstrumentalness = (100 - event.target.value) / 100.0;
        this.setState( { mood: { energy: newEnergy, instrumentalness: newInstrumentalness } })
    }

    handleCheerMeUpInput(event) {
        if (event.target.value > 50) {
            if (event.target.value < 75) {
                const moodBoost = 1.25;
                this.setState( { mood: {
                    valence: (this.state.mood.valence * moodBoost),
                    danceability: (this.state.mood.danceability * moodBoost),
                    energy: (this.state.mood.energy * moodBoost)
                } })
            } else {
                const moodBoost = 1.50;
                this.setState( { mood: {
                    valence: (this.state.mood.valence * moodBoost),
                    danceability: (this.state.mood.danceability * moodBoost),
                    energy: (this.state.mood.energy * moodBoost)
                }})
            }
        }
    }

    render() {
        return (
            <>
                <CircularSlider
                    label="Mood selector"
                    labelColor="#005a58"
                    knobColor="#005a58"
                    progressColorFrom="#00bfbd"
                    progressColorTo="#009c9a"
                    progressSize={15}
                    trackColor="#eeeeee"
                    trackSize={24}
                    data={[":D",":)", ":/", ":("]} //...
                    dataIndex={10}
                    // onChange={this.handleValenceInput}
                >
                <EmojiIcon x="9" y="9" width="18px" height="18px" />
                </CircularSlider>
                <h1>Hello from mood selector</h1>
                <WebcamCapture/>
            </>
        )
    }
}

export default MoodSelector;