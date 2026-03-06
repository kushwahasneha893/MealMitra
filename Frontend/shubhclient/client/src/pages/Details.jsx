import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:9999/api";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orderLoading, setOrderLoading] = useState(false);

  // ================= FETCH MEAL =================
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE}/homemaker/public/menu/${id}`
        );

        setMeal(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  const homemaker = meal?.homemaker;

  // ================= VEG/NONVEG =================
  const getMealType = (foodName = "") => {
    const nonVegKeywords = [
      "chicken","mutton","fish","egg","meat","prawn",
      "nonveg","non-veg","pork","beef","lamb","bacon"
    ];

    const lower = foodName.toLowerCase();
    return nonVegKeywords.some(k => lower.includes(k)) ? "NON-VEG" : "VEG";
  };

  // ================= QUANTITY =================
  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= meal.quantity) {
      setQuantity(newQty);
    }
  };

  // ================= TOTAL =================
  const calculateTotal = () => {
  const foodTotal = meal.price * quantity;

  // 🔥 25% extra charge logic
  const extraCharge = foodTotal * 0.25;

  const finalTotal = foodTotal + extraCharge;

  return finalTotal.toFixed(2);
};


  // ================= PLACE ORDER =================
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      setOrderLoading(true);

      const payload = {
        items: [
          {
            menuId: meal.id,
            quantity: quantity
          }
        ]
      };

      // 🔥 CREATE ORDER (status = PENDING_PAYMENT)
      const res = await axios.post(
        `${API_BASE}/customer/orders`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const order = res.data;
      console.log("Order created:", order);

      // ⭐ GO TO PAYMENT PAGE
      navigate(`/payment/${order.id}`);

    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setOrderLoading(false);
    }
  };

  // ================= UI STATES =================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading meal...</div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Meal not found</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 font-medium"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <p className="text-sm">Kitchen</p>
            <h2 className="text-xl font-bold">
              {homemaker?.kitchenName || "Kitchen"}
            </h2>

            <h1 className="text-3xl font-bold mt-3">{meal.foodName}</h1>

            <span className="bg-green-600 px-3 py-1 rounded text-sm">
              {getMealType(meal.foodName)}
            </span>
          </div>

          {/* BODY */}
          <div className="p-8">

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded">
                <p>Price</p>
                <p className="text-2xl font-bold text-green-600">
  ₹{(meal.price * 1.25).toFixed(2)}
</p>

              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p>Available</p>
                <p className="text-2xl font-bold">{meal.quantity}</p>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                -
              </button>

              <span className="text-xl font-bold">{quantity}</span>

              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* ORDER BUTTON */}
            <button
              onClick={handlePlaceOrder}
              disabled={orderLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-bold"
            >
              {orderLoading
                ? "Creating Order..."
                : `Place Order - ₹${calculateTotal()}`
              }
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
