import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { items: "" },
  reducers: {
    addProfileDetails: (state, action) => {
      state.items = action.payload;
    },
    removeProfileDetails: (state) => {
      state.items = "";
    }
  }
});

export const { addProfileDetails, removeProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;