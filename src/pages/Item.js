import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { CartContext } from '../context/cart';
import { AuthContext } from '../context/auth';
import { get } from '../services/authService';
import box from '../assets/box.png';

const Item = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const navigate = useNavigate();

  const handleClickCart = () => {
    addToCart(currentItem);
  };

  const deleteItem = () => {
    get(`/item/delete/${itemId}`).then((result) => {
      navigate(`/store/shop/${result.data.store}`);
    });
  };

  useEffect(() => {
    try {
      get(`/item/details/${itemId}`).then((result) => {
        setCurrentItem(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [itemId]);

  return (
    <>
      {currentItem._id ? (
        <div className="d-flex flex-column justify-content-between">
          <div className="row" style={{ height: '' }}>
            <img
              src={currentItem.imageUrl || box}
              alt={currentItem.name}
              className="col-md-5 object-fit-cover"
              style={{ maxHeight: '500px' }}
            />
            <div className="col-md-7 d-flex flex-column justify-content-center align-items-center gap-4 my-5">
              <h1 className="my-3 fw-normal">{currentItem.name}</h1>
              {currentItem.isForSale ? (
                <p>Quantity: {currentItem.quantity}</p>
              ) : (
                <p>Not for sale</p>
              )}
              <p>Price: {currentItem.value}</p>
              {currentItem.owner === user?._id ? (
                <button onClick={deleteItem} className="btn btn-danger">
                  Delete item
                </button>
              ) : (
                <button
                  onClick={handleClickCart}
                  className="btn btn-outline-success"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"></path>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>{' '}
                  Add to cart{' '}
                </button>
              )}
            </div>
            <hr />
          </div>

          <div className="container mt-2">
            <p className="fw-normal">{currentItem.description}</p>
          </div>
          {currentItem.comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
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
