import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './upload.slice';

export default configureStore({
  reducer: {
    upload: uploadReducer,
  },
});
