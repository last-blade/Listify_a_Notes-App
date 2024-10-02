import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem('accessToken') || "",
    userDetails: localStorage.getItem('userDetails') || "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload); 
        },

        clearAccessToken: (state) => {
            state.accessToken = "";
            localStorage.removeItem('accessToken'); 
        },

        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
            localStorage.setItem('userDetails', action.payload)
        },

        clearUserDetails: (state) => {
            state.userDetails = "";
            localStorage.removeItem('userDetails');
        }

    }
});

export const { setAccessToken, clearAccessToken, setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
