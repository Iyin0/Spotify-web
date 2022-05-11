import {Link} from  "react-router-dom"
import { HiOutlineLogin} from "react-icons/hi"
import { MdOutlineManageAccounts } from "react-icons/md"
import { AiOutlineDown, AiOutlineUp} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import { useState } from "react"


const WelcomeTop = () => {

    const [state, setState] = useState(false);

    return ( 
        <div className="welcome-top-nav">
            <div className="company-detail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ057HBKYGvHGqFSigWBSn_PZFXRsICls11lqrMyp5pxDhgaQ2k35bS7eZzlZ6rUHp7Y_Y&usqp=CAU" />
                <h1>Spotify</h1>
            </div>
            <div className="nav-details">
                <div className="nav-detail">Premium</div>
                <div className="nav-detail">Support</div>
                <div className="nav-detail">Download</div>
                <div className="nav-vert">|</div>
                <div className="top-last"  onClick={() => setState((prevState) => !prevState)}> 
                    <div><FaUserAlt className="top-nav-icon"/></div>
                    <div className="top-profile">Profile</div>
                    {state ? (<div className="top-nav-dir"><AiOutlineUp/></div>) : (<div className="top-nav-dir"><AiOutlineDown/></div>)}
                    {state ? (
                        <div>
                            <div className="welcome-triangle"></div>
                            <div className="welcome-dropdown">
                                <Link to="/" className="welcome-menu account">
                                    <div>Account</div> 
                                    <div><MdOutlineManageAccounts className="dropdown-icon"/></div> 
                                </Link>
                                <Link to="/login" className="welcome-menu log">
                                    <div>Login</div> 
                                    <div><HiOutlineLogin className="dropdown-icon" /></div> 
                                </Link>
                            </div>
                        </div>
                    ) : (null)}
                </div>
            </div>
        </div>
     );
}
 
export default WelcomeTop;