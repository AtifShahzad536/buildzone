import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('buildzone_auth_user');
const storedToken = localStorage.getItem('buildzone_auth_token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: Boolean(storedToken),
  currentRole: storedUser ? JSON.parse(storedUser).role : 'Admin',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.currentRole = action.payload.user.role || 'Admin';
      localStorage.setItem('buildzone_auth_user', JSON.stringify(action.payload.user));
      localStorage.setItem('buildzone_auth_token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setRole: (state, action) => {
      state.currentRole = action.payload;
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem('buildzone_auth_user', JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.currentRole = 'Admin';
      localStorage.removeItem('buildzone_auth_user');
      localStorage.removeItem('buildzone_auth_token');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, setRole, logout } = authSlice.actions;
export default authSlice.reducer;
