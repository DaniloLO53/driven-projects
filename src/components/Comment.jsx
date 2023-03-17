import React, { useState } from "react";

function Comment(props) {
  const { comment } = props;

  const [liked, setLiked] = useState(false);

  return (
    <div className="comment">
      <div className="infos">
        <span>
          <strong>{comment.author}</strong>
        </span><span>{comment.text}</span>
      </div>
      <button onClick={() => setLiked((prevState) => !prevState)}>
        <ion-icon
          name={liked ? 'heart' : 'heart-outline'}
          className="heart-comment"
        />
      </button>
    </div>
  );
};

export default Comment;
