import React, { useMemo } from 'react';
import Context from './Context';
import ContextProducts from './ContextProducts';
import ContextUser from './ContextUser';

function ContextProvider({ children }) {
  const dataProducts = ContextProducts();
  const userInfos = ContextUser();

  const dataProductsLength = dataProducts.globalProducts.length;
  const userInfosLength = userInfos.userInfos.cartIds.length;

  const context = useMemo(() => ({
    ...dataProducts,
    ...userInfos,
  }), [dataProductsLength, userInfosLength]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
