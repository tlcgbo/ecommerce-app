import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart = [], deleteItem }) {
  return (
    <div className="bg-white text-black px-12 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Bag ({cart.length} Items)</h2>

      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={index} className="border-b pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => deleteItem(index)}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <Link
              to="/checkout"
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
