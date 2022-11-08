import React from 'react';
import NewsBlock from '../components/NewsBlock';
import { BASE_API_URL } from '../const.jsx';
import { Button } from 'antd';

const Home = (props) => {
  const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStories();
    setInterval(fetchStories, 10 * 60 * 1000); //поменять обновление на 1 раз в минуту
    // setIsLoading(false);
  }, []);

  function fetchStories() {
    let stories = [];
    fetch(`${BASE_API_URL}/newstories.json?print=pretty`)
      .then((res) => res.json())
      .then((arr) => {
        const newsIds = arr.slice(0, 100);
        newsIds.forEach((storyId) => {
          fetch(`${BASE_API_URL}/item/${storyId}.json?print=pretty`)
            .then((res) => res.json())
            .then((story) => setItems((stories = [...stories, story])));
        });
      });
    console.log('fetchStories', items);
  }

  return (
    <div className="home">
      <Button type="ghost" onClick={() => fetchStories()}>
        Обновить новости
      </Button>
      <div className="content__items">
        {items.map((obj) => (
          <NewsBlock key={obj.id} {...obj} /> //передали в пропсы все поля объекта
        ))}
      </div>
    </div>
  );
};

export default Home;
