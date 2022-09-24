import { configureStore } from '@reduxjs/toolkit';
import { authReducer, contactsReducer } from './modules';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
