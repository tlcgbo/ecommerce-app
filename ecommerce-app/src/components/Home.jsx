import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-40 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Welcome to Our Store
        </h1>
        <p className="mt-4 text-lg max-w-xl">
          Discover amazing products at unbeatable prices!
        </p>
        <Link to="/signup">
          <button className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
            Shop Now
          </button>
        </Link>
      </div>

     
    </div>
  );
}

export default Home;
