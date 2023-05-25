import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { post } from '../services/authService';
import { CartContext } from '../context/cart';

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState('');
  // const { cart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedCart = localStorage.getItem('shoppingCart');

    const cart = JSON.parse(storedCart);
    console.log('CART', cart);

    // cart.map((item) => {
    //   {name, description, imageUrl, quantity, value} = item
    //   return
    // })

    post('/checkout/create-checkout-session', cart)
      .then((response) => {
        console.log('RESPONSEDATA', response.data);
        window.location = response.data.url;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </section>
  );
}
