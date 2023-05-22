import { useContext, useEffect } from 'react';
import { LoadingContext } from '../context/loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const Store = () => {
  const { currentStore, getCurrentStore } = useContext(LoadingContext);

  const { storeId } = useParams();
  console.log(storeId);

  useEffect(() => {
    getCurrentStore(storeId);
    console.log('CURRENT STORE', currentStore);
  }, [storeId]);

  return (
    <>
      {currentStore._id ? (
        <>
          <h1>{currentStore.name}</h1>
          <p>{currentStore.ratings}</p>
          <p>{currentStore.description}</p>
          <hr />
          <div>
            {currentStore.items.map((item) => {
              return <ItemCard item={item} key={item._id} />;
            })}
            <div>New Item</div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Store;

// {
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
//   owner: { type: Schema.Types.ObjectId, ref: 'User' },
//   ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
// },
// {
//   timeseries: true,
//   timestamps: true,
// }
