import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 'All',
  selectedLeadId: null,
  isDrawerOpen: false,
  searchTerm: '',
};

export const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSelectedLeadId: (state, action) => {
      state.selectedLeadId = action.payload;
    },
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setActiveFilter, setSelectedLeadId, setIsDrawerOpen, setSearchTerm } = leadSlice.actions;
export default leadSlice.reducer;
