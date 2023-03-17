import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import cards from '../utils/cards';

import '../assets/css/reset.css';
import Footer from './Footer';
import Questions from './Questions';

function Game() {
  const [answereds, setAnswereds] = useState([]);

  return (
    <StyledGreatContainer>
      <StyledLogoContainer>
        <img alt="Logo" src="./img/logo.png" />
        <h1>ZapRecall</h1>
      </StyledLogoContainer>
      <Questions
        cards={cards}
        setAnswereds={setAnswereds}
      />
      <Footer
        answereds={answereds}
        cardsLength={cards.length}
        data-test="footer"
      />
    </StyledGreatContainer>
  );
}

const StyledGreatContainer = styled.div`
  background-color: #FB6B6B;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;
  padding-bottom: 200px;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 20px 0;

  img {
    width: 52px;
  }

  h1 {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 45px;
    color: #FFFFFF;
    margin-left: 20px;
  }
`;

export default Game;
