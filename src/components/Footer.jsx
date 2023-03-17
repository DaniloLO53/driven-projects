import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Footer({ answereds, cardsLength }) {
  const icons = answereds.map((state) => (
    <StyledIcons
      alt="icon"
      src={`./img/${state}.png`}
    />
  ));

  const message = () => {
    const WIN = ['party', 'Parabéns!', 'Você não esqueceu de nenhum flashcard!'];
    const LOOSE = ['sad', 'Putz...', 'Ainda faltam alguns... Mas não desanime!'];

    return answereds.includes('icone_erro') ? LOOSE : WIN;
  };

  return (
    <StyledFooterContainer>
      {answereds.length === cardsLength && (
        <StyledMessage>
          <div data-test="finish-text">
            <img src={`./img/${message()[0]}.png`} alt="icon" />
            <span>{message()[1]}</span>
          </div>
          <div>
            {message()[2]}
          </div>
        </StyledMessage>
      )}

      <div>
        {`${answereds.length}/${cardsLength} CONCLUÍDOS  `}
      </div>
      <div>
        {icons}
      </div>
    </StyledFooterContainer>
  );
}

const StyledMessage = styled.div`
  div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  img {
    width: 30px;
  }
`;

const StyledFooterContainer = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: #FFFFFF;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Recursive';
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  padding: 10px;

  div {
    /* background-color: pink; */
    margin: 15px;
  }

  div:first-of-type div:first-of-type {
    display: flex;
    font-weight: 700;
  }

  div:first-of-type div:first-of-type * {
    margin: 3px;
  }

  div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    text-align: center;
  }
`;

const StyledIcons = styled.img`
  margin: 3px;
`;

Footer.propTypes = {
  answereds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  cardsLength: PropTypes.number.isRequired,
};

export default Footer;
