import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    role: string
}

const initialState: CounterState = {
    role: "admin",
}

export const counterSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        changeRole: (state, action) => {
            state.role = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { changeRole } = counterSlice.actions

export default counterSlice.reducer