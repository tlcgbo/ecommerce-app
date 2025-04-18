import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config"; // Firebase config file
import { collection, addDoc } from "firebase/firestore";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")), 0);

  const handleOrder = async () => {
    try {
      // Create an order object with the user and cart information
      const orderData = {
        userInfo,
        cart,
        totalPrice: totalPrice.toFixed(2),
        createdAt: new Date(),
      };

      // Save the order to Firestore
      await addDoc(collection(db, "orders"), orderData);

      // Notify the user that the order was placed
      alert("Order placed successfully!");

      // Redirect to home after placing order
      navigate("/");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="bg-white text-black px-12 py-8">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {cart.length > 0 ? (
        <>
          {/* Cart Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-medium">Order Summary</h3>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
            <div className="mt-4 font-semibold">Total: ${totalPrice.toFixed(2)}</div>
          </div>


          

          {/* Checkout Form */}
          <div className="mb-6">
            <h3 className="text-lg font-medium">Shipping Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userInfo.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              name="paymentMethod"
              value={userInfo.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleOrder}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Checkout;
