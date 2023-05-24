import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { CartContext } from '../context/cart';

const Navbar = () => {
  const { logOutUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/store/all">Stores</Link>
      </div>
      <div>
        {getToken() ? (
          <div>
            <Link to="/profile">Profile</Link>
            <Link onClick={logOutUser} to={'/'}>
              Log Out
            </Link>
            <Link to={'/cart'}>
              <p>Cart: {cart.length}</p>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/auth/login">Log In</Link>
            <Link to="/auth/signup">Join</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
