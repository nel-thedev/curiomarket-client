import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart';
import ItemCard from '../components/ItemCard';
import { Link, Navigate } from 'react-router-dom';
import { post } from '../services/authService';

const SeeCart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const storedCart = localStorage.getItem('shoppingCart');

  const subtotal =
    JSON.parse(storedCart)?.reduce((acc, curr) => {
      // acc + curr.value
      return acc + Number(curr.value);
    }, 0) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedCart = localStorage.getItem('shoppingCart');

    const cart = JSON.parse(storedCart);

    post('/checkout/create-checkout-session', cart)
      .then((response) => {
        window.location = response.data.url;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage(
        'Order placed! You will receive an email confirmation soon. ✅'
      );
      clearCart();
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready. 🛍️"
      );
    }
  }, []);

  return (
    <div className="row p-5">
      <div className="col-md-8 col-xl-10">
        <h2>Shopping Cart</h2>

        {message ? (
          <p className="text-center fw-bold my-5">{message}</p>
        ) : (
          <></>
        )}
        <button onClick={() => clearCart()} className="btn btn-danger">
          Clear Cart
        </button>

        <div className="row my-5 px-3">
          {cart.length ? (
            cart.map((item) => {
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
      <div className="col-md-4 col-xl-2 bg-secondary bg-opacity-10 py-3 rounded-3">
        <h3>Checkout</h3>
        <div>
          <p className="mt-4">Total:</p>
          <p>$ {subtotal}</p>
        </div>

        {/* <Link to={'/checkout'}> */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Checkout
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SeeCart;
