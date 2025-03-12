import React from "react";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-gray-300">New</a>
        <a href="#" className="hover:text-gray-300">Men</a>
        <a href="#" className="hover:text-gray-300">Women</a>
        <a href="#" className="hover:text-gray-300">Kids</a>
        <a href="#" className="hover:text-gray-300">Shoes</a>
        <a href="#" className="hover:text-gray-300">Curry</a>
        <a href="#" className="hover:text-gray-300">Outlet</a>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex-grow mx-6">
        <input
          type="text"
          placeholder="Search UA"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-300">Need Help?</a>
        <a href="#" className="hover:text-gray-300">US</a>
        <a href="#" className="hover:text-gray-300">English</a>
        <button className="border px-3 py-1 rounded">Register</button>
        <button className="border px-3 py-1 rounded">Log In</button>
        <button className="relative">
          <span className="material-icons">shopping_cart</span>
          <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full">1</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
