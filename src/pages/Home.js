import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/123324890-079ff403-e9c6-440d-9709-d4b99db476da.jpg';
import image2 from '../assets/Primary-Image-shopping-sites-online-3482901-d743a0c886a24385ae0990af5eac4901.jpg';

const Home = () => {
  return (
    <div className="d-flex flex-column">
      <div
        className="row vh-100 d-flex flex-column justify-content-center align-items-center bg-image"
        style={{
          backgroundImage: `url(${image1})`,
          height: '100vh',
          width: '100vw',
        }}
      >
        <div className="d-flex flex-column justify-content-center gap-5 bg-white w-75 h-75 bg-opacity-75 border border-white border-3 rounded-3">
          <h2>Start shopping!</h2>
          <Link to={'/store/all'}>
            <button className="btn btn-primary w-25">All stores</button>
          </Link>
        </div>
      </div>
      <div
        className="row vh-100 d-flex flex-column justify-content-center align-items-center bg-image"
        // style={{
        //   backgroundImage: `url(${image2})`,
        //   height: '100vh',
        //   width: '100vw',
        // }}
      >
        <div className="d-flex flex-column justify-content-center gap-5 bg-secondary w-75 h-75 bg-opacity-10 border border-gray border-3 rounded-3">
          <h2>Create an account and start selling!</h2>
          <Link to={'/auth/signup'}>
            <button className="btn btn-primary w-25">Join</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
