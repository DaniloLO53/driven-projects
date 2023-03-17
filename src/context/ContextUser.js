import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContextUser() {
  const initialUserInfos = {
    name: '',
    password: '',
    email: '',
    token: '',
    cartIds: [],
  };

  const [userInfos, setUserInfos] = useState(initialUserInfos);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [userInfos.token]);

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
      if (userInfos.token) {
        try {
          await axios.put(
            `${URL}/cart`,
            { newIds: userInfos.cartIds },
            config,
            // { signal },
          );

        } catch (error) {
          console.log('Erro: ', error);
          throw new Error(error);
        }
      }
    }
    fetcher()

    return () => {
      console.log('Cleaning...');
      controller.abort();
    };
  }, [userInfos.cartIds.length]);

  function removeAllItems(productId) {
    const newCart = userInfos.cartIds.filter((id) => id !== productId);

    return setUserInfos((prevState) => ({
      ...prevState,
      cartIds: newCart,
    }));
  };

  function clearCart() {
    console.log('cleaning cart up')

    return setUserInfos((prevState) => ({
      ...prevState,
      cartIds: [],
    }));
  };

  function addToCart(productId) {
    console.log('add')

    return setUserInfos((prevState) => ({
      ...prevState,
      cartIds: [...prevState.cartIds, productId],
    }));
  };

  function removeFromCart(productId) {
    return setUserInfos((prevState) => {
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
  };

  const contextUserObject = {
    userInfos,
    setUserInfos,
    total,
    setTotal,
    addToCart,
    removeFromCart,
    clearCart,
    removeAllItems,
    isLoggedIn,
    setIsLoggedIn,
  };

  return contextUserObject;
}

export default ContextUser;
