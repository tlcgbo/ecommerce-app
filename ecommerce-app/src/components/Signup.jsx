import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  
import GoogleBtn from "./GoogleBtn";

const initialState = {
  username: "",
  email: "",
  password: "",  
  confirmPassword: "",
};

const SignUp = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all input fields.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      localStorage.setItem("isAuth", "true");

      if (typeof setIsAuth === "function") {
        setIsAuth(true); 
      }
      
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/weak-password":
          toast.error("Weak password. Must be at least 6 characters.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <ToastContainer />
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter your name"
              value={username}
              onChange={handleChange}
              name="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4">
          <GoogleBtn setIsAuth={setIsAuth} />
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
