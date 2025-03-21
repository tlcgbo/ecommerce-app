import React, {useState} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/Signup'
import { signOut } from 'firebase/auth'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    // const signUserOut = () => {
    //   signOut(auth).then(() => {
    //     localStorage.clear();
    //     setIsAuth(false);
    //     window.location.pathname = "/login";
    //   });
    // };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuth(true);  // User is logged in
        } else {
          setIsAuth(false); // User is not logged in
        }
      });
      return () => unsubscribe();  // Cleanup the listener
    }, []);
  
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully");
          setIsAuth(false);  // Update state after sign-out
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
        <Route path='/cart' element={<Cart setIsAuth={setIsAuth} />} />
        <Route path='signup' element={<SignUp setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  )
}

export default App
