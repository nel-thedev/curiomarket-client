import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import ItemCard from '../components/ItemCard';

const SeeCart = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <>
      <h2>Shopping Cart</h2>

      <button onClick={() => clearCart()}>Clear Cart</button>

      {cart.length ? (
        cart.map((item) => {
          return <ItemCard item={item} />;
        })
      ) : (
        <p>No items in cart...</p>
      )}
    </>
  );
};

export default SeeCart;
