import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../context/Context';

function Header() {
  const { signupData } = useContext(Context);
  const { data } = signupData;
  const { image } = data;
  // console.log(signupData);
  return (
    <StyledHeader>
      <img alt="logo" src="./TrackIt.png" />
      <img alt="profile" src={image} />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #126ba5;
  height: 75px;
  position: fixed;
  padding: 22px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img:nth-of-type(2) {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
`;

export default Header;
