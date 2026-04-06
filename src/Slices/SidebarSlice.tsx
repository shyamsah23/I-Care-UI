import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isSidebarCollapsed: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
});

export const { toggleSidebar } = SidebarSlice.actions;
export default SidebarSlice.reducer;
