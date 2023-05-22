import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
            <Link to="/logout">Log Out</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Join</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
