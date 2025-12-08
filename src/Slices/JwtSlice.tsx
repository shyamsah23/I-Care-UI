import { createSlice } from "@reduxjs/toolkit";

const JwtSlice = createSlice({
  name: "JwtSlice",
  initialState: localStorage.getItem('jwtToken')||'',
  reducers: {
    addJWTToken: (state, action) => {
      localStorage.setItem('jwtToken', action.payload);
      state = action.payload;
      return state;
    },
    deleteJWTToken: (state) => {
      localStorage.removeItem("jwtToken");
      state = '';
      return state;
    },
  },
});

export const { addJWTToken, deleteJWTToken } = JwtSlice.actions;
export default JwtSlice.reducer;
