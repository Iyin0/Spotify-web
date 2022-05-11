import { BsInstagram, BsTwitter } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"


const WelcomeFooter = () => {
    return ( 
        <div className="welcome-footer footer">
            <div className="footer-wrapper">
                <div className="footer-top">
                    <div className="company-logo">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ057HBKYGvHGqFSigWBSn_PZFXRsICls11lqrMyp5pxDhgaQ2k35bS7eZzlZ6rUHp7Y_Y&usqp=CAU" />
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
                            <div className="text"><BsInstagram/></div>
                        </div>
                        <div className="icon-back">
                            <div className="text"><BsTwitter/></div>
                        </div>
                        <div className="icon-back">
                            <div className="text"><FaFacebookF/></div>
                        </div>
                    </div>
                </div>
                {/* {state ? (
                <div>
                    <div className="welcome-triangle"></div>
                    <div className="welcome-dropdown">
                        <Link to="/profile" className="welcome-menu account">
                            <div>Account</div> 
                            <div><MdOutlineManageAccounts className="dropdown-icon"/></div> 
                        </Link>
                        <Link to="/login" className="welcome-menu log">
                            <div>Login</div> 
                            <div><HiOutlineLogin className="dropdown-icon" /></div> 
                        </Link>
                    </div>
                </div>
                ) : (null)} */}
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
     );
}
 
export default WelcomeFooter;