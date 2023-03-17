/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Corpo from './components/Corpo';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Corpo />
      <div className="fundo-mobile">
        <ion-icon name="home" />
        <ion-icon name="search-outline" />
        <ion-icon name="add-circle-outline" />
        <ion-icon name="heart-outline" />
        <ion-icon name="person-outline" />
      </div>
    </div>
  );
}

export default App;
