import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = ({ store }) => {
  let avgRating;

  if (store.length) {
    avgRating =
      store.ratings.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / store.ratings.length;
  }

  return (
    <div>
      <Link to={`/store/shop/${store._id}`}>
        <img src={store.imageUrl} alt={store.name} />
        <h4>{store.name}</h4>
        <div>
          <p>{avgRating}</p>
          <p>{store.items.length}</p>
        </div>
      </Link>
    </div>
  );
};

export default StoreCard;
