import React, {useRef, useState, useCallback} from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import bnw_camera_icon from '../Images/bnw_camera_icon.svg'



 
const WebcamCapture = (props) => {
    // This creates a blank reference that any HTML element can later use to identify itself https://reactjs.org/docs/hooks-reference.html#useref
    // Then the <Webcam> element can identify itself by saying "ref={webcamRef}" now other functions can refer directly to that HTML component by refering to it as 'webcamRef'. In this case it's the Capture function 
    const webcamRef = useRef(null);

    // We create a useState instance and use object destructuring to create the variables 'imgSrc' and the method to set imgSrc (setImgSrc) 
    const [imgSrc, setImgSrc] = useState(null);

    
    const uploadImageToBackend = (postData) => {
        axios.post('http://localhost:8080/upload', {postData})
        .then((response) => {
            console.log(response.data)
            props.setEmotion(response.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    }
      
    // https://www.youtube.com/watch?v=-Ls48dd-vJE when you wrap a function in useCallback you prevent the function from triggering a rerender in a .memo component or if the function in referenced in a useEffect. It doesn't change the functionality or anything like that.
    // "Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate)."
    const capture = useCallback(() => {
      //we get the screenshot and set it as imageSrc
      const imageSrc = webcamRef.current.getScreenshot() || '';
      uploadImageToBackend(imageSrc);
      //we split the imageSrc so we can just get at the image data, we're not interested in the metadata
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height= {420}
          width= {420}
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        
        <button onClick={capture} className="capture-button">Capture photo</button>
        
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };
  
export default WebcamCapture