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
    // setProgress: (state, action) => {
    //   const { id, progress } = action.payload;
    //   state.uploads[id] = progress;

    //   const groupProgress = Object.values(state.uploads).reduce<number>(
    //     (total: number, value: number) => total + value,
    //     0,
    //   );

    //   const total = 100 * Object.keys(state.uploads).length;

    //   const normalizedProgress = (groupProgress / total) * 100;
    //   console.log({ groupProgress, total, normalizedProgress, state });
    //   if (normalizedProgress === 100) {
    //     state.status = 'COMPLETE';
    //   }
    //   state.progress = normalizedProgress;
    // },
  },
});

export const { addUpload, updateUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
