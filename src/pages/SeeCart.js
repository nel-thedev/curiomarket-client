import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom';

const SeeCart = () => {
  const { cart, clearCart } = useContext(CartContext);

  const storedCart = localStorage.getItem('shoppingCart');

  const subtotal =
    JSON.parse(storedCart)?.reduce((acc, curr) => {
      // acc + curr.value
      return acc + Number(curr.value);
    }, 0) || 0;

  return (
    <>
      <div>
        <h2>Shopping Cart</h2>

        <button onClick={() => clearCart()}>Clear Cart</button>

        {cart.length ? (
          cart.map((item) => {
            console.log(item);
            return <ItemCard item={item} />;
          })
        ) : (
          <p>No items in cart...</p>
        )}
      </div>
      <div>
        <h3>Checkout</h3>
        <div>
          <p>Subtotal:</p>
          <p>{subtotal}</p>
        </div>

        <Link to={'/checkout'}>
          <button>Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default SeeCart;
