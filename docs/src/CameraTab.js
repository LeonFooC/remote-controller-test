import React, {useRef, useEffect, useState} from "react";

import './assets/css/cameraTab.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes , getDownloadURL, uploadBytesResumable, on } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3SQwEX8j4b9SDRiEAkSLC7SOXeNkw6Rg",
  authDomain: "g-test-project-d619d.firebaseapp.com",
  projectId: "g-test-project-d619d",
  storageBucket: "g-test-project-d619d.appspot.com",
  messagingSenderId: "335293664191",
  appId: "1:335293664191:web:8dcc86c39cbcbf7c4def0a",
  measurementId: "G-CGDG7TDQ38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

const date = new Date();

let mediaRecorder;

let recordedChunks;
let recordedBlob;

export default function CameraTab(props)
{
    // Generic camera variables
        
    const camRef = useRef(null);
    useEffect(() => {
        setupCamera();
        }, [camRef]
    )

    const [isOn, setIsOn] = useState(false);

    const [captureType, setCaptureType] = useState(0); // 0 == photo, 1 == video
    const [isCapturing, setIsCapturing] = useState(false);   
    const [hasCapture, setHasCapture] = useState(false);
    
    const [isSrcReady, setIsSrcReady] = useState(false);
    const [isUploaded, setIsUploading] = useState(false);  

    // Video specific
    
    const videoRef = useRef(null);

    // Photo specific

    const photoRef = useRef(null);

    console.log("===================== Capture Tab Opened =====================");

    function setupCamera()
    {
        navigator.mediaDevices.getUserMedia ({ video : { width : 1920, height: 1080}, audio: false })
        .then(stream => { 
            let cam = camRef.current;
            cam.srcObject = stream;
            cam.oncanplay = e => {
                cam.play();
                console.log("Camera started");

                const options = { mimeType: 'video/webm' };
                cam.captureStream = cam.captureStream || cam.mozCaptureStream;
                mediaRecorder = new MediaRecorder(cam.captureStream(), options);
                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.onstop = handleStop;
                console.log('recorder is ready');
    
                setIsOn(true);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }

    // ==================== For photo/image capture ====================

    function takePhoto() {
        const width = 1920;
        const height = 1080;

        //let video = camRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(camRef.current, 0, 0, width, height);

        setHasCapture(true);
        setCaptureType(0);
    }
    
    function uploadPhoto() {
        setIsUploading(true);

        // const imageDataURL = photoRef.current.toDataURL('image/png');
        // const fileRef = ref(storage, 'images/' + date.getTime() + '.png');

        photoRef.current.toBlob((blob) => {
            // const newImg = document.createElement('img');
            // const url = URL.createObjectURL(blob);
          
            // newImg.onload = () => {
            //   // no longer need to read the blob so it's revoked
            //   URL.revokeObjectURL(url);
            // };
            // newImg.src = url;
            // document.body.appendChild(newImg);
            // console.log(newImg);

            const fileRef = ref(storage, 'images/' + date.getTime() + '.png');
            
            uploadBytesResumable(fileRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            setIsUploading(false);        
            alert(
                'Uploaded!' +
                '\n\nname: ' + snapshot.metadata.name +
                '\ncontent type: ' + snapshot.metadata.contentType +
                '\nsize: ' + snapshot.metadata.size +
                '\ncreated: ' + snapshot.metadata.timeCreated +
                '\nuploaded: ' + snapshot.metadata.updated);
            });
        });
    }

    function savePhoto() {
        //const imageDataURL = photoRef.current.toDataURL('image/png');
        OpenDownloadLink(photoRef.current.toDataURL('image/png'), "download", "png");
    }

    function closePhotoPreview() {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasCapture(false);
    }
    
    // ==================== For video recording ====================

    function handleVideoRecord() {
        if (isCapturing) {
          stopRecording();
        } else {
          startRecording();
        }
    }

    function startRecording() {
        recordedChunks = [];
        mediaRecorder.start();
        setIsCapturing(true);
        setCaptureType(1);
        console.log('Recording Started');
    }

    function stopRecording() {
        mediaRecorder.stop();
        setIsCapturing(false);
        setHasCapture(true);
        console.log('Recording Stopped');
    }

    function handleDataAvailable(e) {
        if (e.data && e.data.size > 0) {
          recordedChunks.push(e.data);
        }
    }

    function handleStop(e) {
        setIsSrcReady(false);
        recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        videoRef.current.src = URL.createObjectURL(recordedBlob);
        videoRef.current.controls = true;
        setIsSrcReady(true);
    }
       
    function saveVideo() {
        // let videoDataUrl = URL.createObjectURL(recordedBlob);
        OpenDownloadLink(videoRef.current.src, "download", "webm");
    }

    function uploadVideo() {
        setIsUploading(true);

        const fileRef = ref(storage, 'videos/' + date.getTime() + '.webm');

        uploadBytesResumable(fileRef, recordedBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        setIsUploading(false);        
        alert(
            'Uploaded!' +
            '\n\nname: ' + snapshot.metadata.name +
            '\ncontent type: ' + snapshot.metadata.contentType +
            '\nsize: ' + snapshot.metadata.size +
            '\ncreated: ' + snapshot.metadata.timeCreated +
            '\nuploaded: ' + snapshot.metadata.updated);
        });
    }

    function closeVideoPreview() {

        // Clear memory?
        
        setHasCapture(false);
    }

    // ====================== Shared/Generic ======================

    function OpenDownloadLink(url, name = "download", type = "xml") {
        var templink = document.createElement("a");
        templink.style.display = "none";
        templink.href = url;
        console.log(url);
        templink.download = name + "." + type;
        document.body.appendChild(templink);
        templink.click();
        document.body.removeChild(templink);
    }

    // ====================== Other stuff

    function ToggleCaptureType()
    {
        if(!isCapturing)
        {
            return (
                <button className="captureButton" onClick={SwitchCaptureType} style={{ left: '20%' }}>
                    Toggle Capture Type
                </button>
            )
        }
    }

    function SwitchCaptureType()
    {
        if(captureType == 0)
        {
            setCaptureType(1);
        }
        else
        {
            setCaptureType(0);
        }
    }

    return (
        <div className="fullScreen">

            <div className="camera-Container">
                <video className="cameraCanvas" ref ={camRef}></video>                
            </div>
            
            <button className="exitButton" onClick={props.SwitchToCapture}>X</button>            

            {ToggleCaptureType()}

            // To display previews
            { captureType == 0 ? (
                <div className={'photo-Container ' + (hasCapture ? 'hasCapture' : '')}>
                    <canvas className="photoCanvas" ref={photoRef}></canvas>                
                </div>
            ) : (
                <div className={'video-Container ' + (hasCapture ? 'hasCapture' : '')}>
                    {/* <canvas className="videoCanvas" ref={videoRef}></canvas>  */}
                    <video ref={videoRef} className="videoCanvas" muted></video>               
                </div>            
            ) } 

            // Capture buttons and setup
            { captureType == 0 ? (

                !hasCapture ? (
                    <button className="captureButton" onClick={takePhoto} style={{ left: '60%' }}>Photo Capture</button> 
                ) : (                
                    <div>
                        <button className="captureButton" onClick={uploadPhoto} style={{ left: '60%' }}>Upload Photo</button>
                        <button className="captureButton" onClick={savePhoto} style={{ left: '90%' }}>Save Photo</button>
                        <button className="captureButton" onClick={closePhotoPreview}>Close Photo Preview</button>
                    </div>
                )
            ) : (

                !hasCapture ? (
                    !isCapturing ? (
                        <div>
                            <button className="captureButton" onClick={handleVideoRecord} style={{ left: '60%' }}>Video Capture</button> 
                        </div>
                        ) : (                
                        <div>
                            <button className="captureButton" onClick={handleVideoRecord} style={{ left: '60%' }}>Stop Recording</button> 
                        </div>
                    ) 
                ) : (                
                <div>
                    <button className="captureButton" onClick={uploadVideo}  style={{ left: '60%' }}>Upload Video</button>
                    <button className="captureButton" onClick={saveVideo} style={{ left: '90%' }}>Save Video</button>
                    <button className="captureButton" onClick={closeVideoPreview}>Close Video Preview</button>
                </div>
                )
            ) }  

        </div>
    )
}

