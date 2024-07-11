import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import settingsReducer from './reducers/settingsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsReducer
  },
});
