import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ContextProvider from './context/ContextProvider';
import Cadastro from './pages/Cadastro';
import Habitos from './pages/Habitos';
import Historico from './pages/Historico';
import Hoje from './pages/Hoje';
import { Login } from './pages/Login';

function App() {
  return (
    <StyledContainer>
      <ContextProvider>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Hoje />} path="/hoje" />
          <Route element={<Cadastro />} path="/cadastro" />
          <Route element={<Habitos />} path="/habitos" />
          <Route element={<Historico />} path="/historico" />
        </Routes>
      </ContextProvider>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* background-color: yellow; */
`;

export default App;
