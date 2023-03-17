import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Context from '../context/Context';

function Habitos() {
  const { signupData } = useContext(Context);
  const { data } = signupData;
  const { token } = data;
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState(false);
  const [weekdays, setWeekdays] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
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

  // console.log(weekdays.includes('0'), weekdays);

  useEffect(() => console.log(habits), [habits]);

  const addHabit = async () => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const payload = {
      name: habitName,
      days: weekdays,
    };
    setLoading(true);

    try {
      const habitsFetched = await axios.post(URL, { ...payload }, config);
      setLoading(false);
      setReload(!reload);
      setHabitName('');
      setWeekdays([]);
      console.log(habitsFetched);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    setForm(false);
  };

  const deleteHabit = async (id) => {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(URL, config);
      setReload(!reload);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
  return (
    <StyledHabitos>
      <Header />
      <Body>
        <div>
          <h3>Meus hábitos</h3>
          <button
            type="button"
            onClick={() => setForm(true)}
          >
            +
          </button>
        </div>
        {form && (
          <form>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                disabled={loading}
                placeholder="Nome do hábito"
                value={habitName}
                onChange={({ target }) => setHabitName(target.value)}
              />
            </label>
            <div>
              {[
                'Domingo',
                'Segunda',
                'Terca',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sabado',
              ].map((day, index) => (
                <WeekdayButton
                  type="button"
                  disabled={loading}
                  className="weekday"
                  name={index}
                  color={weekdays.includes(String(index))}
                  onClick={({ target }) => {
                    setWeekdays((prevState) => {
                      if (prevState.includes(target.name)) {
                        return prevState.filter((id) => id !== target.name);
                      }
                      return [...prevState, target.name];
                    });
                  }}
                >
                  {day[0]}
                </WeekdayButton>
              ))}
            </div>
            <div name="handleHabit">
              <button
                type="button"
                onClick={() => setForm(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addHabit}
                disabled={loading}
              >
                Salvar
              </button>
            </div>
          </form>
        )}
        {habits?.data?.length === 0
          && (
            <p>
              Você não tem nenhum hábito cadastrado ainda.
              Adicione um hábito para começar a trackear!
            </p>
          )}
        {habits?.data?.map(({ name, days, id }) => (
          <div>
            <div name="habitsInfo">
              <p>{name}</p>
              <div>
                {[
                  'Domingo',
                  'Segunda',
                  'Terca',
                  'Quarta',
                  'Quinta',
                  'Sexta',
                  'Sabado',
                ].map((day, index) => (
                  <WeekdayButton
                    type="button"
                    className="weekday"
                    name={index}
                    color={days.includes(index)}
                  >
                    {day[0]}
                  </WeekdayButton>
                ))}
              </div>
            </div>
            <div name="trash">
              <button
                type="button"
                onClick={() => deleteHabit(id)}
              >
                <img alt="trash" src="./Vector.png" />
              </button>
            </div>
          </div>
        ))}
      </Body>
      <Menu habits={habits.data || []} />
    </StyledHabitos>
  );
}

const StyledHabitos = styled.div`
  /* background-color: red; */
`;

const Body = styled.div`
  /* background-color: red; */
  position: relative;
  top: 70px;
  height: calc(100vh - 190px);
  padding: 20px;

  div[name=habitsInfo] {
      /* background-color: green; */
      display: flex;
      flex-direction: column;
      align-items: flex-start;
  }

  div[name=trash] {
    /* background-color: blue; */
    display: flex;
    justify-content: flex-end;

    img {
      width: 25px;
    }
  }


  div {
    /* background-color: yellow; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0 15px 0;

    h3 {
      color: #126ba5;
    }

    button {
      /* background-color: #52b6ff; */
      border: none;
      padding: 5px 15px 5px 15px;
      /* color: white; */
      font-size: 25px;
      border-radius: 5px;
      border: 1px solid #cfcfcf;
    }

  }

  form {
    /* background-color: yellow; */

    input {
      width: 100%;
      height: 50px;
    }
    
    div {
      /* background-color: green; */
      justify-content: flex-start;
    }

    div[name=handleHabit] {
      /* background-color: red; */
      display: flex;
      justify-content: flex-end;

      button:first-of-type {
        background-color: transparent;
        border: none;
        color: #52b6ff;
      }
      button:last-of-type {
        background-color: #52b6ff;
        border: none;
        color: white;
      }
    }

  }
`;

const WeekdayButton = styled.button`
  margin: 3px;
  background: ${({ color }) => (color ? '#cfcfcf' : 'white')};
  color: ${({ color }) => (!color ? '#cfcfcf' : 'white')};
`;

export default Habitos;
