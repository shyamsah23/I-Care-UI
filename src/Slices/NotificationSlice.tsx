import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notifications",
  initialState: [] as any[],
  reducers: {
    addNotification: (state, action) => {
      state.unshift({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || "info",
        time: new Date().toLocaleTimeString(),
      });

      // keeping max 100 (prevent memory issue)
      if (state.length > 100) state.pop();
    },

    clearNotifications: () => [],
  },
});

export const { addNotification, clearNotifications } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
