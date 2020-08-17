import React, {useState, useEffect} from 'react';
import WebcamCapture from './Webcam';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as EmojiIcon } from '../Images/smileyface.svg';

const MoodSelector = (props) => {    

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
                data={[":D",":)", "-", ":("]} //...
                dataIndex={10}
                onChange={ value => { console.log(value); } }
            >
            <EmojiIcon x="9" y="9" width="18px" height="18px" />
            </CircularSlider>
                <input></input>
                <h1>Hello from mood selector</h1>
            <WebcamCapture/>
        </>
    )
    

}

export default MoodSelector;