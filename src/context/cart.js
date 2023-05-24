import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  if (localStorage.shoppingCart) {
  }
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Add item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      storeCart(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shoppingCart');
  };

  // Store the cart in localStorage
  const storeCart = (cart) => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  };

  // Update localStorage when the cart changes
  useEffect(() => {
    storeCart(cart);
  }, [cart]);

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
