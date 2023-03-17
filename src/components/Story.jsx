import React from 'react';
import PropTypes from 'prop-types';

function Story(props) {
  const { name } = props;

  return (
    <div className="story">
      <div className="imagem">
        <img src={`assets/${name}.svg`} alt="logo" />
      </div>
      <div className="usuario">
        {name}
      </div>
    </div>
  );
}

Story.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Story;
