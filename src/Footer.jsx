import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Footer({
  finalInfos, url, title,
}) {
  return (
    <StyledFooter data-test="footer">
      <figure>
        <img src={url} alt="poster" />
      </figure>
      <div>
        <p>{title}</p>
        <p>
          {finalInfos.weekday}
          {' '}
          -
          {' '}
          {finalInfos.time}
        </p>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  background-color: #9eadba;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  font-size: 30px;
  margin-top: 120px;

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  & figure {
    width: 15%;
    height: 90%;
    padding: 7px;
    background-color: white;
    margin: 18px;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

Footer.propTypes = {
  finalInfos: PropTypes.shape(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  ).isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
