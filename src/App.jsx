/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Jogo from "./components/Jogo/Jogo";
import Chute from "./components/Chute/Chute";
import Letras from "./components/Letras/Letras";
import styled from 'styled-components';
import alfabeto from './alfabeto';
import palavras from './palavras';

function App() {
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(0);
  const [choosedLetters, setChoosedLetters] = useState([]);
  const [word, setWord] = useState({
    word: palavras[Math.floor(Math.random() * palavras.length)],
    withBlanks: function () {
      return this.word.split('').map(() => '_').join('');
    },
  });

  const disableWhenLoose = () => {
    if (errors === 5 || word.withBlanks() === word.word) {
      setDisabled(true);
    }
  };

  return (
    <StyledContainer>
      <Jogo
        errors={errors}
        setErrors={setErrors}
        setWord={setWord}
        word={word}
        setDisabled={setDisabled}
        disabled={disabled}
        setChoosedLetters={setChoosedLetters}
        choosedLetters={choosedLetters}
      />
      <Letras
        alfabeto={alfabeto}
        setErrors={setErrors}
        setWord={setWord}
        word={word}
        disabled={disabled}
        setChoosedLetters={setChoosedLetters}
        choosedLetters={choosedLetters}
        disableWhenLoose={disableWhenLoose}
      />
      <Chute
        setErrors={setErrors}
        word={word}
        setWord={setWord}
        setDisabled={setDisabled}
        disabled={disabled}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export default App;
