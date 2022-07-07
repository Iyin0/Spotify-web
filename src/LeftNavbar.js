import { Link } from "react-router-dom"
import { RiHome5Fill } from "react-icons/ri"
import { BsSearch } from "react-icons/bs"
import { VscLibrary } from "react-icons/vsc"
import { MdAddBox } from "react-icons/md"
import FetchData from "./FetchData";


const LeftNavbar = ({ logout }) => {

    const { data: myPlaylist, fetching: fetching_myPlaylists, error: error_myPlaylist } = FetchData("https://api.spotify.com/v1/me/playlists");
    const { data: myAlbums, fetching: fetching_myAlbums, error: error_myAlbums } = FetchData("https://api.spotify.com/v1/me/albums");

    return (
        <nav className="left">
            <div className="logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ057HBKYGvHGqFSigWBSn_PZFXRsICls11lqrMyp5pxDhgaQ2k35bS7eZzlZ6rUHp7Y_Y&usqp=CAU" />
                <h1>Spotify</h1>
            </div>
            <div className="pages">
                <Link to="/" className="linkTo home">
                    <RiHome5Fill className="home icon" />
                    <h1 className="home text">Home</h1>
                </Link>
                <Link to="/search" className="linkTo search">
                    <BsSearch className="search icon" />
                    <h1 className="search text">Search</h1>
                </Link>
                <Link to="/" className="linkTo library">
                    <VscLibrary className="library icon" />
                    <h1 className="library text">Your Library</h1>
                </Link>
                <Link to="/" className="linkTo create">
                    <MdAddBox className="create icon" />
                    <h1 className="create text">Create Playlist</h1>
                </Link>
                <Link to='/collection/tracks' className="linkTo liked">
                    <img src={require("./images/spotify-liked-songs.jpeg")} alt="" />
                    <h1 className="liked text">Liked Songs </h1>
                </Link>
            </div>
            <div className="left-list">
                <div className="your-top">Your top Songs 2021</div>
                {myPlaylist && myPlaylist.items.map((playlist) => (
                    <div className="playlist-view" key={playlist.id}>
                        <div className="detailss">{playlist.name}</div>
                    </div>
                ))}
                {myAlbums && myAlbums.items.map((albums) => (
                    <div className="playlist-view" key={albums.album.id}>
                        <div className="detailss">{albums.album.name}</div>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default LeftNavbar;