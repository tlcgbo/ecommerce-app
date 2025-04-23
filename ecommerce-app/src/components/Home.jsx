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
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Style Rush ⚡
        </h1>
        <p className="mt-4 text-lg max-w-xl">
        Where Fashion Meets Simplicity
        </p>
        <Link to="/signup">
          <button className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Order History Section */}
      <div className="px-6 pb-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
          Previous Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-400">No orders placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {order.userInfo.name}
                </h3>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Address:</strong> {order.userInfo.address}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  <strong>Payment:</strong> {order.userInfo.paymentMethod}
                </p>
                <div className="mb-3">
                  <h4 className="font-medium mb-1">Items:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                    {order.cart.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-bold text-lg text-green-400">
                  Total: ${order.totalPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
