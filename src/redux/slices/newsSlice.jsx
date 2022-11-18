import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../const';

//////////////////////

// при запросе fetch нужно использовать async-await вместо .then
async function getNewsIds() {
  const response = await fetch(`${BASE_API_URL}/newstories.json?print=pretty`);
  const newsIds = await response.json();
  return newsIds.slice(0, 100);
}

export const fetchNewsIds = createAsyncThunk('news/fetchNewsIds', async () => getNewsIds());

// async await не работает с forEach - замена на for -of
async function getStories(storyIds) {
  let stories = [];
  for (let storyId of storyIds) {
    const response = await fetch(`${BASE_API_URL}/item/${storyId}.json?print=pretty`);
    const story = await response.json();
    stories = [...stories, story];
    console.log(stories);
    // очень долго загружаются истории 50 секунд и только при нажатиии кнопки
  }
  console.log(stories);
  return stories;
}
export const fetchStories = createAsyncThunk('news/fetchStories', async (storyIds) =>
  getStories(storyIds),
);

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

    // setNews: (state, action) => {
    //   state.news = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsIds.pending, (state, action) => {
      state.isLoading = 'true';
    });
    builder.addCase(fetchNewsIds.fulfilled, (state, action) => {
      state.isLoading = 'false';
      state.newsIds = action.payload;
    });
    builder.addCase(fetchStories.pending, (state, action) => {
      state.isLoading = 'true';
    });
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.news = action.payload;
      state.isLoading = 'false';
    });
  },
});

export const { setIsLoading, setNews } = newsSlice.actions;

export default newsSlice.reducer;
