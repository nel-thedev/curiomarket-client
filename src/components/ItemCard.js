import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div>
      <Link to={`/item/details/${item._id}`}>
        <img src="{item.imageUrl}" alt="{item.name}" />
        <h4>{item.name}</h4>
        {item.isForSale ? <></> : <p>Not for sale</p>}
        <div>
          <p>{item.quantity}</p>
          <p>{item.value}</p>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
