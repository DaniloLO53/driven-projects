import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../context/Context';

function Login() {
  const { loading, setLoading } = useContext(Context);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const { setSignupData } = useContext(Context);

  const handleClick = () => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
    const payload = {
      email,
      password,
    };
    const controller = new AbortController();
    // const { signal } = controller;

    setLoading(true);

    const fetcher = async () => {
      try {
        const dataFetched = await axios.post(URL, payload);
        setSignupData(dataFetched);
        setLoading(false);
        navigate('/hoje');
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetcher();

    return () => {
      console.log('Cleaning');
      controller.abort();
    };
  };

  console.log(loading);

  return (
    <StyledLogin>
      <figure>
        <img alt="login" src="./logo.png" />
      </figure>

      <form>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>

        <button
          type="button"
          onClick={() => handleClick()}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => navigate('/cadastro')}
        >
          Não tem uma conta? Cadastre-se!
        </button>
      </form>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  form {
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    width: 80%;

    label {
      /* background-color: purple; */
      width: 100%;
      display: flex;
      justify-content: center;

      input {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        padding: 0 7px 0 7px;
        border: 1px solid #d4d4d4;
        margin: 5px;
      }
    }

    button:first-of-type {
      background-color: #52B6FF;
      min-height: 40px;
      font-size: 20px;
      padding: 10px;
      color: white;
      margin-top: 5px;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button:nth-of-type(2) {
      background-color: transparent;
      color: #52B6FF;
      text-decoration: underline;
      border: none;
      margin-top: 30px;
    }
  }
`;

export { Login, StyledLogin };
