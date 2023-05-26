import React, { useState, useEffect, useContext } from 'react';
import { post } from '../services/authService';
import { fileChange } from '../services/fileChange';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading';
import { AuthContext } from '../context/auth';

const CreateStore = () => {
  const { currentStore, setCurrentStore } = useContext(LoadingContext);
  const { user, setUser, authenticateUser } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [createdStore, setCreatedStore] = useState({
    name: '',
    description: '',
    storeImage: '',
    items: [],
    ratings: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreatedStore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    fileChange(e)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        setCreatedStore((prev) => ({
          ...prev,
          [e.target.name]: response.data.image,
        }));
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  console.log(createdStore);

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/store/create', createdStore)
      .then((results) => {
        console.log('CREATE STORE RESULTS', results.data);
        setCurrentStore(createdStore);
        setUser(results.data.updatedUser);
        navigate(`/store/shop/${results.data.createdStore._id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <div
      className="p-1 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '85vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center gap-3 w-75"
      >
        <input
          type="file"
          name="storeImage"
          onChange={handleFileChange}
          className="form-control form-control-lg"
        />
        <br />
        <input
          type="text"
          name="name"
          value={createdStore.name}
          placeholder="Store name"
          onChange={handleChange}
          className="form-control form-control-lg"
        />
        <br />
        <input
          type="text"
          name="description"
          value={createdStore.description}
          placeholder="Store description"
          onChange={handleChange}
          className="form-control form-control-lg"
        />
        <br />

        <button type="submit" className="btn btn-outline-primary px-5">
          Create
        </button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
};

export default CreateStore;
