import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileChange } from '../services/fileChange';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth';

const UpdateProfile = () => {
  const { storeToken, user, setUser } = useContext(AuthContext);

  const [updatedUser, setUpdatedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    fileChange(e)
      .then((response) => {
        setUpdatedUser((prev) => ({
          ...prev,
          [e.target.name]: response.data.image,
        }));
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/user/update', updatedUser)
      .then((results) => {
        storeToken(results.data.authToken);
        setUser(results.data.user);
        navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  return (
    <>
      {updatedUser ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            <br />
            <input
              type="text"
              name="fullName"
              value={updatedUser.fullName}
              placeholder="Name"
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              placeholder="Email"
              onChange={handleChange}
            />
            <br />

            <button type="submit">Update</button>
          </form>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default UpdateProfile;
