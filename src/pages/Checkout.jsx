import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Context from "../context/Context";

function Checkout() {
  const { userInfos, checkoutInfos, globalProducts } = useContext(Context);
  const { state } = useLocation();

  const { groups, total } = state;

  console.log(groups)

  return (
    <CheckoutStyled>
      <ul>
        {Object.entries(groups).map((entry) => {
          const [itemId, quantity] = entry;

          const product = globalProducts.find(({ productId }) => productId === itemId);

          return <CartItemStyled>
            <figure>
              <img alt={product?.name} src={`${product?.thumbnail}`} />
            </figure>
            <div>
              <p>{product?.name}</p>
              <div>
                <h3>
                  {`R$ ${String(Number(product?.price * quantity).toFixed(2)).replace('.', ',')}`}
                </h3>
              </div>
            </div>
          </CartItemStyled>
        })
        }
      </ul>
      <h2>Total: R$ {total}</h2>
      <p>Agradecemos pela confiança!</p>
    </CheckoutStyled>
  )
};

const CheckoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2, & > p:last-of-type {
    margin-top: 50px;
    font-size: 30px;
    color: green;
    font-weight: 700;
  }
`;

const CartItemStyled = styled.div`
  display: flex;
  padding: 15px 5px 15px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  figure {
    width: 15%;

    img {
      width: 100%;
    }
  }

  & > div {
    width: 85%;
    display: flex;
    flex-direction: column;
    padding: 5px 15px 5px 15px;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 100%;

      & > h3 {
        font-size: 20px;
        font-weight: 600;
        color: green;
      }

      & > div {
        display: flex;
        align-items: center;

        & > button:first-of-type {
          background-color: transparent;
          border: none;
        }

        & > * {
          margin: 5px;
          font-size: 25px;
        }

        & > div {
          display: flex;
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 8px;
          border-radius: 12px;
          
          & button {
            background-color: transparent;
            border: none;
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export default Checkout;
