import React, { useContext, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
import Landing from './pages/Landing';
import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import TransactionAdmin from './pages/TransactionAdmin';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import DetailPage from './pages/DetailPage';
import UpdateProfile from './pages/UpdateProfile';

import { API, setAuthToken } from './config/api'
import { UserContext } from './context/UserContext';
import Complain from './pages/Complain';
import ComplainAdmin from './pages/ComplainAdmin';

function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    // redirect
    if (!state.isLogin) {
      navigate('/')
    } else {
      if (state.user.status == 'admin') {
        navigate('/homeadmin')
      } else if (state.user.status == 'customer') {
        navigate('/home')
      }
    }
  }, [state])

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = response.data.data.user
      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(localStorage.token){
      checkUser()
    }
  },[])

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/homeadmin" element={<HomeAdmin />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/editproduct/:id" element={<UpdateProduct />} />
        <Route exact path="/transactionadmin" element={<TransactionAdmin />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/editprofile/:id" element={<UpdateProfile />} />
        <Route exact path="/detailpage/:id" element={<DetailPage />} />
        <Route exact path="/complain" element={<Complain />} />
        <Route exact path="/complainadmin" element={<ComplainAdmin />} />
      </Routes>
    </>
  );
}

export default App;
