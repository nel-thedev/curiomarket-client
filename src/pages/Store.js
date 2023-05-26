import { useContext, useEffect } from 'react';
import { LoadingContext } from '../context/loading';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/auth';
import storeImg from '../assets/store.png';

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
        <div className="d-flex flex-column justify-content-between">
          <div className="row">
            <img
              className="col-12 col-md-5 object-fit-cover"
              src={currentStore.storeImage || storeImg}
              alt={currentStore.name}
              style={{ maxHeight: '500px' }}
            />
            <div className="col-md-7">
              <h1 className="my-3 fw-normal">{currentStore.name}</h1>
              <p>{currentStore.description}</p>
              {currentStore.owner === user?._id ? (
                <Link to={'/store/edit'} storeId={storeId}>
                  Edit
                </Link>
              ) : (
                <></>
              )}
            </div>
            <hr />
          </div>
          <div className="container mt-2">
            <h3 className="fw-light">{currentStore.name}'s items</h3>
            <div className="row my-4">
              {currentStore.items.map((item) => {
                return (
                  <div className="col-md-6 col-xl-4">
                    <ItemCard item={item} key={item._id} />
                  </div>
                );
              })}
              <Link
                to={`/store/shop/${storeId}/create-item`}
                storeId={storeId}
                className=" text-decoration-none card d-flex flex-column justify-content-center align-items-center rounded-circle fs-5 icon-link m-auto"
                style={{ height: '150px', width: '150px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-lg w-5"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
                New Item
              </Link>
            </div>
          </div>
        </div>
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
