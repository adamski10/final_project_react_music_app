

import React from "react";
import Webcam from "react-webcam";
 
const WebcamCapture = () => {
    // This creates a blank reference that any HTML element can later use to identify itself https://reactjs.org/docs/hooks-reference.html#useref
    // Then the <Webcam> element can identify itself by saying "ref={webcamRef}" now other functions can refer directly to that HTML component. In this case it's the Capture function 
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };
  
export default WebcamCapture