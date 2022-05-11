const initState = {
    client_id: '914b034c51f548e48a0fe061861beee7',
    client_secret: 'c15efda2da994aa4b85268537802e161'
};

const client = (state = initState, action) => {
    switch (action.type) {
        case "INPUT_CLIENT_ID":
            return state.client_id = action.payload;
        case "REMOVE_CLIENT_ID":
            return state.client_id = " ";
        case "INPUT_CLIENT_SECRET":
            return state.client_secret = action.payload;
        case "REMOVE_CLIENT_SECRET":
            return state.client_secret = " ";
        default:
            return state;
    }
}

export  default client;