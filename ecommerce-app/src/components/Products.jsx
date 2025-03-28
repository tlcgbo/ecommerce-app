import React, { useState } from "react";

function Products({ addToCart }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const products = [
    { id: 1, name: "Men's Shoes", category: "men", price: "$100", image: "https://www.mytheresa.com/media/1094/1238/100/e7/P00362116.jpg" },
    { id: 2, name: "Women's Shoes", category: "women", price: "$120", image: "https://www.hbshoes.co.uk/images/hb-shoes-morgan-p603-5699_image.jpg" },
    { id: 3, name: "Men's Jacket", category: "men", price: "$80", image: "https://thecollegestore.co.uk/cdn/shop/products/RhodesTrust_Men_sPufferJacketBlack.jpg?v=1604259640" },
    { id: 4, name: "Women's Jacket", category: "women", price: "$90", image: "https://static.cimalp.fr/33824-large_default/sleeveless-puffer-jacket.jpg" },
  ];

  const filteredProducts = products.filter(product =>
    (filter === "all" || product.category === filter) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm focus:outline-none w-full sm:w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-0 sm:ml-4 mt-4 sm:mt-0 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-500 p-4 rounded-lg text-center bg-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-400">{product.price}</p>
              <button 
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                onClick={() => addToCart(product)} // Add to Cart
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;
