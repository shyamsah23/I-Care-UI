import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: { decoded: localStorage.getItem("jwtToken") ? jwtDecode(localStorage.getItem("jwtToken") || '') : {} },
  reducers: {
    removeUserDetails: (state) => {
      state.decoded = {}
    },
    addUserDetails: (state,action) => {
      state.decoded = action.payload;
    },
  },
});

export const { removeUserDetails,addUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
