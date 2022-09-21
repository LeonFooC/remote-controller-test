export default function NavBar(props)
{
  return(
    <nav className='nav'>
      <button className='encapsulate' onClick={props.SwitchToCapture}>Capture</button>
      <button className='encapsulate' onClick={props.SwitchToRemote}>Remote Access</button>
    </nav>
  )
}