import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
    },
    reducers: {
        setUserRedux: (state, action) => {
            state.userData = action.payload
        },
    },
})

export const { setUserRedux } = userSlice.actions

export default userSlice.reducer