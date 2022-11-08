import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../const.jsx';
import CommentsList from '../components/Comment';
import { Button, Space } from 'antd';

const StoryPage = () => {
  const navigate = useNavigate();
  const [story, setStory] = React.useState({});
  const [comments, setComments] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    fetchStory();
    setInterval(fetchStory, 10 * 60 * 1000); // поменять на getComment раз в мин 60*1000
  }, []);

  function fetchStory() {
    fetch(`${BASE_API_URL}/item/${id}.json?print=pretty`)
      .then((res) => res.json())
      .then((story) => {
        setStory(story);
        if (story.kids) {
          console.log('fetchStory', story);
          fetchComments(story.kids);
        }
      });
  }

  function fetchComments(storyIds) {
    let totalComments = [];
    storyIds.forEach(
      (id) =>
        fetch(`${BASE_API_URL}/item/${id}.json?print=pretty`)
          .then((res) => res.json())
          .then((comment) => {
            // console.log(comment);
            setComments((totalComments = [...totalComments, comment]));
            console.log('totalComments', totalComments);
          }),
      // .catch(throw new Error('комментарии не получены'));
    );
  }

  const backHome = () => {
    navigate('/');
  };

  return (
    <div className="story">
      <div class="buttons">
        <Space size="small">
          <Button type="ghost" onClick={() => backHome()}>
            back Home
          </Button>
          <Button type="ghost" onClick={() => fetchStory()}>
            fetch comments
          </Button>
          <a href={story.url} className="text-link">
            <Button type="ghost">link</Button>
          </a>
        </Space>
      </div>
      <section className="section">
        <h2>Title: {story.title}</h2>
        <p>Date: {new Date(story.time * 1000).toLocaleString()}</p>
        <p>Author: {story.by}</p>
        <p>comments number: {story.kids ? story.kids.length : 0}</p>
      </section>

      <h2>comments:</h2>
      <div className="commentsList">
        {comments.map((comment) => (
          <CommentsList key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
