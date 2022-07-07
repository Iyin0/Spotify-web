import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import Login from './Login';
import { useEffect } from "react";
import { onLoad, getAccessToken, logout } from "./Auth";
import LeftNavbar from "./LeftNavbar";
import LikedSongs from "./LikedSongs";
import Welcome from "./Welcome";


function App() {

  useEffect(() => {
    onLoad();
    getAccessToken();
  }, [])

  let access_token = localStorage.getItem("access_token")


  return (
    <BrowserRouter>
      {!access_token ? (
        <div className="Login-App">
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      ) : (
        <div className="all">
          <div className="App">
            <LeftNavbar />
            <div className="main">
              <TopNavbar logout={logout} />
              <div className="content">
                <Routes>
                  <Route path='/' element={<Home access_token={access_token} />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/collection/tracks' element={<LikedSongs />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </div>
            {/* <RightNavbar /> */}
          </div>
          <BottomNavbar access_token={access_token} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;