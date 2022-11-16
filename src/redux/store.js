import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
