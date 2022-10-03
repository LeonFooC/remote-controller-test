import React, {useRef, useEffect, useState} from "react";

import './assets/css/cameraTab.css';

export default function CameraTab(props)
{
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    useEffect(() => {
        setupCamera();
        }, [videoRef]
    )

    const [hasCapture, setHasCapture] = useState(false);

    function setupCamera()
    {
        navigator.mediaDevices.getUserMedia ({ video : { width : 1920, height: 1080}})
        .then(stream => { let video = videoRef.current;
            video.srcObject = stream;
            video.play();})
        .catch(err => {
            console.error(err);
        })
    }

    function takePhoto() {
        const width = 1920; //414;
        const height = 1080; //width/ (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        setHasCapture(true);
    }
    
    function saveCapture() {
        const imageDataURL = photoRef.current.toDataURL('image/png');        
        downloadCapture(imageDataURL);
    }

    function downloadCapture(url, name = "download", type = "png") {
        var templink = document.createElement("a");
        templink.style.display = "none";
        templink.href = url;
        templink.download = name + "." + type;
        document.body.appendChild(templink);
        templink.click();
        document.body.removeChild(templink);
      }

    function closePhoto() {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasCapture(false);
    }
    
    console.log("Camera Open");
    
    return (
        <div className="fullScreen">

            <div className="video-Container">
                <video className="videoCamera" ref ={videoRef}></video>                
            </div>

            <div className={'photo-Container ' + (hasCapture ? 'hasPhoto' : '')}>
                <canvas className="photoCanvas" ref={photoRef}></canvas>                
            </div>

            <button className="exitButton" onClick={props.SwitchToCapture}>X</button>

            { !hasCapture ? (
                <button className="captureButton" onClick={takePhoto}>Capture</button> 
            ) : (
                
                <div>
                <button className="captureButton" onClick={saveCapture} style={{ left: '90%' }}>Save & Upload</button>
                <button className="captureButton" onClick={saveCapture} style={{ left: '60%' }}>Save</button>
                <button className="captureButton" onClick={closePhoto}>Close</button>
                </div>
            ) }

        </div>
    )
}

