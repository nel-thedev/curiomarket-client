import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  if (localStorage.shoppingCart) {
  }
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    await setCart((prev) => [...prev, item]);
    console.log('CART', cart, localStorage);
    storeCart(cart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shoppingCart');
  };

  const storeCart = (cart) => {
    localStorage.setItem('shoppingCart', cart);
  };

  //   useEffect(() => {
  //     setCart(localStorage.shoppingCart);
  //   }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
