import { createSlice } from "@reduxjs/toolkit";
import { login, register } from '../services/authService';

const authSlice = createSlice({
    name: 'auth', 
    initialState: { user: null, token: null, loading: false, error: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        clearUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
