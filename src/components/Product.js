import React, { useContext } from "react";
import styled from "styled-components";
import Context from "../context/Context";
import CartItemsHandler from "./CartItemsHandler";
import Informations from "./Informations";

function Product({ product }) {
  const { thumbnail, productId } = product;

  const { userInfos, addToCart } = useContext(Context);

  return (
    <StyledProduct>
        <img alt="product" src={`${thumbnail}`} />
      {userInfos.cartIds.filter((id) => id === productId).length === 0 ? (
        <Informations product={product} addToCart={addToCart} />
      ) : (
        <CartItemsHandler productId={productId} />
      )}
    </StyledProduct>
  );
}

export default Product;

const StyledProduct = styled.div`
box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 200px;
  height: 250px;
  margin: 15px;
  padding: 18px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  img {
    width: 70%;
    margin-bottom: 15px;
  }
`;