import { useContext, useEffect, useState } from 'react';
import { useInRouterContext, useNavigate } from 'react-router-dom';
import { fileChange } from '../services/fileChange';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth';
import { LoadingContext } from '../context/loading';

const EditStore = ({ storeId }) => {
  const { currentStore, setCurrentStore } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [updatedStore, setUpdatedStore] = useState(currentStore);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedStore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    fileChange(e)
      .then((response) => {
        setUpdatedStore((prev) => ({
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

    post(`/store/edit/${currentStore._id}`, updatedStore)
      .then((results) => {
        console.log('UPDATE RESULTS', results.data.updatedUser);
        setCurrentStore(updatedStore);
        setUser(results.data.updatedUser);
        console.log(user);
        navigate(`/store/shop/${currentStore._id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  useEffect(() => {
    setUpdatedStore(currentStore);
  }, [currentStore]);

  return (
    <>
      {updatedStore ? (
        <>
          <form onSubmit={handleSubmit}>
            <input type="file" name="storeImage" onChange={handleFileChange} />
            <br />
            <input
              type="text"
              name="name"
              value={updatedStore.name}
              placeholder="Store name"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="description"
              value={updatedStore.description}
              placeholder="Store description"
              onChange={handleChange}
            />
            <br />

            <button type="submit">Create</button>
          </form>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditStore;
