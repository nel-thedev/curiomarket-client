import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { CartContext } from '../context/cart';
import { AuthContext } from '../context/auth';
import { get } from '../services/authService';

const Item = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const navigate = useNavigate();

  console.log(itemId);

  const handleClickCart = () => {
    addToCart(currentItem);
  };

  const deleteItem = () => {
    get(`/item/delete/${itemId}`).then((result) => {
      console.log(result);
      navigate(`/store/shop/${result.data.store}`);
    });
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:4000/item/details/${itemId}`)
        .then((result) => {
          setCurrentItem(result.data);
          console.log(result.data);
        });
    } catch (error) {
      return console.log(error);
    }
  }, []);

  return (
    <>
      {currentItem._id ? (
        <>
          <img src={currentItem.imageUrl} alt={currentItem.name} />

          <h1>{currentItem.name}</h1>

          <div>
            {currentItem.isForSale ? <p>{currentItem.quantity}</p> : <p>NFS</p>}
            <p>{currentItem.value}</p>
          </div>
          {currentItem.owner === user._id ? (
            <button onClick={deleteItem}>Delete item</button>
          ) : (
            <button onClick={handleClickCart}>Add to cart</button>
          )}
          <p>{currentItem.description}</p>
          <hr />
          {currentItem.comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Item;

// {
//   name: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   quantity: Number,
//   imageUrl: String,
//   value: Number,
//   isForSale: Boolean,
//   store: { type: Schema.Types.ObjectId, ref: 'Store' },
//   owner: { type: Schema.Types.ObjectId, ref: 'User' },
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
// },
// {
//   timeseries: true,
//   timestamps: true,
// }
// );
