import { configureStore } from '@reduxjs/toolkit';
import { authReducer, chatsReducer, contactsReducer } from './modules';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    chats: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
