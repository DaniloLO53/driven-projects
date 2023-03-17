import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import Context from "../context/Context";
import Logo from "../images/logos/gif.gif"

function Cart() {
  const { userInfos, globalProducts, isLoggedIn, clearCart } = useContext(Context);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  function calculateTotal() {
    const cartProducts = userInfos.cartIds
      .map((id) => globalProducts.find(({ productId }) => productId === id));

    const totalNow = cartProducts.reduce((acc, curr) => acc + curr.price, 0);

    return totalNow.toFixed(2);
  };

  function groupItems() {
    const { cartIds } = userInfos;
    const groups = {};

    cartIds.forEach((id) => {
      const keys = Object.keys(groups);

      if (keys.includes(id)) return;

      groups[id] = cartIds.filter((cartId) => cartId === id).length;
    });

    setGroups(groups);
  };

  useEffect(() => groupItems(), []);
  useEffect(() => {
    calculateTotal();
  }, [userInfos.cartIds.length]);

  const groupsLength = Object.entries(groups).length;

  return (
    <StyledCart>
      <StyledHeader>
        <img alt="logo" src={Logo} />
        <h3>Meu Carrinho</h3>
        <button
          type="button"
          onClick={() => navigate('/')}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </StyledHeader>
      {groupsLength === 0 && <h2>Seu carrinho está vazio</h2>}
      <StyledMain>
        <ul>
          {groupsLength !== 0 &&
            Object.entries(groups).map((entry) => <CartItem
              entry={entry}
              key={entry[0] + entry[1]}
            />)
          }
        </ul>
        {groupsLength !== 0 &&
          <div>
            <button
              type="button"
              onClick={() => navigate('/')}
            >
              Adicionar mais itens ao carrinho
            </button>
            <button
              type="button"
              onClick={clearCart}
            >
              <ion-icon name="trash-outline"></ion-icon>
              Limpar carrinho
            </button>
          </div>
        }
      </StyledMain>
      <StyledFooter>
        <div>
          <p>Preço total</p>
          <h3>{`R$ ${String(Number(calculateTotal()).toFixed(2)).replace('.', ',')}`}</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isLoggedIn) {
              navigate('/checkout', { state: { groups, total: calculateTotal() } });
            } else {
              navigate('/sign-in');
            }
          }}
        >
          {isLoggedIn ? 'Fechar compra' : 'Criar conta'}
        </button>
      </StyledFooter>
    </StyledCart>
  );
};

const StyledCart = styled.div`
  position: relative;

  h2 {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    font-size: 23px;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  min-height: 50px;
  padding: 15px;
  background-color: rgba(240, 240, 240, 0.8);
  z-index: 1;

img{
  width: 100px;
}

  h3{

  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:hover {
    color: #D81C16;
    font-weight: 600;
  }
  ion-icon{
    font-size: 26px;
  }
`;

const StyledMain = styled.main`
  position: absolute;
  top: 50px;
  padding: 30px;
  height: min-content;
  max-height: calc(100vh - 190px);
  overflow-y: auto;

  & > div:first-of-type {
    padding: 30px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & button {
      margin: 10px;
      background-color: transparent;
      border: none;
      font-weight: 600;

      &:first-of-type {
        color: green;

        & ~ button {
          color: red;
          display: flex;
          align-items: center;
          * {
            margin: 8px;
          }
        }
      }
    }
  }
`;

const StyledFooter = styled.footer`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px;
  z-index: 1;
  min-height: 140px;

  & div {
    width: 70%;
    background-color: rgb(230, 230, 230);
    display: flex;
    padding: 10px;
    border-radius: 6px;
    justify-content: space-between;
    margin-bottom: 15px;

    h3 {
      font-weight: 600;
      color: green;
    }
  }

  & button {
    width: 70%;
    background-color: rgb(2, 126, 4);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-weight: 800;
  }
`;

export default Cart;
