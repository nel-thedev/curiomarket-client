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
  }, []);

  return (
    <>
      {!stores.length ? (
        <p>Loading...</p>
      ) : (
        stores.map((store) => {
          return <StoreCard store={store} />;
        })
      )}
    </>
  );
};

export default AllStores;
