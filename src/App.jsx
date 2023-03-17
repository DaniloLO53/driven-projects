import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Session from './Session';
import Sessions from './Sessions';
import Success from './Success';

function App() {
  const [finalInfos, setFinalInfos] = useState({
    movie: '',
    date: '',
    time: '',
    seats: [],
    client: '',
    cpf: '',
    weekday: '',
  });
  const [sessions, setSessions] = useState({
    id: 0,
    title: '',
    posterURL: '',
    overview: '',
    releaseDate: '',
    days: [{
      id: 0, weekday: '', date: '', showtimes: [{ name: '', id: 0 }],
    }],
  });

  return (
    <StyledAppContainer>
      <StyledHeader>
        CINEFLEX
      </StyledHeader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sessoes/:idFilme"
          element={(
            <Sessions
              finalInfos={finalInfos}
              sessions={sessions}
              setSessions={setSessions}
              setFinalInfos={setFinalInfos}
            />
          )}
        />
        <Route
          path="/assentos/:idSessao"
          element={(
            <Session
              finalInfos={finalInfos}
              setFinalInfos={setFinalInfos}
              sessions={sessions}
            />
          )}
        />
        <Route
          path="/sucesso"
          element={<Success finalInfos={finalInfos} setFinalInfos={setFinalInfos} />}
        />
      </Routes>
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const StyledHeader = styled.div`
  width: 100%;
  background-color: #c3cfd9;
  color: #e8833a;
  font-size: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default App;
