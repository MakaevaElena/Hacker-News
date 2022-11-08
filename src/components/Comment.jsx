import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment } from 'antd';
import { BASE_API_URL } from '../const';

const CommentsList = (comment) => {
  const [commentKids, setCommentKids] = React.useState([]);

  function fetchKidsComments() {
    let totalKidsComments = [];
    if (comment.kids)
      comment.kids.forEach((id) =>
        fetch(`${BASE_API_URL}/item/${id}.json?print=pretty`)
          .then((res) => res.json())
          .then((comment) => {
            // console.log(comment);
            setCommentKids((totalKidsComments = [...totalKidsComments, comment]));
            console.log('totalKidsComments', totalKidsComments);
          }),
      );
  }

  return (
    <Comment
      className="comment"
      author={comment.by}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="avatar" />}
      content={comment.text}
      datetime={new Date(comment.time).toLocaleString()}
      onClick={() => fetchKidsComments()}>
      {/* <div onClick={() => fetchKidsComments()} className="comment"> */}
      {/* <p>Author: {comment.by}</p> */}
      {/* <p>Text: {comment.text}</p> */}
      {/* <p>ID: {comment.id}</p> */}
      {/* <p>Time: {comment.time}</p> */}
      {/* <p>ParentID: {comment.parent}</p> */}
      <p>comments number: {comment.kids ? comment.kids.length : 0}</p>
      {commentKids.map((kid) => (
        <CommentsList key={kid.id} {...kid} />
      ))}
      <br />
    </Comment>
  );
};

export default CommentsList;
