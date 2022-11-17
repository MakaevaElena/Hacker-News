import React from 'react';
import NewsBlock from '../components/NewsBlock';
// import { BASE_API_URL } from '../const.jsx';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, fetchNewsIds, fetchStories } from '../redux/slices/newsSlice';

const Home = (props) => {
  const dispatch = useDispatch();

  const newsIds = useSelector((state) => state.news.newsIds);
  const news = useSelector((state) => state.news.news);
  const isLoading = useSelector((state) => state.news.isLoading);
  // console.log(newsIds);
  // console.log(news);
  console.log(isLoading);

  React.useEffect(() => {
    dispatch(fetchNewsIds());
    dispatch(fetchStories(newsIds));
    // setInterval(fetchStories, 10 * 60 * 1000);
    dispatch(setIsLoading(false));
  }, []);

  return (
    <div className="home">
      <Button type="ghost" onClick={() => dispatch(fetchStories(newsIds))}>
        Обновить новости
      </Button>
      <div className="content__items">
        {isLoading ? <p>Загрузка</p> : ''}
        {news.map((obj) => (
          <NewsBlock key={obj.id} {...obj} /> //передали в пропсы все поля объекта
        ))}
      </div>
    </div>
  );
};

export default Home;
