import React, {useState, useEffect, Component} from 'react';
import WebcamCapture from './Webcam';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as EmojiIcon } from '../Images/smileyface.svg';

const MoodSelector = (props) => {    

    const [sliderValance, setSliderValance] = useState();
    useEffect( () => { setSliderValance(props.emotion)}, [ props.emotion ] );

    const allRanges = document.querySelectorAll(".range-wrap");

    allRanges.forEach((wrap) => {
        const range = wrap.querySelector(".range");
        const bubble = wrap.querySelector(".bubble");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });

        // setting bubble on DOM load
        setBubble(range, bubble);
    });

    function setBubble(range, bubble) {
    const val = range.value;

    const min = range.min || 0;
    const max =  range.max || 100;

    const offset = Number(((val - min) * 100) / (max - min));

    bubble.textContent = val;

    // yes, 14px is a magic number
    bubble.style.left = `calc(${offset}% - 14px)`;
    }


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
                    max={1000} // the slider reacts to emotion change with min=0 and max=1 but start point is not correct
                    data= {[]}    
                    dataIndex={props.emotion*1000}
                    onChange={ value => {props.setSliderValence(value/1000)} }   
                >
                    <EmojiIcon x="9" y="9" width="18px" height="18px" />
                </CircularSlider>
                <div className="webcam">
                    <WebcamCapture setEmotion={props.setEmotion}/>
                </div>
                <div className="slide-bars-container1">
                    <h4>Energy</h4>
                    <div className="range-wrap">
                        {/* <label for="energy">Energy</label>   */}
                        <input onChange={event => {props.setSliderEnergy(event.target.value/100)}} className="range"  type="range" min="0" max="100" ></input> 
                        <output class="bubble"></output>
                    </div>
                        
                </div>
                <div className="slide-bars-container1">
                    <h4>Dancebility</h4>
                    <div className="range-wrap">
                        {/* <label for="dance-mood">Dance mood</label> */}
                        <input onChange={event => {props.setSliderDanciness(event.target.value/100)}} className="range"  type="range" min="0" max="100" ></input>
                        <output class="bubble"></output>
                    </div>
                </div>
                    
                    
                    
                
                
            
        </>    
    )
}

export default MoodSelector

 