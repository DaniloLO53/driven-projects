import React, { useState } from 'react';

function Usuario(props) {
  const { userName, setUserName } = props;
  const [userImage, setUserImage] = useState('assets/catanacomics.svg');

  const changeUserName = () => {
    let name = prompt('Insira um nome: ');
    if (name.length > 0) {
      setUserName(name);
    } else {
      name = prompt('Insira um nome: ');
    }
  };

  const changeUserImage = () => {
    let image = prompt('Insira um nome para a imagem: ');
    if (image.length > 0) {
      setUserImage(image);
    } else {
      image = prompt('Insira um nome para a imagem: ');
    }
  };

  return (
    <div>
      <div className="usuario-name" data-test="user">
        <button type="button" onClick={() => changeUserImage()}>
          <img
            src={userImage}
            alt="profile-icon"
            data-test="profile-image"
          />
        </button>
        <div className="texto-nome">
          <strong>catanacomics</strong>
          <span data-test="name">
            {userName}
            <ion-icon
              name="pencil"
              data-test="edit-name"
              onClick={() => changeUserName()}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
