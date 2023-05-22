import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import StoreCard from '../components/StoreCard';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h3>My Profile</h3>
      <img src={user.profilePicture} alt={user.fullName} />
      <h1>{user.fullName}</h1>
      <div>
        <h2>{user.fullName}'s Stores:</h2>
        {user.stores.map((store) => {
          return <StoreCard store={store} />;
        })}
      </div>
    </>
  );
};

export default Profile;
