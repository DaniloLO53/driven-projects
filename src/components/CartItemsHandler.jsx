import React, { useContext } from "react";
import Context from "../context/Context";
import styled from "styled-components";

function CartItemsHandler({ productId }) {
  const { userInfos, setUserInfos } = useContext(Context);

  return (
    <Items>
      <Button
        type="button"
        onClick={() => {
          setUserInfos((prevState) => {
            // not happy with this code
            let idsFound = 0;
            const newIds = [];

            for (let i = 0; i < prevState.cartIds.length; i++) {
              if (prevState.cartIds[i] === productId) {
                idsFound += 1;
              }
              if (idsFound === 1) {
                continue;
              }

              newIds.push(prevState.cartIds[i]);
            }

            return ({
              ...prevState,
              cartIds: newIds,
            });
          })
        }}
      >
        <ion-icon name="remove-circle-outline"></ion-icon>
      </Button>
      <p>{userInfos.cartIds.filter((id) => id === productId).length}</p>
      <Button
        type="button"
        onClick={() => {
          setUserInfos((prevState) => ({
            ...prevState,
            cartIds: [...prevState.cartIds, productId],
          }));
        }}
      >
        <ion-icon name="add-circle-outline"></ion-icon>
      </Button>
    </Items>
  )
};

const Items = styled.div`
width: 60%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #49AD0C;
    font-size: 22px;
`

const Button = styled.button`
  cursor: pointer;
  font-size: 26px;
  color: #49AD0C;
  border: none;
  background-color: #fff;
  ion-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :hover{
    opacity: 0.5
  }
`

export default CartItemsHandler;