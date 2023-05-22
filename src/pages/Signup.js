import { useContext, useState } from 'react';
import { LoadingContext } from '../context/loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { post } from '../services/authService';

const Signup = () => {
  const { setUser, storeToken } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(undefined);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    post('/auth/signup', newUser)
      .then((result) => {
        console.log('CREATED USER', result);
        setUser({ ...result.data.user, profilePicture: '' });
        storeToken(result.data.authToken);
        // navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={newUser.fullName}
          placeholder="Name"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          value={newUser.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={newUser.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Join</button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </>
  );
};

export default Signup;
