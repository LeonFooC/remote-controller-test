import './assets/css/RemoteAccess.css';

export default function RemoteAccess()
{    
    function StartOVC()
    {
        console.log('Launching OV C');
        window.open("../public/RemoteAcess.html","_self")
    }

    function StartOVV()
    {
        console.log('Launching OV V');
    }

    function StartDT()
    {
        console.log('Launching remote desktop');
    }
    
    return(
        <div className='accessCard-container' onClick={StartOVC}>        
            <div className="accessCard">            
                <img className='accessLogo' src={require('./assets/images/logo192.png')}/>
                <p>Access Omniverse Create</p>                
            </div>

            <div className="accessCard" onClick={StartOVV}>            
                <img className='accessLogo' src={require('./assets/images/logo192.png')}/>
                <p>Access Omniverse View</p>                
            </div>

            <div className="accessCard" onClick={StartDT}>            
                <img className='accessLogo' src={require('./assets/images/logo192.png')}/>
                <p>Access Remote Desktop</p>                
            </div>

        </div>
    )
}