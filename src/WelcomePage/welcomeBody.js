import {Link} from  "react-router-dom"
import {requestAuth} from "../Auth";



const WelcomeBody = () => {
    return ( 
        <div className="welcome-body">
            <div className="body-right"></div>
            <div className="body-left2"></div>
            <div className="body-left1"><div className="body-intercept"></div></div>
            
            <div className="welcome-body-text">
                <div className="body-first">Listen, Laugh, Enjoy!</div>
                <div className="body-second">Pickup your music right where you left off</div>
                <div><Link to="/login" onClick={requestAuth}><button>Jump back in</button></Link></div>
            </div>
        </div>
     );
}
 
export default WelcomeBody;