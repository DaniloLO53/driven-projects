import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Form({ finalInfos, setFinalInfos }) {
  return (
    <StyledForm>
      <p>Nome do comprador:</p>
      <input
        id="name"
        data-test="client-name"
        name="client"
        placeholder="Digite seu nome..."
        value={finalInfos.client}
        onChange={({ target }) => setFinalInfos((prevState) => (
          {
            ...prevState,
            [target.name]: target.value,
          }
        ))}
      />
      <p>CPF do comprador:</p>
      <input
        id="cpf"
        data-test="client-cpf"
        name="cpf"
        placeholder="Digite seu CPF..."
        value={finalInfos.cpf}
        onChange={({ target }) => setFinalInfos((prevState) => (
          {
            ...prevState,
            [target.name]: target.value,
          }
        ))}
      />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  /* background-color: red; */
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  & p {
    width: 100%;
    text-align: left;
    height: 50%;
    margin: 8px 0 8px 0;
  }

  & input {
    width: 100%;
    height: 40px;
  }
`;

Form.propTypes = {
  finalInfos: PropTypes.shape(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  ).isRequired,
  setFinalInfos: PropTypes.func.isRequired,
};

export default Form;
