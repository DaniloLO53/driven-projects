import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Menu from '../components/Menu';

function Historico() {
  return (
    <div>
      <Header />
      <StyledHistorico>
        <h4>Histórico</h4>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </StyledHistorico>
      <Menu />
    </div>
  );
}

const StyledHistorico = styled.div`
  position: relative;
  top: 70px;
  height: calc(100vh - 190px);
  padding: 15px;

  h4 {
    font-size: 22px;
    font-weight: 400;
    color: #126ba5;
  }
`;

export default Historico;
