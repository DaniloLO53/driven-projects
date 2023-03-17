/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentInput from './CommentInput';

function Post(props) {
  const {
    author,
    image,
    likesUser,
    likesCounter,
    comments,
    userName,
    setUserName,
    insertComment,
    index,
  } = props;

  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [imageHeartHandle, setImageHeartHandle] = useState('heart-hide');

  const doubleClickHandle = () => {
    setPostLiked(true);
    setImageClicked((prevState) => !prevState);

    if (imageClicked) {
      setImageHeartHandle('heart-animation');
    } else {
      setImageHeartHandle('heart-animation2');
    }
  };

  const formater = new Intl.NumberFormat('pt-BR', {
    maximumSignificantDigits: 6,
  });
  const clickedCounterFormated = formater.format(likesCounter);
  const counterFormated = formater.format(likesCounter + 1);

  return (
    <div className="post" data-test="post">
      <div className="topo">
        <div className="usuario">
          <img src={`assets/${author}.svg`} alt="logo" />
          meowed
        </div>
        <div className="acoes">
          <ion-icon name="ellipsis-horizontal" />
        </div>
      </div>

      <div className="conteudo">
        <img
          src={`assets/${image}.svg`}
          alt="logo"
          onDoubleClick={() => doubleClickHandle()}
          data-test="post-image"
        />
        <ion-icon
          name="heart"
          className={imageHeartHandle}
        />
      </div>

      <div className="fundo">
        <div className="acoes">
          <div>
            <ion-icon
              name={postLiked ? 'heart' : 'heart-outline'}
              onClick={() => setPostLiked((prevState) => !prevState)}
              data-test="like-post"
              className="heart-menu"
            />
            <ion-icon name="chatbubble-outline" />
            <ion-icon name="paper-plane-outline" />
          </div>
          <div>
            <ion-icon
              name={postSaved ? 'bookmark' : 'bookmark-outline'}
              onClick={() => setPostSaved((prevState) => !prevState)}
              data-test="save-post"
            />
          </div>
        </div>

        <div className="curtidas">
          <img src={`assets/${likesUser}.svg`} alt="logo" />
          <div className="texto">
            Curtido por
            {' '}
            <strong>
              {' '}
              {likesUser}
              {' '}
            </strong>
            {' '}
            e outras
            {' '}
            <strong>
              <span data-test="likes-number">
                {postLiked ? counterFormated : clickedCounterFormated}
              </span>
              {' '}
              pessoas
              {' '}
            </strong>
          </div>
        </div>
      </div>
      <Comments comments={comments} insertComment={insertComment} index={index} />
      <CommentInput comments={comments} userName={userName} setUserName={setUserName} insertComment={insertComment} index={index} />
    </div>
  );
}

Post.propTypes = {
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likesUser: PropTypes.string.isRequired,
};

export default Post;
