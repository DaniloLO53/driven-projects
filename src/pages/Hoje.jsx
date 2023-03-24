import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Context from '../context/Context';
import 'dayjs/locale/pt-br';
import Habito from '../components/Habito';

function Hoje() {
  const { signupData } = useContext(Context);
  const { data } = signupData;
  const { token } = data;
  const [habits, setHabits] = useState([]);
  const [reload, setReload] = useState(false);

  const today = dayjs().locale('pt-br').format('dddd, DD/MM');

  const percentage = (Number(habits?.data?.filter(
    ({ done }) => done === true,
  ).length) / Number(habits?.data?.length)) * 100;
  const effectivePercentage = Number.isNaN(percentage) ? 0 : Math.round(percentage);

  const markHabit = (value, id) => {
    try {
      const CHECK_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
      const UNCHECK_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(value ? CHECK_URL : UNCHECK_URL, {}, config);
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    } finally {
      setReload(!reload);
    }
  };

  useEffect(() => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const controller = new AbortController();
    const { signal } = controller;

    const fetcher = async () => {
      try {
        const habitsFetched = await axios.get(URL, config, { signal });
        setHabits(habitsFetched);
      } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
      }
    };
    fetcher();

    return () => {
      console.log('Cleaning');
      controller.abort();
    };
  }, [reload]);

  return (
    <div>
      <Header />
      <Body>
        <div>
          <h1>{today[0].toUpperCase() + today.slice(1)}</h1>
          {effectivePercentage === 0 ? <p>Nenhum hábito concluído ainda</p> : (
            <p>
              {effectivePercentage}
              %
              {' '}
              dos hábitos concluídos
            </p>
          )}
        </div>
        <div name="habit">
          {habits?.data?.map(({
            name, currentSequence, highestSequence, id,
          }) => (
            <Habito
              habits={habits}
              markHabit={markHabit}
              name={name}
              currentSequence={currentSequence}
              highestSequence={highestSequence}
              id={id}
            />
          ))}

        </div>
      </Body>
      <Menu effectivePercentage={effectivePercentage} />
    </div>
  );
}

const Body = styled.div`
  /* background-color: red; */
  position: relative;
  top: 70px;
  height: calc(100vh - 190px);
  padding: 15px;

  & > div > p:first-of-type {
    /* background-color: red; */
    color: #8fc549;
    font-size: 20px;
  }

  div[name=habit] > div {
    background-color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    label {
      background-color: green;
      height: 80px;
      width: 80px;

      input {
        width: 100%;
        height: 100%;

        background-color: ${({ value }) => (value === true ? 'green' : 'red')};
      }
    }
  }
`;

export default Hoje;
