import React from 'react';
import { Link } from 'react-router-dom';
import box from '../assets/box.png';

const ItemCard = ({ item }) => {
  console.log(item);
  return (
    <Link
      to={`/item/details/${item._id}`}
      class="card mb-4 text-decoration-none"
    >
      <img
        src={item.imageUrl || box}
        className="card-img-top object-fit-contain"
        alt="{item.name}"
        style={{ height: '300px' }}
      />
      <div class="card-body">
        <h5 class="card-title fw-normal">{item.name}</h5>
        {item?.description.length > 50 ? (
          <p className="card-text">{item.description.slice(0, 49)}...</p>
        ) : (
          <p className="card-text">{item.description}</p>
        )}
        <div className="d-flex justify-content-around">
          <p class="card-text">
            <small class="text-body-secondary">Qty: {item.quantity}</small>
          </p>
          <p class="card-text">
            <small class="text-body-secondary">Price: {item.value}</small>
          </p>
        </div>
      </div>
    </Link>
  );
};
{
  /* <div>
      <Link to={`/item/details/${item._id}`}>
        <img src={item.imageUrl || box} alt="{item.name}" />
        <h4>{item.name}</h4>
        {item.isForSale ? <></> : <p>Not for sale</p>}
        <div>
          <p>{item.quantity}</p>
          <p>{item.value}</p>
        </div>
      </Link>
    </div> */
}

export default ItemCard;
