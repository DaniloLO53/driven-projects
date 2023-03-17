import React, { useEffect, useState } from 'react';
import Post from './Post';

function Posts(props) {
  const postsInitialInfos = [
    {
      author: 'meowed',
      image: 'gato-telefone',
      likesUser: 'respondeai',
      likesCounter: 101523,
      comments: [
        {
          author: 'smallcutecats',
          text: 'Que fofo s2s2'
        },
        {
          author: 'bad.vibes.memes',
          text: 'Sem graça'
        },
        {
          author: 'adorable_animals',
          text: 'Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada. Era uma casa muito engraçada, não tinha teto, não tinha nada.'
        },
      ],
    },
    {
      author: 'barked',
      image: 'dog',
      likesUser: 'adorable_animals',
      likesCounter: 99159,
      comments: [
        {
          author: 'smallcutecats',
          text: 'Que fofo s2s2'
        },
        {
          author: 'bad.vibes.memes',
          text: 'Sem graça'
        },
        {
          author: 'adorable_animals',
          text: 'Lindinho'
        },
      ],
    },
    {
      author: 'chibirdart',
      image: 'dog',
      likesUser: 'smallcutecats',
      likesCounter: 85123,
      comments: [
        {
          author: 'smallcutecats',
          text: 'Que fofo s2s2'
        },
        {
          author: 'bad.vibes.memes',
          text: 'Sem graça'
        },
        {
          author: 'adorable_animals',
          text: 'Lindinho'
        },
      ],
    },
  ];

  const [infos, setInfos] = useState(postsInitialInfos);

  const insertComment = (index, commentObject) => {
    setInfos((prevState) => {
      prevState[index].comments.push(commentObject);
      return [...prevState];
    });
  }

  const { userName, setUserName } = props;

  const post = infos.map(({
    author,
    image,
    likesUser,
    likesCounter,
    comments,
  }, index) => {

    return (
      <Post
        key={author}
        author={author}
        image={image}
        likesUser={likesUser}
        likesCounter={likesCounter}
        comments={comments}
        userName={userName}
        setUserName={setUserName}
        index={index}
        insertComment={insertComment}
      />
    );
  });

  return (
    <div>
      <div className="posts">
        {post}
      </div>
    </div>
  );
}

export default Posts;
