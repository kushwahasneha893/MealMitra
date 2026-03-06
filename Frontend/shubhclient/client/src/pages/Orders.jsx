import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeedbackModal from "./FeedbackModal";

const API_BASE = "http://localhost:9999/api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "CUSTOMER") {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [navigate]);

  // ⭐ FETCH + SORT NEWEST FIRST
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/customer/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("📥 ORDERS API RESPONSE:", res.data);

      let orderData = res.data || [];

      // ⭐ SORT NEWEST ORDER ON TOP
      orderData = orderData.sort((a, b) => {
        const idA = a.id || a.orderId || a.orderNumber || 0;
        const idB = b.id || b.orderId || b.orderNumber || 0;
        return idB - idA; // descending order
      });

      setOrders(orderData);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
      alert("Failed to load orders");
    }
  };

  const handleBackToMeals = () => {
    navigate('/meals');
  };

  const handleGiveFeedback = (order) => {
    const actualOrderId = order.id || order.orderId || order.orderNumber;

    console.log("🎯 Give Feedback clicked!");
    console.log("🎯 Order object:", order);
    console.log("🎯 Order ID:", actualOrderId);

    if (!actualOrderId) {
      alert("ERROR: Order ID missing");
      return;
    }

    setSelectedOrder(actualOrderId);
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-32 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

        {/* BACK BUTTON */}
        <button
          onClick={handleBackToMeals}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Meals
        </button>

        <h1 className="text-xl font-bold mb-4">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet</p>
        ) : (
          orders.map(order => {
            const actualOrderId = order.id || order.orderId || order.orderNumber;

            return (
              <div
                key={actualOrderId}
                className="border p-4 rounded-lg mb-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">Order #{actualOrderId}</p>
                  <p className="text-sm text-gray-500">
                    Status: {order.status}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-bold">₹{order.amount}</p>

                  {order.status === "DELIVERED" && (
                    <button
                      onClick={() => handleGiveFeedback(order)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-sm font-medium"
                    >
                      Give Feedback
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ⭐ FEEDBACK MODAL */}
      {selectedOrder && (
        <FeedbackModal
          orderId={selectedOrder}
          close={() => setSelectedOrder(null)}
          refreshOrders={fetchOrders}
        />
      )}
    </div>
  );
};

export default Orders;
