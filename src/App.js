import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AllStores from './pages/AllStores';
import Store from './pages/Store';
import Item from './pages/Item';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UpdateProfile from './pages/UpdateProfile';
import CreateStore from './pages/CreateStore';
import EditStore from './pages/EditStore';
import CreateItem from './pages/CreateItem';
import SeeCart from './pages/SeeCart';

function App() {
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/all" element={<AllStores />} />
          <Route path="/store/shop/:storeId" element={<Store />} />
          <Route path="/item/details/:itemId" element={<Item />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/user/update" element={<UpdateProfile />} />
          <Route path="/store/create" element={<CreateStore />} />
          <Route path="/store/edit" element={<EditStore />} />
          <Route
            path="/store/shop/:storeId/create-item"
            element={<CreateItem />}
          />
          <Route path="/cart" element={<SeeCart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
