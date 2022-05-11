const initState = {
    playing_info: {
        name: "",
        album: {
            images: [
                { url: "" }
            ]
        },
        artists: [
            { name: "" }
        ]
    },
    playing_id: " "
};

const playing = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_PLAYING":
            return state.playing_info = action.payload;
        case "UPDATE_PLAYING_ID":
            return state.playing_id = action.payload;
        default:
            return state;
    }
}

export  default playing;