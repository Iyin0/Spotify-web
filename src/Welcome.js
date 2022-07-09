import { FaUserAlt } from "react-icons/fa"
import { useState } from "react"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { Link } from "react-router-dom"
import { HiOutlineLogin } from "react-icons/hi"
import { MdOutlineManageAccounts } from "react-icons/md"
import { BsInstagram, BsTwitter } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"
import { requestAuth } from "./Auth";



const Welcome = () => {

    const [state, setState] = useState(false);

    return (
        <div className="welcome">
            <div className="welcome-top-nav">
                <div className="company-detail">
                    <img src={require("./Spotify_App_Logo_Welcome1.png")} alt="Spotify logo 1" />
                    <h1>Spotify</h1>
                </div>
                <div className="nav-details">
                    <div className="nav-detail">Premium</div>
                    <div className="nav-detail">Support</div>
                    <div className="nav-detail">Download</div>
                    <div className="nav-vert">|</div>
                    <div className="top-last" onClick={() => setState((prevState) => !prevState)}>
                        <div><FaUserAlt className="top-nav-icon" /></div>
                        <div className="top-profile">Profile</div>
                        {state ? (<div className="top-nav-dir"><AiOutlineUp /></div>) : (<div className="top-nav-dir"><AiOutlineDown /></div>)}
                    </div>
                </div>
            </div>
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
            <div className="welcome-footer footer">
                <div className="footer-wrapper">
                    <div className="footer-top">
                        <div className="company-logo">
                            <img src={require("./Spotify_App_Logo_Welcome2.png")} alt="Spotify logo 2" />
                            <h1>Spotify</h1>
                        </div>
                        <div className="footer-top-left">
                            <div className="company contents">
                                <div className="footer-title">COMPANY</div>
                                <div className="footer-body">
                                    <div className="text">About</div>
                                    <div className="text">Jobs</div>
                                    <div className="text">For the Record</div>
                                </div>
                            </div>
                            <div className="communities contents">
                                <div className="footer-title">COMMUNITIES</div>
                                <div className="footer-body">
                                    <div className="text">For Artists</div>
                                    <div className="text">Developers</div>
                                    <div className="text">Advertising</div>
                                    <div className="text">Investors</div>
                                    <div className="text">Vendors</div>
                                </div>
                            </div>
                            <div className="links contents">
                                <div className="footer-title">USEFUL LINKS</div>
                                <div className="footer-body">
                                    <div className="text">Support</div>
                                    <div className="text">Free Mobile App</div>
                                </div>
                            </div>
                        </div>
                        <div className="icons">
                            <div className="icon-back">
                                <div className="text"><BsInstagram /></div>
                            </div>
                            <div className="icon-back">
                                <div className="text"><BsTwitter /></div>
                            </div>
                            <div className="icon-back">
                                <div className="text"><FaFacebookF /></div>
                            </div>
                        </div>
                    </div>
                    {state ? (
                        <div>
                            <div className="welcome-triangle"></div>
                            <div className="welcome-dropdown">
                                <Link to="/profile" className="welcome-menu account">
                                    <div>Account</div>
                                    <div><MdOutlineManageAccounts className="dropdown-icon" /></div>
                                </Link>
                                <Link to="/login" className="welcome-menu log">
                                    <div>Login</div>
                                    <div><HiOutlineLogin className="dropdown-icon" /></div>
                                </Link>
                            </div>
                        </div>
                    ) : (null)}
                    <div className="footer-bottom">
                        <div className="footer-bottom-left">
                            <div className="bottom-text">Legal</div>
                            <div className="bottom-text">Privacy Center</div>
                            <div className="bottom-text">Privacy Policy</div>
                            <div className="bottom-text">Cookies</div>
                            <div className="bottom-text">About Ads</div>
                        </div>
                        <div className="footer-bottom-right">
                            <div className="bottom-text">2022 Spotify AB</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;