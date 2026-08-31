import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  projectModalOpen: false,
  activeEstimatorStep: 1,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    setProjectModalOpen: (state, action) => {
      state.projectModalOpen = action.payload;
    },
    setEstimatorStep: (state, action) => {
      state.activeEstimatorStep = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenuOpen, setProjectModalOpen, setEstimatorStep } = uiSlice.actions;
export default uiSlice.reducer;
