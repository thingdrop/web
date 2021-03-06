import { createSlice } from '@reduxjs/toolkit';
import { fetcher } from '@/utils';

const initialState = {
  user: {},
  token: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      fetcher.setHeader('authorization', `Bearer ${token}`);
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
