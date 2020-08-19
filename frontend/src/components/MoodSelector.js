import React, {useState, useEffect, Component} from 'react';
import WebcamCapture from './Webcam';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as EmojiIcon } from '../Images/smileyface.svg';

import { ReactComponent as Emoji1f62d } from '../Images/svg_emojis/1f62d.svg'
import { ReactComponent as Emoji1f622 } from '../Images/svg_emojis/1f622.svg'
import { ReactComponent as Emoji1f61e } from '../Images/svg_emojis/1f61e.svg'
import { ReactComponent as Emoji1f641 } from '../Images/svg_emojis/1f641.svg'
import { ReactComponent as Emoji1f610 } from '../Images/svg_emojis/1f610.svg'
import { ReactComponent as Emoji1f642 } from '../Images/svg_emojis/1f642.svg'
import { ReactComponent as Emoji1f600 } from '../Images/svg_emojis/1f600.svg'
import { ReactComponent as Emoji1f601 } from '../Images/svg_emojis/1f601.svg'
import { ReactComponent as Emoji1f929 } from '../Images/svg_emojis/1f929.svg'





const MoodSelector = (props, { emotion } = props) => {    

    const [sliderEmoji, setSliderEmoji] = useState(<Emoji1f929 />);
    useEffect( () => { changeEmoji()}, [ props.emotion ] );

    useEffect(()=>{ console.log("i'm changed")},[sliderEmoji])

    const changeEmoji = () =>{
        switch (true) { //matches to any statement that is true
            case (props.emotion < 0.11):
                setSliderEmoji(<Emoji1f62d className="emoji"/>)
                console.log("i'm under 0.11 😭 1f62d")
                break;
            case (props.emotion < 0.22):
                console.log("i'm under 😢 1f622")
                setSliderEmoji(<Emoji1f622 className="emoji"/>)
                break;
            case (props.emotion < 0.33):
                console.log("i'm under 0.33 😞 1f61e")
                setSliderEmoji(<Emoji1f61e className="emoji"/>)
                break;
            case (props.emotion < 0.44):
                console.log("i'm under 0.44 🙁 1f641")
                setSliderEmoji(<Emoji1f641 className="emoji"/>)
                break;     
            case (props.emotion < 0.55):
                console.log("i'm under 0.55 😐 1f610")
                setSliderEmoji(<Emoji1f610 style={{filter: "drop-shadow(30px 10px 4px #db4c28)"}}/>)
                break;
            case (props.emotion < 0.66):
                console.log("i'm under 0.66 🙂 1f642")
                setSliderEmoji(<Emoji1f642 className="emoji"/>)
                break;
            case (props.emotion < 0.77):
                console.log("i'm under 0.77 😀 1f600")
                setSliderEmoji(<Emoji1f600 className="emoji"/>)
                break;
            case (props.emotion < 0.88):
                console.log("i'm under 0.88 😁 1f601")
                setSliderEmoji(<Emoji1f601 className="emoji"/>)
                break;
            case (props.emotion <= 1):
                console.log("i'm under 1 🤩 1f929")
                setSliderEmoji(<Emoji1f929 className="emoji"/>)
                break;
            default:
                console.log("i'm default")
                break;
        }

    }


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
                    dataIndex={props.emotion*100}
                    onChange={ value => {props.setSliderValence(value/100)} }
                    
                >
                    {sliderEmoji}
                    {/* <sliderEmoji x="9" y="9" width="18px" height="18px" /> */}
                </CircularSlider>
                <div className="webcam">
                    <WebcamCapture setEmotion={props.setEmotion}/>
                </div>
                <div className="slide-bars-container"> 
                    <input onChange={event => {props.setSliderEnergy(event.target.value/100)}} className="slide-bars"  id ="energy" type="range" min="0" max="100" ></input>
                    <input onChange={event => {props.setSliderDanciness(event.target.value/100)}} className="slide-bars"  id ="dance-mood"type="range" min="0" max="100" ></input>
                    <input className="slide-bars" id="?????" type="range" min="0" max="1" ></input>
                    <label for="energy">Energy</label>  
                    <label for="dance-mood">Dance mood</label>
                    <label for="energy">?????</label>
                </div>
                <h1>Hello from mood selector</h1>
            
        </>    
    )
    }

 export default MoodSelector