import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import StoreCard from '../components/StoreCard';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);

  // useEffect(() => {
  //   authenticateUser();
  // }, []);
  // console.log(user.stores);

  return (
    <>
      {user ? (
        <div className="d-flex flex-column justify-content-between my-4">
          <div className="row">
            <div
              className="col-md-5 d-flex justify-content-center align-items-center"
              style={{ height: '400px' }}
            >
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="rounded-circle"
                style={{ height: '200px', width: '200px' }}
              />
            </div>
            <div className="col-md-7 text-md-start">
              <h3 className="my-3">My Profile</h3>
              <h1 className="mb-3 fw-normal">{user.fullName}</h1>
              <Link to={'/user/update'}>
                <button className="btn btn-primary">Edit user</button>
              </Link>
            </div>
          </div>
          <hr />
          <div className="container mt-2">
            <h2 className="mb-4 fw-normal">{user.fullName}'s Stores:</h2>
            <div className="row my-4">
              {user.stores ? (
                user.stores.map((store) => {
                  console.log(user, store);
                  return (
                    <div className="col-md-6 col-xl-4">
                      <StoreCard store={store} />
                    </div>
                  );
                })
              ) : (
                <p>No stores...</p>
              )}
              <Link
                to={'/store/create'}
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
                New Store
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

export default Profile;
