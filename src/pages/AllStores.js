import { useContext, useEffect } from 'react';
import { LoadingContext } from '../context/loading';
import StoreCard from '../components/StoreCard';

const AllStores = () => {
  const { stores, getStores } = useContext(LoadingContext);
  console.log(stores);

  useEffect(() => {
    if (!stores.length) {
      getStores();
    }
  }, [stores]);

  return (
    <div className="container">
      <h2 className="mt-4">All stores</h2>
      <div className="row my-4">
        {!stores.length ? (
          <p>Loading...</p>
        ) : (
          stores.map((store) => {
            return (
              <div className="col-md-6 col-xl-4">
                <StoreCard store={store} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllStores;
