import styled from "styled-components";
import React, { useContext } from "react";
import Context from "../context/Context";

export default function Information({ product }) {
  const { name, price, productId } = product;

  const { setUserInfos, addToCart } = useContext(Context);

  return (
    <Informations>
      <Text>
        <span>{`R$ ${String(Number(price).toFixed(2)).replace(
          ".",
          ","
        )}`}</span>
        <p>{name}</p>
      </Text>
      <Button
        type="button"
        onClick={() => addToCart(productId)}
      >
        <ion-icon name="add-circle"></ion-icon>
      </Button>
    </Informations>
  );
}

const Informations = styled.div`
  width: 162px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
width: 125px;
height: 60px;
display: flex;
flex-direction: column;
justify-content: space-between;
  span {
    font-size: 24px;
    color: #49AD0C;
    font-weight: 600;
  }
  p {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 22px;
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
`;