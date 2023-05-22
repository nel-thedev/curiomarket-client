import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <h4>@ {comment.author.fullName}:</h4>
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
