import { useState, useEffect } from "react";
import { resetToken } from "./Auth";
import { useSelector } from "react-redux";
import Footer from "./Footer";



// Things to do:
// 2. load devices and select desired device from the web app
// 3. COntrol the playback without being active
// 4. Add daily mixes, top mixes and discover weekly



const Home = ({ access_token }) => {

    const [pending, setPending] = useState(true);
    const [current_track, setTrack] = useState(null);
    const [topTracks, setTopTracks] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [myPlaylist, setMyPlaylist] = useState(null)
    const [newReleases, setNewReleases] = useState(null)
    const [featuredPlaylists, setFeaturedPlaylists] = useState(null)
    const [featuredPlaylistsItems, setFeaturedPlaylistsItems] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState(null);
    const [recentfetching, setRecentFetching] = useState(true);
    const state = useSelector((state) => state);
    const [hoverDisplay, setHoverDisplay] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();
        Promise.all([

            fetch("https://api.spotify.com/v1/me/top/tracks?limit=8", {
                signal: abortCont.signal,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch("https://api.spotify.com/v1/me/top/artists?limit=8", {
                signal: abortCont.signal,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch("https://api.spotify.com/v1/me/playlists?limit=8", {
                signal: abortCont.signal,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch("https://api.spotify.com/v1/browse/new-releases?limit=8", {
                signal: abortCont.signal,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=8&locale=en_NG", {
                signal: abortCont.signal,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
        ])
            .then(responses => {
                return Promise.all(responses.map(response => {
                    // console.log(response.status)
                    return response.json();
                }));
            })
            .then(data => {
                setTopTracks(data[0]);
                setTopArtists(data[1]);
                setMyPlaylist(data[2]);
                setNewReleases(data[3]);
                setFeaturedPlaylists(data[4])
                setPending(false)
            })
            .catch(error => {
                console.log(error)
            })
        return () => abortCont.abort();
    }, [access_token])


    useEffect(() => {   // to display recently played tracks

        const abortCont = new AbortController();

        fetch("https://api.spotify.com/v1/me/player/recently-played/?limit=8", { // to fetch recently played
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.status === 401) {
                    resetToken()
                }
                else {
                    return await res.json();
                }
            })
            .then(data => {
                setRecentlyPlayed(data)
                setRecentFetching(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                }
                setRecentFetching(false)
            })

        return () => abortCont.abort();
    }, [access_token])


    useEffect(() => {
        setTrack(JSON.parse(localStorage.getItem("playing")))
    }, [localStorage.getItem("trackID")])


    useEffect(() => {   // to load up the home page
        (featuredPlaylists && setFeaturedPlaylistsItems(featuredPlaylists.playlists.items))
    }, [pending])


    return (
        <div className="homepage">
            <div className="sections">
                {recentfetching && <div>Loading...</div>}
                {recentlyPlayed && (
                    <div className="recently-played bowl">
                        <div className="header">
                            <b className="heading">Recently played</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {recentlyPlayed.items.map((recent) => (
                                <div className="recent view" key={recent.played_at} onMouseEnter={() => setHoverDisplay(true)} onMouseLeave={() => setHoverDisplay(false)}>
                                    <div>
                                        <img src={recent.track.album.images[0].url} className="cover" alt="" />

                                    </div>
                                    <div className="details">{recent.track.name}</div>
                                    <div className="more-details">{recent.track.artists[0].name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sections">
                {featuredPlaylists && (
                    <div className="featured-playlists bowl">
                        <div className="header">
                            <b className="heading">{featuredPlaylists.message}</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {featuredPlaylistsItems && featuredPlaylistsItems.map((featured) => (
                                <div className="featured view" key={featured.id}>
                                    <img src={featured.images[0].url} className="cover" alt="" />
                                    <div className="details">{featured.name}</div>
                                    <div className="more-details">{featured.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sections">
                {topTracks && (
                    <div className="top-tracks bowl">
                        <div className="header">
                            <b className="heading">Top Tracks</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {topTracks.items.map((topTrack) => (
                                <div className="topTrack view" key={topTrack.id}>
                                    <img src={topTrack.album.images[0].url} className="cover" alt="" />
                                    <div className="details">{topTrack.name}</div>
                                    <div className="more-details">{topTrack.artists[0].name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sections">
                {topArtists && (
                    <div className="top-artists bowl">
                        <div className="header">
                            <b className="heading">Top Artists</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {topArtists.items.map((topArtist) => (
                                <div className="topArtist view" key={topArtist.id}>
                                    <img src={topArtist.images[0].url} className="cover" alt="" />
                                    <div className="details">{topArtist.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sections">
                {myPlaylist && (
                    <div className="playlist bowl">
                        <div className="header">
                            <b className="heading">Playlists</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {myPlaylist.items.map((playlist) => (
                                <div className="playlist view" key={playlist.id}>
                                    <img src={playlist.images[0].url} className="cover" alt="" />
                                    <div className="details">{playlist.name}</div>
                                    <div className="more-details"> By {playlist.owner.display_name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="sections">
                {newReleases && (
                    <div className="releases bowl">
                        <div className="header">
                            <b className="heading">New Releases</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {newReleases.albums.items.map((releases) => (
                                <div className="releases view" key={releases.id}>
                                    <img src={releases.images[0].url} className="cover" alt="" />
                                    <div className="details">{releases.album_type}</div>
                                    <div className="more-details">{releases.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Home;