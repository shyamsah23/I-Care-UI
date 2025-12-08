import { configureStore } from '@reduxjs/toolkit';
// import JwTSliceReducer from "./Slices/JwtSlice";
// import { } from "./Slices/JwtSlice";
import JwTSliceReducer from "./Slices/AuthSlice";
import UserSliceReducer from "./Slices/UserSlice";
import profileSliceReducer from "./Slices/ProfileSlice";

const appStore = configureStore({
  reducer: {
    jwtSlice: JwTSliceReducer,
    userSlice: UserSliceReducer,
    profileSlice: profileSliceReducer
  }
});

export default appStore;