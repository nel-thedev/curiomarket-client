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
    isForSale: true,
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
        navigate(`/store/shop/${currentStore._id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.msg);
      });
  };

  return (
    <div
      className="p-1 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '' }}
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center gap-3 w-75 my-5"
      >
        <input
          type="file"
          name="imageUrl"
          onChange={handleFileChange}
          className="form-control form-control-lg"
        />
        <br />
        <input
          type="text"
          name="name"
          value={newItem.name}
          placeholder="Item name"
          onChange={handleChange}
          className="form-control form-control-lg"
        />
        <br />
        <input
          type="text"
          name="description"
          value={newItem.description}
          placeholder="Item description"
          onChange={handleChange}
          className="form-control form-control-lg"
        />
        <br />
        <label for="item-value" class="form-label">
          Item Value
        </label>
        <input
          type="number"
          name="value"
          id="item-value"
          value={newItem.value}
          placeholder="Item value"
          onChange={handleChange}
          className="form-control form-control-lg"
          min="1"
        />
        <br />
        <label for="item-qty" class="form-label">
          Item Quantity
        </label>
        <input
          type="number"
          name="quantity"
          id="item-qty"
          value={newItem.quantity}
          placeholder="Item quantity"
          onChange={handleChange}
          className="form-control form-control-lg"
          min="1"
        />
        <br />
        <label class="form-check-label" for="isForSale">
          Is the item for sale?
        </label>
        <input
          type="checkbox"
          id="isForSale"
          name="isForSale"
          value={newItem.isForSale}
          placeholder="Is the item for sale?"
          onChange={handleChange}
          class="form-check-input"
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

export default CreateItem;
