import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './modules';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
