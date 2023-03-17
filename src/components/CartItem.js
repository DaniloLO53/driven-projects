import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Context from "../context/Context";
import CartItemsHandler from "./CartItemsHandler";

function CartItem({ entry }) {
  const { globalProducts, removeAllItems } = useContext(Context);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [itemId, quantityEntry] = entry;

  useEffect(() => {
    const product = globalProducts.find(({ productId }) => productId === itemId);

    setQuantity(quantityEntry);
    setItem(product);
  }, []);

  return (
    <CartItemStyled>
      <figure>
        <img alt={item?.name} src={`${item?.thumbnail}`} />
      </figure>
      <div>
        <p>{item?.name}</p>
        <div>
          <h3>
            {`R$ ${String(Number(item?.price * quantity).toFixed(2)).replace('.', ',')}`}
          </h3>
          <div>
            <CartItemsHandler productId={itemId} />
            <button
              type="button"
              onClick={() => removeAllItems(itemId)}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </CartItemStyled>
  )
};

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

export default CartItem;
