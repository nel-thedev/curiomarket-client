import { useContext, useEffect, useState } from 'react';
import { fileChange } from '../services/fileChange';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth';
import { LoadingContext } from '../context/loading';
import { useNavigate } from 'react-router-dom';

const CreateItem = ({ storeId }) => {
  const { currentStore, setCurrentStore } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    quantity: 0,
    imageUrl: '',
    value: 999,
    isForSale: false,
  });

  const navigate = useNavigate();

  //   const handleChange = (e) => {
  //     setNewItem((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };
  const handleChange = (e) => {
    setNewItem((prev) =>
      typeof e.target.value === Number
        ? {
            ...prev,
            [e.target.name]: Number(e.target.value),
          }
        : {
            ...prev,
            [e.target.name]: e.target.value,
          }
    );
  };

  const handleFileChange = (e) => {
    fileChange(e)
      .then((response) => {
        console.log('RESPONSEDATA', response.data);
        setNewItem((prev) => ({
          ...prev,
          [e.target.name]: response.data.image,
        }));
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/store/shop/${currentStore._id}/create-item`, newItem)
      .then((results) => {
        console.log('CREATED ITEM RESULTS DATA: ', results.data);
        navigate(`/store/shop/${currentStore._id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.msg);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="imageUrl" onChange={handleFileChange} />
        <br />
        <input
          type="text"
          name="name"
          value={newItem.name}
          placeholder="Item name"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="description"
          value={newItem.description}
          placeholder="Item description"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="value"
          value={newItem.value}
          placeholder="Item value"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          placeholder="Item quantity"
          onChange={handleChange}
        />
        <br />
        <label for="isForSale">Is the item for sale?</label>
        <input
          type="checkbox"
          id="isForSale"
          name="isForSale"
          value={newItem.isForSale}
          placeholder="Is the item for sale?"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create</button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </>
  );
};

export default CreateItem;
