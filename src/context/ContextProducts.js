import { useState } from 'react';

function ContextProducts() {
  const [globalProducts, setGlobalProducts] = useState([]);

  const contextProductsObject = {
    globalProducts,
    setGlobalProducts,
  };

  return contextProductsObject;
}

export default ContextProducts;
