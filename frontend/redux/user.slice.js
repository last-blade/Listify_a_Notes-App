import { createSlice } from "@reduxjs/toolkit";

// Load the token from localStorage when initializing the state
const initialState = {
    accessToken: localStorage.getItem('accessToken') || "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload); // Save the token to localStorage
        },
        clearAccessToken: (state) => {
            state.accessToken = "";
            localStorage.removeItem('accessToken'); // Remove the token from localStorage
        }
    }
});

export const { setAccessToken, clearAccessToken } = userSlice.actions;
export default userSlice.reducer;
