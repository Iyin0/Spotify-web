import { createSlice } from "@reduxjs/toolkit";

export const requestToken = createSlice({
    name: 'token',
    initialState: {
        access_token: " ",
        refresh_token: " ",
    },
    reducers: {
        add_accessToken: (state, action) => {
            state.access_token = action.payload
        },
        remove_accessToken: (state) => {
            state.access_token = " "
        },
        add_refreshToken: (state, action) => {
            state.refresh_token = action.payload
        },
        remove_refreshToken: (state) => {
            state.refresh_token = " "
        }
    }
})

export const { add_accessToken, remove_accessToken, add_refreshToken, remove_refreshToken } = requestToken.actions

export default requestToken.reducer