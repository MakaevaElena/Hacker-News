import React from 'react';
import { Link } from 'react-router-dom';

const NewsBlock = (news) => {
  const date = new Date(news.time * 1000);
  return (
    <div className="news_block">
      <div>
        <Link className="text-link" to={`/story/${news.id}`}>
          <h2>{news.title}</h2>
        </Link>
      </div>
      <div>
        <p>Autor: {news.by}</p>
        <p>Score: {news.score}</p>
        <p>Date: {date.toLocaleString()}</p>
        <p>comments number: {news.kids ? news.kids.length : 0}</p>
        <Link className="text-link" to={`/story/${news.id}`}>
          {news.kids && <p> {news.kids ? 'read comments' : ''}</p>}
        </Link>
      </div>
    </div>
  );
};

export default NewsBlock;
