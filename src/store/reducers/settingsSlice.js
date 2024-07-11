import {createSlice} from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {},
  reducers: {
    setSettings: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
