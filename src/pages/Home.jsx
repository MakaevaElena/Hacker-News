import React from 'react';
import NewsBlock from '../components/NewsBlock';
import { BASE_API_URL } from '../const.jsx';
import { Button } from 'antd';
import { fetchNewsIds } from '../redux/slices/newsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setNews } from '../redux/slices/newsSlice';

const Home = (props) => {
  const dispatch = useDispatch();

  const newsIds = useSelector((state) => state.news.newsIds);
  const news = useSelector((state) => state.news.news);
  const isLoading = useSelector((state) => state.news.isLoading);
  console.log(newsIds);
  // console.log(news);
  // console.log(isLoading);

  React.useEffect(() => {
    dispatch(fetchNewsIds());
    // fetchNewsIds();
    fetchStories();
    // setInterval(fetchStories, 10 * 60 * 1000);
    setIsLoading(false);
  }, [dispatch]);

  // function fetchNewsIds() {
  //   fetch(`${BASE_API_URL}/newstories.json?print=pretty`)
  //     .then((res) => res.json())
  //     .then((arr) => {
  //       const newsIds = arr.slice(0, 100);
  //       dispatch(setNewsIds(newsIds));
  //       // console.log('fetchNewsIds', newsIds);
  //     });
  // }

  function fetchStories() {
    let stories = [];
    newsIds.forEach((storyId) => {
      fetch(`${BASE_API_URL}/item/${storyId}.json?print=pretty`)
        .then((res) => res.json())
        .then((story) => {
          stories = [...stories, story];
          dispatch(setNews(stories));
        });
    });
  }

  return (
    <div className="home">
      <Button type="ghost" onClick={() => fetchStories()}>
        Обновить новости
      </Button>
      <div className="content__items">
        {isLoading && <p>Загрузка</p>}
        {news.map((obj) => (
          <NewsBlock key={obj.id} {...obj} /> //передали в пропсы все поля объекта
        ))}
      </div>
    </div>
  );
};

export default Home;
