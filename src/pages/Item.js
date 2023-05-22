import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';

const Item = () => {
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState({});

  console.log(itemId);

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
  }, [itemId]);

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
