import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion";

function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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

      {/* Order History Section */}
      <div className="px-6 pb-12">
        <h2 className="text-2xl font-bold mb-4">Previous Orders</h2>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Order by {order.userInfo.name}</h3>
                <p className="text-sm mb-2">Shipping to: {order.userInfo.address}</p>
                <p className="text-sm mb-2">Payment: {order.userInfo.paymentMethod}</p>
                <ul className="mb-2 text-sm list-disc list-inside">
                  {order.cart.map((item, idx) => (
                    <li key={idx}>{item.name} - {item.price}</li>
                  ))}
                </ul>
                <p className="font-semibold">Total: ${order.totalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
