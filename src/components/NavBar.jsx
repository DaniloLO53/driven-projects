import React from 'react';

function NavBar() {
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <ion-icon name="logo-instagram" />
            <div className="separador" />
            <img src="./assets/logo.png" alt="logo" />
          </div>

          <div className="logo-mobile">
            <ion-icon name="logo-instagram" />
          </div>

          <div className="instagram-mobile">
            <img src="./assets/logo.png" alt="logo" />
          </div>

          <div className="pesquisa">
            <input type="text" placeholder="Pesquisar" />
          </div>

          <div className="icones">
            <ion-icon name="paper-plane-outline" />
            <ion-icon name="compass-outline" />
            <ion-icon name="heart-outline" />
            <ion-icon name="person-outline" />
          </div>

          <div className="icones-mobile">
            <ion-icon name="paper-plane-outline" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
