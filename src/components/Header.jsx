import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Context from "../context/Context";

function Header({ userInfos, Logo, handleSearch }) {
  const {
    globalProducts,
    setTotal,
  } = useContext(Context);

  const [redirectToCart, setRedirectToCart] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  function calculateTotal() {
    const cartProducts = userInfos.cartIds
      .map((id) => globalProducts.find(({ productId }) => productId === id));

    const totalNow = cartProducts.reduce((acc, curr) => acc + curr.price, 0);

    return totalNow.toFixed(2);
  };

  useEffect(() => {
    if (redirectToCart) {
      navigate('/cart');
    }
  }, [redirectToCart]);

  useEffect(() => {
    if (!token && reload) {
      setReload((prevState) => !prevState);
      window.location.reload();
    }
  }, [token]);

  async function logOut() {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const config = {
        headers: {
          authorization: token,
        },
      };

      await axios.delete(`${URL}/sign-out`, config);
      localStorage.removeItem('token');
      setReload((prevState) => !prevState);

    } catch (error) {
      console.log('Erro: ', error);
      throw new Error(error);
    }
    console.log(token)
  };

  return (
    <StyledHeader>
      <Figure>
        <img alt="logo" src={Logo} />
      </Figure>
      <Input
        type="text"
        onChange={({ target }) => handleSearch(target)}
        placeholder="Qual produto você procura?"
      ></Input>
      <Icons>
        <StyledCartQuantity quantity={userInfos.cartIds.length}>
          {userInfos.cartIds.length > 0 && userInfos.cartIds.length}
        </StyledCartQuantity>
        <StyledCartTotal quantity={userInfos.cartIds.length}>
          {`R$ ${String(Number(calculateTotal()).toFixed(2)).replace(".", ",")}`}
        </StyledCartTotal>

        <button
          type="button"
          onClick={() => token ? logOut() : navigate('/sign-in')}
        >
          <ion-icon name={`log-${token ? 'out' : 'in'}-outline`}></ion-icon>
        </button>
        <button
          type="button"
          onClick={() => navigate('/cart')}
        >
          <ion-icon name={`cart-outline`}></ion-icon>
        </button>
      </Icons>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  box-sizing: border-box;
  background-color: #ECF4EF;
  position: relative;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  padding: 10px 80px;
  @media (max-width: 600px) {
    padding: 10px 30px;
  }
`;

const Figure = styled.div`
  img{
    width: 200px; 
  }
  @media (max-width: 620px) {
    img{
    width: 150px; 
  }
  }
  @media (max-width: 450px) {
    img{
    width: 100px; 
  }
  }
  `;

const Input = styled.input`
    padding: 7px;
    border: 1px solid #fb5754;
    box-shadow: 6px 6px rgba(251, 87, 84, 0.1);
    border-radius: 8px;
    width: 40%;
    font-size: 14px;
    color: #fb5754;
    ::placeholder {
    font-size: 14px;
    color: #fb5754;
  }
  @media (max-width: 800px) {
    width: 100%; 
  }

`

const Icons = styled.div`
button {
    border: none;
    font-size: 22px;
    cursor: pointer;
    background-color: #ECF4EF;
  }

  button:hover {
    font-size: 26px;
  }
  width: 140px;
display: flex;
justify-content: space-around
`;

const StyledCartQuantity = styled.p`
width: 22px;
height: 22px;
text-align: center;
  position: absolute;
  font-size: 14px;
  background-color: rgb(251, 87, 84);
  color: white;
  padding: 4px;
  border-radius: 10px;
  z-index: 1;
  top: 20px;
  right: 110px;
  display: ${({ quantity }) => (quantity > 0 ? "block" : "none")};
  @media (max-width: 800px) {
    right: 90px;
  }
  @media (max-width: 620px) {
    top: 10px;
  }
  @media (max-width: 600px) {
    right: 40px;
  }
  @media (max-width: 450px) {
    top: 0px;
  }
  `;

const StyledCartTotal = styled.p`
  position: absolute;
  font-size: 14px;
  background-color: rgb(251, 87, 84, 0.6);
  font-weight: 600;
  color: #fff;
  padding: 5px;
  white-space: pre;
  border-radius: 10px 0 10px 0;
  z-index: 1;
  top: 40px;
  right: 40px;
  display: ${({ quantity }) => (quantity > 0 ? "block" : "none")};
  @media (max-width: 800px) {
    right: 30px;
  }
  @media (max-width: 620px) {
    top: 30px;
  }
  @media (max-width: 600px) {
    top: 55px;
    right: 20px;
  }
  @media (max-width: 450px) {
    top: 40px;
  }
  `;

export default Header;