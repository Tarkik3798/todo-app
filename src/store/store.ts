import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todosReducer from './todosSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
