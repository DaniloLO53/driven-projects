/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Success({ finalInfos, setFinalInfos }) {
  const {
    movie, date, time, seats, client, cpf,
  } = finalInfos;

  useEffect(() => () => setFinalInfos({
    movie: '',
    date: '',
    time: '',
    seats: [],
    client: '',
    cpf: '',
    weekday: '',
  }));

  return (
    <StyledSuccess>
      <h1>Pedido feito com sucesso!</h1>
      <div data-test="movie-info">
        <h3>Filme e sessão</h3>
        <p>{movie}</p>
        <p>
          {date}
          {' '}
          {time}
          {' '}
        </p>
      </div>

      <div data-test="seats-info">
        <h3>Ingressos</h3>
        {seats.map((info) => (
          <p key={info[0]}>
            Assento
            {' '}
            {info[1]}
            {' '}
          </p>
        ))}
      </div>

      <div data-test="client-info">
        <h3>Comprador</h3>
        <p>
          Nome:
          {' '}
          {client}
          {' '}
        </p>
        <p>
          CPF:
          {' '}
          {cpf}
          {' '}
        </p>
      </div>

      <StyledButton
        type="button"
        data-test="go-home-btn"
      >
        <Link to="/">
          Voltar para Home
        </Link>
      </StyledButton>

    </StyledSuccess>
  );
}

const StyledSuccess = styled.div`
  display: flex;
  flex-direction: column;

  & h1 {
    text-align: center;
    padding: 10px 130px 10px 130px;
    color: green;
  }

  & div {
    padding: 15px;
    font-size: 20px;
  }
`;

const StyledButton = styled.button`
  width: 200px;
  position: relative;
  left: 50%;
  padding: 15px 10px 15px 10px;
  font-size: 18px;
  margin-top: 60px;
  border-radius: 5px;
  border: none;
  background-color:  #E8833A;
  color: white;
  transform: translate(-50%);

  & a {
    text-decoration: none;
    color: white;
  }

  &:visited {
    text-decoration: none;
    color: white;
  }
`;

Success.propTypes = {
  finalInfos: PropTypes.shape(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  ).isRequired,
  setFinalInfos: PropTypes.func.isRequired,
};

export default Success;
