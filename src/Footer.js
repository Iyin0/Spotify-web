import { BsInstagram, BsTwitter } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="footer-top">
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
    );
}
 
export default Footer;