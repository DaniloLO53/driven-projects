import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Habito({
  markHabit, name, id, currentSequence, highestSequence,
}) {
  const [marked, setMarked] = useState(false);

  return (
    <div key={id}>
      <div>
        <h4>{name}</h4>
        <StyledSequence color={marked}>
          Sequência atual:
          {' '}
          {currentSequence}
          {' '}
          dias
        </StyledSequence>
        <StyledHighest color={marked && (currentSequence === highestSequence)}>
          Seu recorde:
          {' '}
          {highestSequence}
          {' '}
          dias
        </StyledHighest>
      </div>
      <label htmlFor="markhabit">
        <input
          id={id}
          type="checkbox"
          onClick={({ target }) => {
            markHabit(target.checked, id);
            setMarked(!marked);
          }}
        />
      </label>
    </div>

  );
}

const StyledSequence = styled.p`
  color: ${({ color }) => color && '#8fc549'};
`;

const StyledHighest = styled.p`
  color: ${({ color }) => color && '#8fc549'};
`;

Habito.propTypes = {
  markHabit: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  highestSequence: PropTypes.string.isRequired,
  currentSequence: PropTypes.string.isRequired,
};

export default Habito;
