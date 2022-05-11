import FetchData from "../FetchData";

const {data: topTracks, fetching: fetching_topTracks, error: error_topTracks} = FetchData("https://api.spotify.com/v1/me/top/tracks?limit=8");

const initState = {
    topTracks: topTracks,
    fetching_topTracks: fetching_topTracks,
    error_topTracks: error_topTracks
}

const topTrack = (state = initState, action) => {
    return state
    // switch (action.type) {
    //     case "ADD_ID":
    //         return state.deviceID = action.payload;
    //     case "SET_ACTIVE":
    //         return state.is_active = action.payload;
    //     default:
    //         return state;
    // }
}

export default topTrack;