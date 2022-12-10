import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../features/map/mapSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    users: usersReducer
  },
});
