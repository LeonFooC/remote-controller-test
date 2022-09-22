import React, {useState} from 'react';

export default function Capture(props)
{
    return(
        <div style={{height:100}}>
                <button className='encapsulate' onClick={props.SwitchToCapturePhoto}>Start a capture</button>
        </div>
    )
}

// {isFilePicked ? (
//     <div>
//         {console.log(selectedFile)}
//          <p>Filename: {selectedFile.name}</p>
//          <p>Filetype: {selectedFile.type}</p>
//          <p>Size in bytes: {selectedFile.size}</p>
//          <p>lastModifiedDate: {selectedFile.lastModified ? selectedFile.lastModified : selectedFile.lastModifiedDate}</p>
//     </div>
//     ) : (
//     <p>Select a file to show details</p>
//     )}