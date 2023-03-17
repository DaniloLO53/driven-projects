import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function QuestionExpanded({
  data, setQuestionState, setExpand, setAnswereds,
}) {
  const { answer, question } = data;
  const [text, setText] = useState(question);

  console.log(answer);

  const questionStateHandle = ({ name }) => {
    switch (name) {
      case 'icone_erro':
        setQuestionState('icone_erro');
        setAnswereds((prevState) => [...prevState, 'icone_erro']);
        break;
      case 'icone_quase':
        setQuestionState('icone_quase');
        setAnswereds((prevState) => [...prevState, 'icone_quase']);
        break;
      case 'icone_certo':
        setQuestionState('icone_certo');
        setAnswereds((prevState) => [...prevState, 'icone_certo']);
        break;
      default:
        console.log('seta_play');
    }

    setExpand(false);
  };

  const buttons = (
    <StyledButtonsContainer>
      <StyledButton
        type="button"
        name="icone_erro"
        backgroundColor="red"
        data-test="no-btn"
        onClick={({ target }) => questionStateHandle(target)}
      >
        Não lembrei
      </StyledButton>
      <StyledButton
        type="button"
        backgroundColor="#ff922e"
        data-test="partial-btn"
        name="icone_quase"
        onClick={({ target }) => questionStateHandle(target)}
      >
        Quase não lembrei
      </StyledButton>
      <StyledButton
        type="button"
        backgroundColor="#2fbe34"
        data-test="zap-btn"
        name="icone_certo"
        onClick={({ target }) => questionStateHandle(target)}
      >
        Zap!
      </StyledButton>
    </StyledButtonsContainer>
  );

  return (
    <StyledQuestionExpandedContainer>
      <p>{text}</p>
      <StyledFooter>
        {text === question ? (
          <StyledFlipButton
            type="button"
            onClick={() => setText(answer)}
            data-test="turn-btn"
          >
            <img
              alt="show_answer"
              src="/img/seta_virar.png"
            />
          </StyledFlipButton>
        ) : buttons}

      </StyledFooter>
    </StyledQuestionExpandedContainer>
  );
}

const StyledQuestionExpandedContainer = styled.div`
  width: 300px;
  margin: 12px;
  padding: 15px;
  min-height: 100px;
  background: #FFFFD5;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 25px;
  }

  &button:first-of-type {
    background-color: transparent;
    border: none;
  }
`;

const StyledFlipButton = styled.button`
  background-color: transparent;
  border: none;
`;

const StyledFooter = styled.div`
  text-align: end;
  font-size: 20px;
`;

const StyledButton = styled.button`
  width: 90px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  border: none;
  padding:5px;
  margin: 5px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
`;

QuestionExpanded.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  setQuestionState: PropTypes.func.isRequired,
  setExpand: PropTypes.func.isRequired,
  setAnswereds: PropTypes.func.isRequired,
};

export default QuestionExpanded;
