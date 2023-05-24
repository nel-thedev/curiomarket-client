import { useContext, useEffect } from 'react';
import { LoadingContext } from '../context/loading';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/auth';

const Store = () => {
  const { currentStore, getCurrentStore } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);

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
          <img src={currentStore.storeImage} alt={currentStore.name} />
          <h1>{currentStore.name}</h1>
          <p>{currentStore.ratings}</p>
          <p>{currentStore.description}</p>
          {currentStore.owner === user._id ? (
            <Link to={'/store/edit'} storeId={storeId}>
              Edit
            </Link>
          ) : (
            <p>FAIL</p>
          )}
          <hr />
          <div>
            {currentStore.items.map((item) => {
              return <ItemCard item={item} key={item._id} />;
            })}
            <Link to={`/store/shop/${storeId}/create-item`} storeId={storeId}>
              <div>New Item</div>
            </Link>
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
