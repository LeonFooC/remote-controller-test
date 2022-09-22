import React, {useRef, useEffect, useState} from "react";

import './assets/css/cameraTab.css';

export default function CameraTab(props)
{
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    function getVideo()
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
        const width = 414;
        const height = width/ (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        setHasPhoto(true);
    }
    
    function savePhoto()
    {
        const imageDataURL = photoRef.current.toDataURL('image/png');

        download(imageDataURL)
    }

    function download(url, name = "download", type = "png") {
        var a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name + "." + type;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("downloaded?");
      }


    function closePhoto() {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
        }, [videoRef]
    )
    
    console.log("Camera Open");
    
    return (
        <div className="fullScreen">

            <div className="video-Container">
                <video className="videoCamera" ref ={videoRef}></video>
                
            </div>

            <div className={'photo-Container ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas className="photoCanvas" ref={photoRef}></canvas>                
            </div>

            <button className="exitButton" onClick={props.SwitchToCapture}>X</button>

            { !hasPhoto ? (
                <button className="captureButton" onClick={takePhoto}>Capture</button> 
            ) : (
                <div>
                <button className="captureButton" onClick={savePhoto} style={{ left: '60%' }}>Save</button>
                <button className="captureButton" onClick={closePhoto}>Close</button>
                </div>
            ) }

        </div>
    )
}

