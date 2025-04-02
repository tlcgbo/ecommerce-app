import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import { signOut } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import Products from './components/Products';
import Checkout from './components/Checkout';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [cart, setCart] = useState([]);

  // Add items to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove items from cart
  const deleteItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        setIsAuth(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <Router>
      <ToastContainer position="top-right" theme="colored" />
      <Navbar handleSignOut={handleSignOut} isAuth={isAuth} />

      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/cart' element={<Cart cart={cart} deleteItem={deleteItem} />} />
        <Route path='/signup' element={<SignUp setIsAuth={setIsAuth} />} />
        <Route path='/products' element={<Products addToCart={addToCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
