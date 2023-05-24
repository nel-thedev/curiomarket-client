import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import StoreCard from '../components/StoreCard';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);
  console.log(user);

  // useEffect(() => {
  //   authenticateUser();
  // }, []);
  console.log(user.stores);

  return (
    <>
      {user ? (
        <>
          <h3>My Profile</h3>
          <img src={user.profilePicture} alt={user.fullName} />
          <h1>{user.fullName}</h1>
          <Link to={'/user/update'}>Edit user</Link>
          <div>
            <h2>{user.fullName}'s Stores:</h2>
            {user.stores ? (
              user.stores.map((store) => {
                console.log(user, store);
                return <StoreCard store={store} />;
              })
            ) : (
              <p>No stores...</p>
            )}
            <Link to={'/store/create'}>
              <div>
                <p>Add store</p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
