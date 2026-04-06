import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getDecodedUser = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) return {};

  try {
    return jwtDecode(token);
  } catch {
    return {};
  }
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    decoded: getDecodedUser(),
  },
  reducers: {
    removeUserDetails: (state) => {
      state.decoded = {};
    },
    addUserDetails: (state, action) => {
      state.decoded = action.payload;
    },
  },
});

export const { removeUserDetails, addUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
