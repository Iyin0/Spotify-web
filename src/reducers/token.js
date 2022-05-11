const initState = {
    access_token: " ",
    refresh_token: " "
};

const token = (state = initState, action) => {
    switch (action.type) {
        case "ADD_ACCESS_TOKEN":
            return state.access_token = action.payload;
        case "REMOVE_ACCESS_TOKEN":
            return state.access_token = " ";
        case "ADD_REFRESH_TOKEN":
            return state.refresh_token = action.payload;
        case "REMOVE_REFRESH_TOKEN":
            return state.refresh_token = " ";
        default:
            return state;
    }
}

export  default token;