import React, { useEffect, useState } from "react";

function CommentInput(props) {
  const [comment, setComment] = useState('');
  const [commentDisabled, setCommentDisabled] = useState(true);
  const { userName, insertComment, index } = props;

  const clickHandle = () => {
    const info = {
      author: userName,
      text: comment,
    };

    insertComment(index, info);
  };

  useEffect(() => setCommentDisabled(comment.length === 0), [comment]);

  return (
    <div className="commentInput">
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Comentar"
      />
      <span>
        <button
          type="button"
          disabled={commentDisabled}
          onClick={() => clickHandle()}
        >
          Post
        </button>
      </span>
    </div>
  );
};

export default CommentInput;
