import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../const';

//////////////////////
// function getNewsIds() {
//   fetch(`${BASE_API_URL}/newstories.json?print=pretty`)
//     .then((res) => res.json())
//     .then((arr) => arr.slice(0, 100))
//     // .then((arr) => console.log(arr));
//     .then((arr) => {
//       console.log(arr);
//       return arr;
//     });
// }

// при запросе fetch нужно использовать async-await вместо .then
async function getNewsIds() {
  const response = await fetch(`${BASE_API_URL}/newstories.json?print=pretty`);
  const newsIds = await response.json();
  return newsIds.slice(0, 100);
}

export const fetchNewsIds = createAsyncThunk('news/fetchNewsIds', async () => getNewsIds());
/////////////////////
const initialState = {
  isLoading: true,
  newsIds: [],
  news: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // setNewsIds: (state, action) => {
    //   state.newsIds = action.payload;
    // },
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsIds.pending, (state, action) => {
      state.isLoading = 'true';
    });
    builder.addCase(fetchNewsIds.fulfilled, (state, action) => {
      state.isLoading = 'false';
      state.newsIds = action.payload;
    });
  },
});

export const { setIsLoading, setNewsIds, setNews } = newsSlice.actions;

export default newsSlice.reducer;
