import React from "react";
import Comment from "./Comment";

function Comments(props) {
  const { comments } = props;
  const commentsComponent = comments.map((comment, index) => <Comment
    comment={comment}
    key={String(comment.author.length).concat(comment.text.length + index)}
  />);

  return (
    <div>
      {commentsComponent}
    </div>
  );
};

export default Comments;
