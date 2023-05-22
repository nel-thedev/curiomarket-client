import { useContext, useState } from 'react';
import { LoadingContext } from '../context/loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { post } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const { storeToken } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(undefined);
  const [thisUser, setThisUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/auth/login', thisUser)
      .then((results) => {
        console.log('LOGIN', results.data);
        storeToken(results.data.authToken);
        setUser(results.data.user);
        navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={thisUser.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </>
  );
};

export default Login;
