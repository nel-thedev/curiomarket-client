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
    <div className="row p-5">
      <div className="col-md-8 col-xl-10">
        <h2>Shopping Cart</h2>

        <button onClick={() => clearCart()} className="btn btn-danger">
          Clear Cart
        </button>

        <div className="row my-5 px-3">
          {cart.length ? (
            cart.map((item) => {
              console.log(item);
              return (
                <div className="col-md-6">
                  <ItemCard item={item} />
                </div>
              );
            })
          ) : (
            <p>No items in cart...</p>
          )}
        </div>
      </div>
      <div className="col-md-4 col-xl-2 bg-secondary bg-opacity-10 py-3">
        <h3>Checkout</h3>
        <div>
          <p className="mt-4">Total:</p>
          <p>$ {subtotal}</p>
        </div>

        <Link to={'/checkout'}>
          <button className="btn btn-primary">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default SeeCart;
