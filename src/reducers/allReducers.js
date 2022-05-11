import { combineReducers } from "redux";
import deviceID from "./deviceID";
import token from "./token";
import playing from "./trackInfo";
import client from "./clientInfo";
// import topTrack from "./topTrack";

const allReducers = combineReducers ({
    deviceID: deviceID,
    token: token,
    playing: playing,
    client: client,
    // topTracks: topTrack

})

export default allReducers;