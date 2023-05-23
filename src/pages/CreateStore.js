import React, { useState, useEffect } from 'react';
import { post } from '../services/authService';
import { fileChange } from '../services/fileChange';
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/store/create', createdStore)
      .then((results) => {
        console.log('CREATE STORE RESULTS', results.data);
        navigate(`/shop/${results.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="storeImage" onChange={handleFileChange} />
        <br />
        <input
          type="text"
          name="name"
          value={createdStore.name}
          placeholder="Store name"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="description"
          value={createdStore.description}
          placeholder="Store description"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create</button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </>
  );
};

export default CreateStore;
