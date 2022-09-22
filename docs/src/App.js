
import React from "react";
import Capture from "./Capture"
import FilesStatus from "./FilesStatus"
import NavBar from "./NavBar"
import RemoteAccess from "./RemoteAccess"
import CameraTab from "./CameraTab"

export default function App()
{
  let [tabID, setTabID] = React.useState(0);

  function SetTabToCaptureSelect()
  {
    setTabID(0);
  }

  function SetTabToRemoteSelect()
  {
    setTabID(1);
  }

  function SetTabCapturePhoto()
  {
    setTabID(2);
  }

  function RenderPage()
  {
    //For capture tab
    if(tabID == 0)
    {
      return <div className="center">

        <h1>5G Remote Controller</h1>

        <Capture
          SwitchToCapturePhoto = {SetTabCapturePhoto} />    
        <FilesStatus />      

        <NavBar 
          SwitchToCapture = {SetTabToCaptureSelect} 
          SwitchToRemote = {SetTabToRemoteSelect} />    
      </div>
    }
    //For remote acces tab
    else if(tabID == 1)
    {
      return <div className="center">
        
        <h1>5G Remote Controller</h1>

        <RemoteAccess />

        <NavBar 
          SwitchToCapture = {SetTabToCaptureSelect} 
          SwitchToRemote = {SetTabToRemoteSelect} />
      </div>
    }
    //For dispalying remote access
    if(tabID == 2)
    {
      console.log("camera");
      return <CameraTab
                SwitchToCapture = {SetTabToCaptureSelect} />
    }
    else
    {
      
    }
  }

  console.log("App started");
  
  return(
    <main className='main'>

      <RenderPage />

    </main>
  )
}