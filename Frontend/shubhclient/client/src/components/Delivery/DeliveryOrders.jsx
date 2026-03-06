import React from "react";
import axios from "axios";

const API_BASE = "http://localhost:9999/api";

const DeliveryOrders = ({ orders, refreshOrders }) => {

  const token = localStorage.getItem("token");

  const acceptOrder = async (id) => {
    await axios.put(`${API_BASE}/delivery/accept/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refreshOrders();
  };

  const rejectOrder = async (id) => {
    await axios.put(`${API_BASE}/delivery/reject/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refreshOrders();
  };

  const deliverOrder = async (id) => {
    await axios.put(`${API_BASE}/delivery/deliver/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refreshOrders();
  };

  // 💰 calculate earning
  const calculateEarning = (amount) => {
    const extra = amount * 0.25;
    const deliveryEarn = extra * 0.60;
    return deliveryEarn.toFixed(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">Delivery Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center py-10">No orders</p>
      ) : (
        orders.map(order => (
          <div key={order.id}
            className="flex justify-between items-center bg-gray-50 p-4 mb-3 rounded-xl">

            <div>
              <p className="font-bold">Order #{order.id}</p>
              <p>Status: {order.status}</p>

              {/* 💰 show earning only after delivery */}
              {order.status === "DELIVERED" && (
                <p className="text-green-700 font-bold">
                  Earned ₹{calculateEarning(order.amount)}
                </p>
              )}
            </div>

            <div className="flex gap-2">

              {/* ACCEPT / REJECT */}
              {order.status === "ASSIGNED" && (
                <>
                  <button
                    onClick={() => acceptOrder(order.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded">
                    Accept
                  </button>

                  <button
                    onClick={() => rejectOrder(order.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded">
                    Reject
                  </button>
                </>
              )}

              {/* DELIVER */}
              {order.status === "OUT_FOR_DELIVERY" && (
                <button
                  onClick={() => deliverOrder(order.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded">
                  Delivered
                </button>
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DeliveryOrders;
