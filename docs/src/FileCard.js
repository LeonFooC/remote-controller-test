import React, {useState} from "react";

export default function FileCard(props)
{
    let fileName = props.fileInfo.fileName;
    let fileType = props.fileInfo.fileType;
    let filePath = props.fileInfo.filePath;
    let snapshotFileName = props.fileInfo.snapshotFileName;
    let captureDate = props.fileInfo.captureDate;

    let [isUploaded, setUploaded] = useState(props.fileInfo.uploaded);

    console.log("FileCard rendered");

    function UploadFile()
    {
        setUploaded(true);
        props.handleUpload();
    }

    return(        
        <div className="fileCard">
                <img className='fileCardLogo' src={require('./assets/images/' + snapshotFileName)}/>

                <div className='fileCardMiddle'>
                    <p>{fileName}</p>
                    <p>File Type: {fileType}</p>
                    <p>{captureDate}</p>
                </div>
                
            {!isUploaded ?
                (
                    <div className='fileCardRight'>
                        <button onClick={UploadFile}>Upload</button>
                    </div>
                ) : (                 
                    <div className='fileCardRight'>
                        <p>Uploaded!</p>
                    </div>
                )}
        </div>
    )
}