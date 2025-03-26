import React from "react";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";


function Navbar({ handleSignOut, isAuth }) {
  const [active, setActive] = useState("Home");

    

  return (
    <nav className="bg-black text-white px-6 py-4 flex flex-wrap items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4 text-sm font-medium">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <a href="#" className="hover:text-gray-300">Mens</a>
        <a href="#" className="hover:text-gray-300">Women</a>
        <a href="#" className="hover:text-gray-300">Shoes</a>
        
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="w-full sm:w-auto flex-grow max-w-md mt-3 sm:mt-0">
        <input
          type="text"
          placeholder="Search UA"
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white text-sm focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 text-sm font-medium mt-3 sm:mt-0">
        {!isAuth ? (
          <>
            <Link to="/signup" className="border border-gray-500 px-4 py-2 rounded-md hover:bg-gray-700">Signup</Link>
        <Link to="/login" className="border border-gray-500 px-4 py-2 rounded-md hover:bg-gray-700">Login</Link>
        <button className="relative">
          <ShoppingBasket className="text-2xl" />
          <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-2 rounded-full">
            1
          </span>
        </button>
          </>
        ) : (
          <>
            <Link to="/cart" className="border border-gray-500 px-4 py-2 rounded-md hover:bg-gray-700">Cart</Link>
            <Link to="/products" className="hover:text-gray-300">Products</Link>

            <button onClick={handleSignOut} className="border border-gray-500 px-4 py-2 rounded-md hover:bg-red-700">Sign Out</button>
          </>
        )}
        
      </div>
    </nav>
  );
}

export default Navbar;
