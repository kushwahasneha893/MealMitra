import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:9999/api";

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/customer/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const found = res.data.find(o => String(o.id) === String(orderId));

      if (!found) {
        alert("Order not found");
        navigate("/orders");
        return;
      }

      setOrder(found);

    } catch {
      alert("Failed to load order");
    }
  };

  const payNow = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_BASE}/payment/pay`,
        {
          orderId: Number(order.id),
          method: "UPI"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Payment Successful 🎉");
      
      // Redirect back to orders page after payment
      navigate("/orders");

    } catch (err) {
      console.error("Payment error:", err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  if (!order) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-2">Order ID: {order.id}</p>
        <p className="text-xl font-bold mb-6">₹{order.amount}</p>

        <button
          onClick={payNow}
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 font-medium"
        >
          Pay with UPI
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="mt-3 text-blue-600 hover:underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;