import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import userReducer from './user.slice';
import uploadReducer from './upload.slice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    upload: uploadReducer,
  },
});
