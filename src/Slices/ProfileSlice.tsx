import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { items: "" },
  reducers: {
    addProfileDetails: (state, action) => {
      state.items = action.payload;
      return state;
    },
    removeProfileDetails: (state) => {
      state.items="";
      return state;
    }
  }
});

export const { addProfileDetails, removeProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;