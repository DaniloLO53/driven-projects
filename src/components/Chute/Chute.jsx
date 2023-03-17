/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Chute(props) {
  const [inputValue, setInputValue] = useState('');
  const { word, setWord, setErrors, setDisabled, disabled } = props;

  return (
    <StyledGuessContainer>
      <p>Já sei a palavra!</p>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        data-test="guess-button"
        disabled={disabled || word.word === word.withBlanks()}

      />
      <StyledButton
        type="button"
        disabled={disabled || word.word === word.withBlanks()}
        onClick={() => {
          setErrors((prevState) => inputValue === word.word ? prevState : 6);
          setDisabled(true);
          setWord((prevState) => ({
            ...prevState,
            withBlanks: function () {
              return word.word;
            }
          }));
        }}
        data-test="guess-input"

      >
        Chutar
      </StyledButton>
    </StyledGuessContainer>
  );
}

const StyledGuessContainer = styled.div`
  width: 56%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  font-size: 20px;
  margin-top: 60px;
`;

const StyledInput = styled.input`
  height: 100%;
  width: 60%;
  border-radius: 7px;
  border: 1px solid #cccccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  padding: 10px 20px 10px 20px;
`;

const StyledButton = styled.button`
  font-size: 20px;
  width: 100px;
  height: 100%;
  background-color: #e1ecf4;
  border: 1px solid #7aa7c7;
  border-radius: 7px;
  color: #7aa7c7;
  &:disabled {
    opacity: 0.5;
  }
`;

Chute.propTypes = {
  word: PropTypes.object.isRequired,
  setWord: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setDisabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Chute;
