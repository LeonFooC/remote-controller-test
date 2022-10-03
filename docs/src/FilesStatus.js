import React, {useState, useEffect} from "react";
import axios from 'axios';

import FileCard from "./FileCard";
import FilesData from './data/FilesData.js';

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

export default function FilesStatus()
{
  let [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    }, [selectedFile] )

  let [selectedFileInfo, setSelectedFileInfo] = useState({ 
    id: 999,
    fileType: String,
    fileName: String,
    filePath: String,
    snapshotFileName:'logo192.png',
    captureDate: String,
    uploaded: Boolean
  });

  let [isFilePicked, setIsFilePicked] = useState(false);

  let [uploadProgress, setUploadProgress] = useState(0);
  useEffect(() => {
      }, [uploadProgress] )

  let [files, setFilesArray] = useState([]);

  let DisplayFilesList = files.map((file) => 
    (
      < FileCard 
        key = {file.id}
        fileInfo = {file}
        handleUpload = {HandleUpload}
      />
    ))

function HandleSetSelectFile(event){
		setSelectedFile(event.target.files[0]); 

    setIsFilePicked(true);
	}

	function UpdateFileArray() {
        let extensionType = getExtension(selectedFile.name);
        
        const newFile = {  
              id: (files.length+1),
              fileType: extensionType,
              fileName: selectedFile.name,
              filePath: 'nil',
              snapshotFileName:'logo192.png',
              captureDate:selectedFile.lastModified,
              uploaded: true,
              uploadProgress: 100
        }    
        setFilesArray(PrevState => [...PrevState, newFile])

        setSelectedFile(null);
        setIsFilePicked(false);        
	}

	function UpdateSelectedFileInfo() {
    let extensionType = getExtension(selectedFile.name);
      const newFile = {  
          id: (files.length+1),
          fileType: extensionType,
          fileName: selectedFile.name,
          filePath: 'nil',
          snapshotFileName:'logo192.png',
          captureDate:selectedFile.lastModified,
          uploaded: false,
          uploadProgress: uploadProgress
      }    
      setSelectedFileInfo(newFile);

    setIsFilePicked(false);
}

let DisplaySelectedFile = () => (
  < FileCard 
    fileInfo = {selectedFileInfo}
    handleUpload = {HandleUpload}
    uploadProgress = {uploadProgress}
  />
)

  function getExtension(filename) {
    switch(filename.split('.').pop()) {
      case 'png':
      case 'jgp':
      case 'jgpe':
        return 'Image';
      case 'laz':
        return 'Point Cloud';
      case 'mp4':
        return 'Video';
      default:
        return 'Invalid';
  }
}

function HandleUpload() {

  console.log("Uploading!!!");

  const fileRef = ref(storage, `files/${selectedFile.name}`);
  const uploadTask = uploadBytesResumable(fileRef, selectedFile);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
      console.log('Upload is ' + uploadProgress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
      console.log("unsuccessful upload...");
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
      UpdateFileArray();
    }
  );
}

  return(
        <div>       
          <div className="files-header">  
            <h1>Uploads</h1>
            <input id='upload-btn' type="file" name="file" onChange={HandleSetSelectFile} hidden/>
            <label className="fileUpload-btn" htmlFor='upload-btn'>Choose File</label>
          </div>
          
          <div className="fileCard-container">
            
            {isFilePicked ? (UpdateSelectedFileInfo()) : (<p hidden>No file selected</p>)}
            {selectedFile != null ? (DisplaySelectedFile()) : (<p hidden>No file selected</p>)}
            {DisplayFilesList}
          </div>
        </div>
  )
}