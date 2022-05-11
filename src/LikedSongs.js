import FetchData from "./FetchData";
import {AiFillPlayCircle} from "react-icons/ai"
import {BiTime} from "react-icons/bi"
import Footer from "./Footer";
import convert from "./convert";

const LikedSongs = () => {

    const {data: savedTracks, fetching: fetching_savedTracks, error: error_savedTracks} = FetchData("https://api.spotify.com/v1/me/tracks?limit=50");
    const {data: me, fetching: fetching_me, error: error_me} = FetchData("https://api.spotify.com/v1/me");
    const st = " . ";
    let allArtists = " ";


    return ( 
        <div className="liked-songs">
            <div className="top-display">
                <img src={require("./images/spotify-liked-songs.jpeg")} alt="" />
                <div className="liked-song-details">
                    <div className="playlist">Playlist</div>
                    <div className="liked-song">Liked Songs</div>
                    <div className="info">
                        {me && <div className="username">{me.display_name}</div>}
                        <div className="dot">{st}</div>
                        {savedTracks && <div className="num-songs">{savedTracks.total} songs</div>}
                    </div>
                </div>
            </div>
            <div className="play">
                <AiFillPlayCircle className="play-btn" onClick={() => console.log(savedTracks)}/>
            </div>
            <div className="table-heading">
                <div className="hash">#</div>
                <div className="title">TITLE</div>
                <div className="album">ALBUM</div>
                <div className="date-added">DATE ADDED</div>
                <div className="time"><BiTime/></div>
            </div>
            <div className="saved-tracks blank-body">
                {fetching_savedTracks && <div className="waiting"></div>}
                {error_savedTracks && <div className="waiting"></div>}
                {savedTracks && (
                    savedTracks.items.map((track, index) => (
                        <div key={track.track.id} className="saved-track">
                            <div className="index">{index + 1}</div>
                            <img src={track.track.album.images[0].url} alt="" />
                            <div className="saved-track-details">
                                <div className="saved-track-name">{track.track.name}</div>
                                <div className="saved-track-artists">
                                    {track.track.artists.map(artist => (
                                        allArtists = artist.name 
                                    )).join(", ")}
                                </div>
                                {allArtists = ""}
                            </div>
                            <div className="album-name">{track.track.album.name}</div>
                            <div className="added-at">{track.added_at.split("T")[0]}</div>
                            <div className="duration">{convert(Math.floor(track.track.duration_ms/1000))}</div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
     );
}
 
export default LikedSongs;


