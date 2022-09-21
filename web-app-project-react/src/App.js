
import React from "react";
import Capture from "./Capture"
import FilesStatus from "./FilesStatus"
import NavBar from "./NavBar"
import RemoteAccess from "./RemoteAccess"

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

  function SetTabToRemote()
  {
    setTabID(2);
  }

  function RenderPage()
  {
    if(tabID == 0)
    {
      return <div className="main">

        <h1>5G Remote Controller</h1>

        <Capture />
        <FilesStatus />      

        <NavBar 
          SwitchToCapture = {SetTabToCaptureSelect} 
          SwitchToRemote = {SetTabToRemoteSelect} />    
      </div>
    }
    else if(tabID == 1)
    {
      return <div className="main">
        
        <h1>5G Remote Controller</h1>

        <RemoteAccess />

        <NavBar 
          SwitchToCapture = {SetTabToCaptureSelect} 
          SwitchToRemote = {SetTabToRemoteSelect} />
      </div>
    }
    else
    {
      return <div className="main">
        
      </div>
    }
  }

  console.log("App started");
  
  return(
    <main className='center'>

      <RenderPage />

    </main>
  )
}