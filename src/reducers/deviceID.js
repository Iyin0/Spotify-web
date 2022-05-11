const initState = {
    deviceID: " ",
    is_active: false
}

const device = (state = initState, action) => {
    switch (action.type) {
        case "ADD_ID":
            return state.deviceID = action.payload;
        case "SET_ACTIVE":
            return state.is_active = action.payload;
        default:
            return state;
    }
}

export default device;