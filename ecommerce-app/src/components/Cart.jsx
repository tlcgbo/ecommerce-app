import React, { useState } from "react";

function Cart() {
  return (
    <div className="bg-white text-black px-12 py-8 flex justify-between">
      {/* Left Section (Cart Items & Shipping) */}
      <div className="w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Your Bag (1 Item)</h2>

        {/* Shipping Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping</h3>
          <div className="flex items-start space-x-4">
          
            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <p className="font-medium">Women's UA Tech™ Twist ½ Zip</p>
              <p className="text-gray-500 text-sm">Color: Black / Metallic Silver</p>
              <p className="text-gray-500 text-sm">Size: XS</p>
              <p className="font-semibold mt-2">$45.00</p>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <input type="radio" checked className="accent-black" />
            <label>Ship To An Address</label>
            <input type="radio" className="accent-black" />
            <label>Pick Up In Store</label>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default Cart;
