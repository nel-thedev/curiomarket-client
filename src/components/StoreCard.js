import React from 'react';
import { Link } from 'react-router-dom';
import storeImg from '../assets/store.png';

const StoreCard = ({ store }) => {
  return (
    <>
      {store ? (
        <Link
          to={`/store/shop/${store._id}`}
          className="card mb-4 text-decoration-none"
        >
          <img
            src={store.storeImage || storeImg}
            className="card-img-top object-fit-cover"
            alt={store.name}
            style={{ height: '300px' }}
          />
          <div className="card-body">
            <h5 className="card-title">{store.name}</h5>
            <p className="card-text">
              {store?.description.length > 50 ? (
                <p className="card-text">{store.description.slice(0, 49)}...</p>
              ) : (
                <p className="card-text">{store.description}</p>
              )}
            </p>
            <p className="card-text">
              {store?.items.length > 0 ? (
                <small className="text-body-secondary">
                  Items: {store?.items.length}
                </small>
              ) : (
                <small className="text-body-secondary">Items: 0</small>
              )}
            </p>
          </div>
        </Link>
      ) : (
        /* <Link to={`/store/shop/${store._id}`}>
              <img
                src={store.storeImage || storeImg}
                alt={store.name}
                className="store-img"
              />
              <h4>{store.name}</h4>
              <div>
                {store?.items.length > 0 ? (
                  <p>{store?.items.length}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
            </Link> */
        <p>Loading...</p>
      )}
    </>
  );
};

export default StoreCard;
