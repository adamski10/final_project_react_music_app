

import React, {useRef, useState, useCallback} from "react";
import Webcam from "react-webcam";
import axios from 'axios';

 
const WebcamCapture = () => {
    // This creates a blank reference that any HTML element can later use to identify itself https://reactjs.org/docs/hooks-reference.html#useref
    // Then the <Webcam> element can identify itself by saying "ref={webcamRef}" now other functions can refer directly to that HTML component by refering to it as 'webcamRef'. In this case it's the Capture function 
    const webcamRef = useRef(null);

    // We create a useState instance and use object destructuring to create the variables 'imgSrc' and the method to set imgSrc (setImgSrc) 
    const [imgSrc, setImgSrc] = useState(null);

    //our azure key (will be moved to back-end)
    const subscriptionKey = '93ecc4bb25084ec184cce4d68f0869ae';
    //our azure endpoint (will be moved to back-end)
    const url = 'https://spicifytest.cognitiveservices.azure.com/face/v1.0/detect';
    
    //the function which makes the api call
    const callCognitiveApi = (data) => {
        const config = {
            headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': subscriptionKey },
            params : {
                returnFaceId: true,
                returnFaceLandmarks: false,
                returnFaceAttributes: 'emotion'
                }
            };

        const response = axios
            .post(url, data, config)
            .then((res) => {
                console.log(res);
                console.log(res.data[0].faceAttributes.emotion)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const uploadImageToBackend = (postData) => {
        axios.post('http://localhost:8080/upload', {postData})
        .then((response) => {
            console.log(response.data)
        })
        .catch((error)=>{
            console.error(error);
        })

    }
    //this turns our base64 encoded image to a binary which is easier to send over the internet
    const b64toBlob = (b64DataStr, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64DataStr);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
  
    // https://www.youtube.com/watch?v=-Ls48dd-vJE when you wrap a function in useCallback you prevent the function from triggering a rerender in a .memo component or if the function in referenced in a useEffect. It doesn't change the functionality or anything like that.
    // "Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate)."
    const capture = useCallback(() => {
        //we get the screenshot and set it as imageSrc
      const imageSrc = webcamRef.current.getScreenshot() || '';
      console.log(imageSrc);
      uploadImageToBackend(imageSrc);

        //we split the imageSrc so we can just get at the image data, we're not interested in the metadata
      const splitImageSrc = imageSrc.split(',');
      const blob = b64toBlob(splitImageSrc[1]);
      callCognitiveApi(blob);
      setImgSrc(imageSrc);
      console.log(imageSrc)
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