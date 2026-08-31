import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import leadReducer from '../features/leads/leadSlice';
import settingsReducer from '../features/settings/settingsSlice';
import uiReducer from '../features/ui/uiSlice';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadReducer,
    settings: settingsReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
