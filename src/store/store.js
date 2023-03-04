
import { configureStore } from '@reduxjs/toolkit'
import userRedux from '../actions/user'

export default configureStore({
    reducer: {
        user: userRedux
    },
})