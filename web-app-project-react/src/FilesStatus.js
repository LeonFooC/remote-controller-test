import React, {useState} from "react";
import axios from 'axios';

import FileCard from "./FileCard";
import FilesData from './data/FilesData.js';

export default function FilesStatus()
{
  let [files, setFilesArray] = useState([]);

  let DisplayFilesList = files.map((file) => 
    (
      < FileCard 
        key = {file.id}
        fileInfo = {file}
        //file = {selectFile}
        handleUpload = {HandleUpload}
      />
    ))

  let [selectedFile, setSelectedFile] = useState();
	let [isFilePicked, setIsFilePicked] = useState(false);

	function HandleSetSelectFile(event){
		setSelectedFile(event.target.files[0]);   
    //setSelectedFile(readFile("C:\Users\Leon\Desktop\sitemapv2.png"));
    setIsFilePicked(true);
	};

	function HandleUpdateFileArray() {
        let extensionType = getExtension(selectedFile.name);
        console.log(selectedFile);
    
        if(extensionType != 'Invalid')
        {      
          const newFile = {  
              id: (files.length+1),
              fileType: extensionType,
              fileName: selectedFile.name,
              filePath: 'nil',
              snapshotFileName:'logo192.png',
              captureDate:selectedFile.lastModified,
              uploaded: false
          }    
          setFilesArray(PrevState => [...PrevState, newFile])
        }

        setIsFilePicked(false);
	};

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
//     const formData = new FormData();
//     formData.append('File', selectedFile);
    
//     const uploadUrl = 'http://localhost:3000/uploadFile'; //'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>'

//     fetch(uploadUrl, {
//       method: 'POST',
//       body: formData,
//       })
//       .then((response) => response.json())
//       .then((result) => { console.log('Success:', result);})
//       .catch((error) => { console.error('Error:', error); });

  console.log("Uploading ");
}

  console.log("FileCardsDisplay rendered");

    return(
        <div>       
          <div className="files-header">  
            <h1>Uploads</h1>
            <input id='upload-btn' type="file" name="file" onChange={HandleSetSelectFile} hidden/>
            <label className="fileUpload-btn" htmlFor='upload-btn'>Choose File</label>
          </div>
          
        <div className="fileCard-container">
          {DisplayFilesList}
        </div>

            {isFilePicked ? (HandleUpdateFileArray()) : (<p hidden>a</p>) }

        </div>
    )
}