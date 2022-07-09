import { Link } from "react-router-dom"
import { AiOutlineUser, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"
import { IoIosLogOut } from "react-icons/io"
import { MdOutlineManageAccounts, MdAccountCircle } from "react-icons/md"
import { GoPackage } from "react-icons/go"
import { BiSupport } from "react-icons/bi"
import { FiDownloadCloud } from "react-icons/fi"
import { useState } from "react"
import FetchData from "./FetchData"

const TopNavbar = ({ logout }) => {

    const [state, setState] = useState(false);
    const { data: me } = FetchData("https://api.spotify.com/v1/me");


    return (
        <header className="top navbar">
            <div className="top-left">
                <button className="top-previous">&lt;</button>
                <button className="top-next">&gt;</button>
            </div>
            <button className="top-right" onClick={() => setState((prevState) => !prevState)}>
                <div className="profile-back">
                    <AiOutlineUser className="profile" />
                </div>
                {me && <div className="profile-name">{me.display_name}</div>}
                {state ? (<div><AiOutlineCaretUp /></div>) : (<div><AiOutlineCaretDown /></div>)}
                {state ? (
                    <div className="dropdown">
                        <Link to="/profile" className="dropdown-menu">
                            <div>Account</div>
                            <div><MdOutlineManageAccounts className="dropdown-icon" /></div>
                        </Link>
                        <Link to="/profile" className="dropdown-menu">
                            <div>Profile</div>
                            <div><MdAccountCircle className="dropdown-icon" /></div>
                        </Link>
                        <Link to="/profile" className="dropdown-menu">
                            <div>Premium</div>
                            <div><GoPackage className="dropdown-icon" /></div>
                        </Link>
                        <Link to="/profile" className="dropdown-menu">
                            <div>Support</div>
                            <div><BiSupport className="dropdown-icon" /></div>
                        </Link>
                        <Link to="/profile" className="dropdown-menu">
                            <div>Download</div>
                            <div><FiDownloadCloud className="dropdown-icon" /></div>
                        </Link>
                        <Link to="/" onClick={() => { logout() }} className="dropdown-menu">
                            <div>Logout</div>
                            <div><IoIosLogOut className="dropdown-icon" /></div>
                        </Link>
                    </div>
                ) : (null)}
            </button>
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ057HBKYGvHGqFSigWBSn_PZFXRsICls11lqrMyp5pxDhgaQ2k35bS7eZzlZ6rUHp7Y_Y&usqp=CAU" />
            <h1>Spotify</h1>
            <div className="pages">
                <Link to="/"><ImHome3 className="home"/></Link>
                <Link to="/search"><BsSearch className="search"/></Link>
                <Link to="/profile"><CgProfile className="profile"/></Link>
                <Link to="/settings"><IoIosSettings className="setting"/></Link>
                <Link to="/login" onClick={() => {logout()}}><IoIosLogOut className="logout"/></Link>
            </div> */}
        </header>
    )
}

export default TopNavbar