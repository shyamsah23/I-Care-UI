import { createSlice } from "@reduxjs/toolkit";

const PrescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    selectedPrescriptionId: null,
  },
  reducers: {
    setPrescription: (state, action) => {
      state.selectedPrescriptionId = action.payload;
    },
  },
});

export const { setPrescription } = PrescriptionSlice.actions;
export default PrescriptionSlice.reducer;
