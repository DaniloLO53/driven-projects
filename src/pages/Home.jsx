import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Product from "../components/Product";
import Logo from "../images/logos/logoSticker.png";
import Context from "../context/Context";
import Header from "../components/Header";

function Home() {
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState('all');

  const {
    userInfos,
    setUserInfos,
    setGlobalProducts,
    globalProducts,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(Context);

  function handleSearch(target) {
    const { value } = target;
    const productsFiltered = globalProducts
      .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    setFilter(productsFiltered);
  };

  function selectByCategory(target) {
    const { name } = target;

    if (name === 'all') {
      setCategory('all');
      setFilter([]);
      return;
    };

    const productsFiltered = globalProducts
      .filter(({ category }) => category === name);

    setCategory(name);
    setFilter(productsFiltered);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const controller = new AbortController();
    const signal = controller.signal;
    const config = {
      headers: {
        Authorization: token,
      }
    }

    const fetcher = async () => {

      try {
        if (token) {
          const userData = await axios.get(`${URL}/cart`, config, { signal });

          return setUserInfos((prevState) => {
            return ({
              ...prevState,
              cartIds: userData.data.cartIds,
            });
          });
        }
      } catch (error) {
        console.log('Erro: ', error);
        throw new Error(error);
      }
    }
    fetcher();

    return () => {
      console.log('Cleaning...');
      controller.abort();
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const controller = new AbortController();
    const signal = controller.signal;
    const config = {
      headers: {
        Authorization: userInfos.token,
      }
    }

    const fetcher = async () => {
      try {
        const token = localStorage.getItem('token');
        const productsData = await axios.post(URL, {}, { signal });
        const { data } = productsData;

        data.sort(() => .5 - Math.random()); // shuffle array
        data.forEach((product) => product.quantity = 0);

        setGlobalProducts(data);

        if (token) {
          // setUserInfos((prevState) => ({
          //   ...prevState,
          //   token,
          // }));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

      } catch (error) {
        console.log('Erro: ', error);
        throw new Error(error);
      }
    }
    fetcher();

    return () => {
      console.log('Cleaning...');
      controller.abort();
    };
  }, []);

  const categories = [
    ['all', 'Todos'],
    ['fruits', 'Frutas'],
    ['greens', 'Verduras'],
    ['vegetables', 'Legumes'],
    ['bakery', 'Padaria'],
    ['organics', 'Orgânicos'],
    ['drinks', 'Bebidas'],
  ];

  return (
    <>
      <Header
        Logo={Logo}
        handleSearch={handleSearch}
        userInfos={userInfos}
      />
      <StyledMain>
        <Categories>
          {categories.map((categoryType) => (
            <StyledCategory
            key={categoryType[0]}
              type="button"
              name={categoryType[0]}
              category={category}
              onClick={({ target }) => selectByCategory(target)}
            >
              {categoryType[1]}
            </StyledCategory>
          ))}
        </Categories>
        <Products>
          {(filter.length === 0 ? globalProducts : filter).map(
            (product, index) => (
              <Product key={index} product={product} />
            )
          )}
        </Products>
        <Wpp
          type="button"
          onClick={() => {
            const link = encodeURIComponent(`Olá, faça seu pedido.`);

            window.location.href = "https://wa.me/+5521995784778?text=" + link;
          }}
        >
          <ion-icon name="logo-whatsapp"></ion-icon>
        </Wpp>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f7f9f6;
  position: relative;
  top: 112px;
  @media (max-width: 620px) {
    top: 91px;
  }
  @media (max-width: 450px) {
    top: 68px;
  }
`;

const Categories = styled.div`
  background-color: #ecf4ef;
  width: 100%;
  height: 50px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  list-style-type: none;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
@media (max-width: 575px) {
    padding: 0 10px;
    justify-content: space-between
  }
`;

const Products = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 400px;
  @media (max-width: 770px) {
    padding: 10px;
  }
`;

const Wpp = styled.button`
  position: fixed;
  bottom: 40px;
  right: 50px;
  font-size: 32px;
  color: white;
  background-color: #0ca884;
  border: none;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  cursor: pointer;
`;

const StyledCategory = styled.button`
  cursor: pointer;
  margin: 8px;
  background-color: transparent;
  border: none;
  color: ${({ name, category }) =>
    name === category ? " #fb5754" : "#48ac0d"};
  font-size: 16px;
  font-weight: 600;
  border-bottom: ${({ name, category }) =>
    name === category ? "1px solid #fb5754" : "none"};
  
  :hover{
    color: #fb5754;
  }
  @media (max-width: 690px) {
    font-size: 14px;
  }
`;

export default Home;

