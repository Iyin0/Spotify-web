import { configureStore } from '@reduxjs/toolkit'
import { requestToken } from './token'

export default configureStore({
    reducer: {
        token: requestToken,
    },
})