import { configureStore } from '@reduxjs/toolkit';
import JwTSliceReducer from "./Slices/JWTSlice"
import UserSliceReducer from "./Slices/UserSlice"
import profileSliceReducer from "./Slices/ProfileSlice";

const appStore = configureStore({
  reducer: {
    jwtSlice: JwTSliceReducer,
    userSlice: UserSliceReducer,
    profileSlice: profileSliceReducer
  }
});

export default appStore;