import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Welcome({ setStartGame }) {
  console.log(2);
  return (
    <StyledWelcomeContainer>
      <img
        alt="Logo"
        src="./img/logo.png"
      />
      <p>ZapRecall</p>
      <button
        type="button"
        onClick={() => setStartGame(true)}
        data-test="start-btn"
      >
        Iniciar Recall!!
      </button>
    </StyledWelcomeContainer>
  );
}

const StyledWelcomeContainer = styled.div`
  background-color: #FB6B6B;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  padding-bottom: 200px;
  overflow-y: hidden;

  p {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 45px;
    color: #FFFFFF;
    margin-left: 20px;
    margin: 30px 0 30px 0;
  }

  button {
    /* width: 300px; */
    height: 35px;
    background-color: #FFFFFF;
    margin: 12px;
    padding: 30px 60px 30px 60px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #d70900;
  }
`;

Welcome.propTypes = {
  setStartGame: PropTypes.func.isRequired,
};

export default Welcome;
