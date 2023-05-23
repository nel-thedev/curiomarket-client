import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = ({ store }) => {
  // let avgRating;
  console.log(store);
  const returnRating = () => {
    if (store.ratings.length) {
      return (
        store.ratings.reduce((acc, curr) => {
          return acc + curr;
        }, 0) / store.ratings.length
      );
    } else {
      return 0;
    }
  };

  return (
    <div>
      {store ? (
        <Link to={`/store/shop/${store._id}`}>
          <img src={store.storeImage} alt={store.name} />
          <h4>{store.name}</h4>
          <div>
            <p>Rating: {returnRating()}</p>
            <p>{store.items.length}</p>
          </div>
        </Link>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StoreCard;
