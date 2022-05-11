import { useState } from "react";
import { Link } from "react-router-dom";
import {AiFillFacebook, AiFillApple} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {requestAuth} from "./Auth";



const Login = () => {
    const [userID, setUserId] = useState('');
    const [password, setPassword] = useState('');

    return ( 
        <div>
            <nav className="loginNav">
                <img src="https://findicons.com/files/icons/2779/simple_icons/2048/spotify_2048_black.png" />
                <h1>Spotify</h1>
            </nav>
            <div className="login">
                <div className="buttons">
                    <p className="loginText">To continue, log in to Spotify.</p>
                    <button className="sign facebook"><AiFillFacebook className="icon"/>CONTINUE WITH FACEBOOK</button>
                    <button className="sign apple"><AiFillApple className="icon"/>CONTINUE WITH APPLE</button>
                    <button className="sign google"><FcGoogle className="icon"/>CONTINUE WITH GOOGLE</button>
                    <button className="sign phone">CONTINUE WITH PHONE NUMBER</button>
                </div>
                <p className="or">OR</p>
                <form>
                    <label>Email address or username</label>
                    <input 
                        type="text" 
                        className="pwd"
                        placeholder="Email address or username"
                        required value={userID} 
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="pwd"
                        placeholder="Password"
                        required value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to="/resetPassword" className="fpwd">Forgot your password?</Link>
                    <label className="checkbox">
                        <input type="checkbox" className="check"/>
                        <p className="remember">Remember me</p>
                    </label>
                    <button className="btn" onClick={requestAuth}>LOG IN</button>
                </form>
                <p className="signText">Don't have an account?</p>
                <button className="sign Btn">SIGN IN FOR SPOTIFY</button>
            </div>
        </div>
     );
}


export default Login;