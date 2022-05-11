export const addID = (id) => {
    return (dispatch) => {
        dispatch({
            type:   'ADD_ID',
            payload: id
        })
    }
}

export const setActive = (is_active) => {
    return (dispatch) => {
        dispatch({
            type:   'SET_ACTIVE',
            payload: is_active
        })
    }
}

export const playingInfo = (playing) => {
    return (dispatch) => {
        dispatch({
            type:   'UPDATE_PLAYING',
            payload: playing
        })
    }
}

export const playingID = (playing_id) => {
    return (dispatch) => {
        dispatch({
            type:   'UPDATE_PLAYING_ID',
            payload: playing_id
        })
    }
}