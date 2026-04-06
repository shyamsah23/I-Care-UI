import { configureStore } from '@reduxjs/toolkit';
import JwTSliceReducer from "./Slices/AuthSlice";
import UserSliceReducer from "./Slices/UserSlice";
import profileSliceReducer from "./Slices/ProfileSlice";
import cartSliceReducer from "./Slices/CartSlice";
import PrescriptionSliceReducer from "./Slices/PrescriptionSlice";
import SidebarSliceReducer from "./Slices/SidebarSlice";
import NotificationSliceReducer from "./Slices/NotificationSlice";

const appStore = configureStore({
  reducer: {
    jwtSlice: JwTSliceReducer,
    userSlice: UserSliceReducer,
    profileSlice: profileSliceReducer,
    cart: cartSliceReducer,
    prescription: PrescriptionSliceReducer,
    sidebar: SidebarSliceReducer,
    notifications: NotificationSliceReducer,
  },
});

export default appStore;