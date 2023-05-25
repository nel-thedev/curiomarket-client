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
    <nav className="navbar px-4 sticky-top bg-body-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Curiomarket
        </Link>
        <div className="d-flex gap-3 align-items-center h-100">
          <Link to={'/cart'} className="nav-link">
            <button className="btn btn-success h-100 d-flex gap-2 align-items-center">
              {cart.length}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <Link to="/store/all" className="nav-link py-2">
            Stores
          </Link>
          {getToken() ? (
            <>
              <Link to="/profile" className="nav-link py-2">
                Profile
              </Link>
              <Link onClick={logOutUser} to={'/'} className="nav-link py-2">
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="nav-link py-2">
                Log In
              </Link>
              <Link to="/auth/signup" className="nav-link py-2">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
