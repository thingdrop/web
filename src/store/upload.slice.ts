import { createSlice } from '@reduxjs/toolkit';

const initialUpload = {
  progress: 0,
  status: 'PROGRESS',
  error: null,
};
export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    uploads: {},
  },
  reducers: {
    addUpload: (state, action) => {
      const { id } = action.payload;
      state.uploads[id] = { ...initialUpload };
    },
    updateUpload: (state, action) => {
      const { id, ...update } = action.payload;
      const upload = state.uploads[id];
      state.uploads[id] = {
        ...upload,
        ...update,
      };

      if (update.progress === 100) {
        state.uploads[id].status = 'COMPLETE';
      }
    },
  },
});

export const { addUpload, updateUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
