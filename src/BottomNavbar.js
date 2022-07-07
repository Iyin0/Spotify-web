import { useState, useEffect } from "react";
import { resetToken } from "./Auth";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BiSkipNext, BiRepeat, BiSkipPrevious, BiHelpCircle, BiMobileAlt } from "react-icons/bi"
import { TiArrowShuffle } from "react-icons/ti"
import { GiMicrophone, GiSpeaker, GiSoundOn } from "react-icons/gi"
import { BsList, BsLaptop } from "react-icons/bs"
import { HiOutlineDeviceMobile } from "react-icons/hi"
import { FiMaximize2 } from "react-icons/fi"
import { MdFavoriteBorder, MdOutlineDevicesOther } from "react-icons/md"
import convert from "./convert";
import { pausePlayback, resumePlayback, skipToNext, skipToPrevious, repeat, shuffle } from "./PlaybackControl";


const BottomNavbar = ({ access_token }) => {

    const [state, setState] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [devices, setDevices] = useState(null);
    const [id, setId] = useState("");
    const [current_track, setTrack] = useState(JSON.parse(localStorage.getItem("playing")).item);
    const [progress, setProgress] = useState(convert(Math.floor((JSON.parse(localStorage.getItem("playing")).progress_ms) / 1000)));
    const [progress_s, setProgress_s] = useState(Math.floor((JSON.parse(localStorage.getItem("playing")).progress_ms) / 1000));
    const [duration, setDuration] = useState(convert(Math.floor((JSON.parse(localStorage.getItem("playing")).item.duration_ms) / 1000)));;
    const [duration_s, setDuration_s] = useState((Math.floor((JSON.parse(localStorage.getItem("playing")).item.duration_ms) / 1000)));
    let allArtists = " ";


    useEffect(() => {

        // to clear out existing script tags
        let node = document.getElementsByTagName("script")
        let all = document.getElementsByTagName("body")

        if (node.length > 1) {   // there will be 1 script tag which has nothing to do with the SDK
            while (node.length > 2) {
                all[0].removeChild(all[0].lastElementChild);
            }
        }
        else {
            // to create a script tag for player
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        }

        // to create player
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Iyin Web Player',
                getOAuthToken: cb => { cb(access_token); },
                volume: 0.5
            });
            setPlayer(player);

            // player.removeListener('ready')
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID ', device_id);
                setId(device_id);
                localStorage.setItem("device_id", device_id);
                // dispatch({type: 'ADD_ID', payload: device_id})
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
                resetToken();
            });

            player.on('account_error', ({ message }) => {
                console.error('Failed to validate your Premium Spotify Account', message);
            });

            player.on('playback_error', ({ message }) => {
                console.error('Failed tp perform playback', message)
            });

            player.addListener('player_state_changed', (state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });


            }));

            player.connect()
                .then(success => {
                    if (success) {
                        console.log('The Web Playback SDK successfully connected to Spotify!');
                    }
                    else {
                        console.log('The WebPlaback SDK did not connect');
                    }
                });

        };

    }, [access_token]);


    useEffect(() => {   // to update the window with the track currently playing in real time
        const abortCont = new AbortController();
        fetch("https://api.spotify.com/v1/me/player/currently-playing", { // to fetch the song current playing
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    return await res.json();
                }
                else if (res.status === 401) {
                    resetToken();
                }
                else {
                    // return Promise.reject('err')
                }
            })
            .then(data => {
                setTrack(data.item);
                setProgress(convert(Math.floor(data.progress_ms / 1000)))
                setProgress_s(Math.floor(data.progress_ms / 1000));
                setDuration(convert(Math.floor(data.item.duration_ms / 1000)));
                setDuration_s(Math.floor(data.item.duration_ms / 1000));
                localStorage.setItem("playing", JSON.stringify(data));
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                }
            })
        return () => abortCont.abort();
    })

    const refreshDevices = () => {
        const abortCont = new AbortController();
        fetch("https://api.spotify.com/v1/me/player/devices", { // to display the track info when you leave the home page and return
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 401) {
                    resetToken()
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                setDevices(data.devices)
                for (let i = 0; i < data.devices.length; i++) {
                    if (id === data.devices[i].id) {
                        setActive(data.devices[i].is_active)
                    }
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                }
            })

        return () => abortCont.abort();
    }



    return (
        <footer className="bottom">
            <div className="btm-left">
                <img src={current_track.album.images[0].url} className="btm-cover" alt="" />
                <div className="btm-detail">
                    <h5 className="btm-name">{current_track.name}</h5>
                    <div className="btm-artist">
                        {current_track.artists.map(artist => (
                            allArtists = artist.name
                        )).join(", ")}
                    </div>
                    {allArtists = ""}
                </div>
                <MdFavoriteBorder className="btm-fav" />
            </div>
            <div className="btm-middle">
                <div className="btm-playback">
                    <TiArrowShuffle className="btm-button shuffle" onClick={() => { shuffle() }} />
                    <BiSkipPrevious className="btm-button previous" onClick={() => { skipToPrevious() }} />
                    {is_paused ? (
                        <AiFillPlayCircle className="btm-button play" onClick={() => { resumePlayback(); setPaused(false) }} />
                    ) : (
                        <AiFillPauseCircle className="btm-button play" onClick={() => { pausePlayback();; setPaused(true) }} />
                    )}
                    <BiSkipNext className="btm-button next" onClick={() => { skipToNext() }} />
                    <BiRepeat className="btm-button repeat" onClick={() => { repeat() }} />
                </div>
                <div className="slider-container">
                    <h6 className="progress">{progress}</h6>
                    <input className="middle slider" type="range" min="0" max={duration_s} value={progress_s} readOnly={true} />
                    <h6 className="duration">{duration}</h6>
                </div>
            </div>
            <div className="btm-right">
                <GiMicrophone className="btm-button" onClick={() => { console.log(current_track) }} />
                <BsList className="btm-button" />
                <div className="devices-btn" onClick={() => { refreshDevices(); setState((prevState) => !prevState) }}>
                    <HiOutlineDeviceMobile className="btm-button" />
                    {state ? (
                        <div>
                            <div className="devices-triangle"></div>
                            <div className="show-devices">
                                <div className="devices-heading">Connect to a device  <BiHelpCircle className="help" /></div>
                                <div className="devices-heading-icon"><MdOutlineDevicesOther /></div>
                                {devices && devices.map(device => (
                                    <div className="device-container" key={device.id}>
                                        {(device.type === "Computer") ? (<BsLaptop className="device-icon" />) : (<BiMobileAlt className="device-icon" />)}
                                        <div className="device-info">
                                            <div className="device-name">{device.name}</div>
                                            <div className="device-info-btm">
                                                <GiSoundOn className="sound-icon" />
                                                <div className="device-text">Spotify Connect</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (null)}
                </div>
                <div className="loud">
                    <GiSpeaker className="btm-button" />
                    <input className="volume slider" type="range" min="1" max="100" />
                </div>
                <FiMaximize2 className="btm-button" />
            </div>
        </footer>
    )
}

export default BottomNavbar