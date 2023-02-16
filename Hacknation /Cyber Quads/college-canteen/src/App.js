import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Order from './components/Order';
import Login from './components/Login';
import Root from './components/Root';
import Product from './components/Product';
import { useDispatch } from 'react-redux';
import { actionCreaters } from "./state/index";
import { useContext, useEffect } from 'react';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import urlContext from './context/api_url/urlContext';

function App() {

  const dispatch = useDispatch();
  const host = useContext(urlContext);


  useEffect(() => {
    // console.log(localStorage.getItem('darkTheme'))
    console.log("backend api is " + host);
    const defaultTheme = () => {
      dispatch(actionCreaters.setThemeDark(!Boolean(localStorage.getItem('darkTheme'))));
    }
    defaultTheme();
  })

  return (
    <>
      <BrowserRouter>
      {/* <div onClick={
          () => {
            dispatch(actionCreaters.setThemeDark(Boolean(localStorage.getItem('darkTheme'))));
          }
        }>butttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</div>
      <div onClick={
          () => {
            console.log(Boolean(localStorage.getItem('darkTheme')));
          }
        }>clggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</div> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Grid />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;