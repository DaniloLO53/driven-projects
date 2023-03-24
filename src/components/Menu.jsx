/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PropTypes from 'prop-types';

function Menu({ effectivePercentage }) {
  const navigate = useNavigate();
  console.log(effectivePercentage);

  return (
    <StyledMenu>
      <button
        type="button"
        onClick={() => navigate('/habitos')}
      >
        Hábitos
      </button>
      <ProgressButton
        type="button"
        onClick={() => navigate('/hoje')}
      >
        <CircularProgressbar
          value={effectivePercentage}
          text="Hoje"
          strokeWidth={10}
          styles={buildStyles({
            textColor: 'white',
            pathColor: 'white',
            trailColor: '#52b6ff',
            strokeLinecap: 'round',
          })}
        />
      </ProgressButton>
      <button
        type="button"
        onClick={() => navigate('/historico')}
      >
        Histórico
      </button>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  /* background-color: purple; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120px;
  padding: 40px;

  button {
    /* background-color: transparent; */
    border: none;
  }
`;

const ProgressButton = styled.button`
  background-color: #52b6ff;
  border-radius: 50%;
  width: 25%;
  padding: 8px;

  svg text {
      transform: translate(-19%, 5%);
      font-size: 20px;
    }
`;

Menu.propTypes = {
  effectivePercentage: PropTypes.number.isRequired,
};

export default Menu;
