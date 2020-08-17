import React, {useState, useEffect} from 'react';
import WebcamCapture from './Webcam';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as EmojiIcon } from '../Images/smileyface.svg';

const MoodSelector = (props) => {    

    const [sliderValance, setSliderValance] = useState();
    useEffect( () => { setSliderValance(props.emotion)}, [ props.emotion ] );


    //it checks for the props.emotion changing and when it detects a change it calls usestate and passes in props.emotion

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
                    hideLabelValue="true"
                    min={0}
                    max={100} // the slider reacts to emotion change with min=0 and max=1 but start point is not correct
                    data= {[]}    
                    dataIndex={sliderValance*100}
                    onChange={ value => { props.setSliderValence(value/100) }  }
                    
                >
                    <EmojiIcon x="9" y="9" width="18px" height="18px" />
                </CircularSlider>
                <div className="webcam">
                    <WebcamCapture setEmotion={props.setEmotion}/>
                </div>
                <div className="slide-bars-container">
                    <label for="energy">Energy</label>
                        <input onChange={event => {props.setSliderEnergy(event.target.value/100)}} className="slide-bars"  id ="energy" type="range" min="0" max="100" ></input>
                    <label for="dance-mood">Dance mood</label>
                        <input onChange={event => {props.setSliderDanciness(event.target.value/100)}} className="slide-bars"  id ="dance-mood"type="range" min="0" max="100" ></input>
                    <label for="energy">?????</label>
                        <input className="slide-bars" id="?????" type="range" min="0" max="1" ></input>
                </div>
                <h1>Hello from mood selector</h1>
            
        </>    
    )
    }

 export default MoodSelector