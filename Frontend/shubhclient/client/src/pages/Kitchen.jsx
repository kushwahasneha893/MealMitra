import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:9999/api";

const Kitchen = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [earnings, setEarnings] = useState(0);

  const [showOrders, setShowOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [meal, setMeal] = useState({
    foodName: "",
    category: "Veg",
    price: "",
    quantity: 0
  });

  const handleProfile = () => navigate("/homemakerProfile");

  const updateOrderStatus = async (orderId, action) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.put(`${API_BASE}/homemaker/order/${orderId}/${action}`, {}, { headers });

      toast.success(action === "accept" ? "Order Accepted" : "Order Rejected");
      fetchDashboardData();
    } catch {
      toast.error("Failed to update order");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "HOMEMAKER") {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [menuRes, orderRes, feedbackRes] = await Promise.all([
        axios.get(`${API_BASE}/homemaker/menu`, { headers }),
        axios.get(`${API_BASE}/homemaker/orders`, { headers }),
        axios.get(`${API_BASE}/homemaker/feedback`, { headers })
      ]);

      const menuData = menuRes.data || [];
      let orderData = orderRes.data || [];
      const feedbackData = feedbackRes.data || [];

      orderData = orderData.sort((a, b) => b.id - a.id);

      setMenuItems(menuData);
      setOrders(orderData);
      setFeedbacks(feedbackData);

     // 💰 homemaker earning only (NOT full order amount)
const total = orderData
  .filter(o => o.status === "DELIVERED")
  .reduce((sum, o) => {
    const foodPrice = Number(o.amount || 0) / 1.25;
    return sum + foodPrice;
  }, 0);

setEarnings(total.toFixed(0));

    } catch {
      toast.error("Failed loading dashboard");
    }
  };

  const handleChange = (e) =>
    setMeal({ ...meal, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setEditingId(null);
    setMeal({ foodName: "", category: "Veg", price: "", quantity: 0 });
    setShowModal(true);
  };

  const handleDeleteLocal = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Menu Deleted");
  };

  const handleEditLocal = (item) => {
    setEditingId(item.id);
    setMeal(item);
    setShowModal(true);
  };

  const handleSaveMeal = async (e) => {
    e.preventDefault();

    if (editingId) {
      setMenuItems(menuItems.map(i => i.id === editingId ? { ...i, ...meal } : i));
      setEditingId(null);
      setShowModal(false);
      toast.success("Menu Updated");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.post(`${API_BASE}/homemaker/menu`, {
        ...meal,
        price: Number(meal.price),
        quantity: Number(meal.quantity)
      }, { headers });

      setMenuItems(prev => [res.data, ...prev]);
      toast.success("Menu Added");
      setShowModal(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  const getFeedbackOrderId = (feedback) => {
    return feedback.order?.id || feedback.orderId || feedback.order_id || null;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 shadow-2xl">
        
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Meal<span className="text-orange-500">Mitra</span></h1>
              <p className="text-slate-400 text-xs">Kitchen Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-10 space-y-1">
          <button 
            onClick={() => setShowOrders(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              !showOrders 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="font-medium">Dashboard</span>
          </button>

          <button 
            onClick={() => setShowOrders(true)}
            className={`w-full flex items-center gap- px-4 py-3 rounded-lg transition-all duration-200 ${
              showOrders 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-xl">📋</span>
            <span className="font-medium">Orders</span>
          </button>

         
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 p-15">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">
            {showOrders ? 'Order Management' : 'Dashboard'}
          </h1>
          <p className="text-slate-500 text-sm">
            {showOrders ? 'Manage your incoming orders' : 'Welcome back, Partner!'}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Earnings" 
            value={`₹${earnings}`}
            icon="💰"
            color="bg-gradient-to-br from-green-400 to-green-600"
          />
          <StatCard 
            title="Menu Items" 
            value={menuItems.length}
            icon="🍽️"
            color="bg-gradient-to-br from-blue-400 to-blue-600"
          />
          <StatCard 
            title="Rating" 
            value={
              feedbacks.length
                ? (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1)
                : "N/A"
            }
            icon="⭐"
            color="bg-gradient-to-br from-yellow-400 to-orange-500"
          />
        </div>

        {/* MENU */}
        {!showOrders && (
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-500">My Menu</h2>
              <button 
                onClick={openAddModal}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                + Add Menu Item
              </button>
            </div>

            {menuItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No menu items yet. Add your first dish!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 text-base mb-1">{item.foodName}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            item.category === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.category}
                          </span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-semibold text-slate-800">₹{item.price}</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditLocal(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteLocal(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {showOrders && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Orders</h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => {
                  const orderFeedback = feedbacks.find(fb => {
                    const fid = getFeedbackOrderId(fb);
                    return fid && Number(fid) === Number(order.id);
                  });

                  const statusColors = {
                    PENDING: 'bg-yellow-100 text-yellow-700',
                    PAID: 'bg-blue-100 text-blue-700',
                    ACCEPTED: 'bg-purple-100 text-purple-700',
                    PREPARING: 'bg-orange-100 text-orange-700',
                    DELIVERED: 'bg-green-100 text-green-700',
                    REJECTED: 'bg-red-100 text-red-700'
                  };

                  return (
                    <div key={order.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 text-base mb-2">Order #{order.id}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-600">Status:</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.PENDING}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-800">₹{order.amount}</p>
                        </div>
                      </div>

                      {(order.status === "PAID" || order.status === "PENDING") && (
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={() => updateOrderStatus(order.id, "accept")}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded font-medium text-sm transition-colors"
                          >
                            Accept
                          </button>

                          <button 
                            onClick={() => updateOrderStatus(order.id, "reject")}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-medium text-sm transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {orderFeedback && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                          <p className="font-semibold text-sm mb-1 text-slate-700">Customer Feedback:</p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-semibold text-sm">{orderFeedback.rating}/5</span>
                          </div>
                          <p className="italic text-sm text-slate-600">"{orderFeedback.comment}"</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{editingId ? '✏️' : '➕'}</span>
                  {editingId ? "Edit Meal" : "Add New Meal"}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveMeal} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Food Name</label>
                <input 
                  name="foodName" 
                  placeholder="e.g., Paneer Butter Masala"
                  value={meal.foodName}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-300 focus:border-orange-500 p-3 rounded-lg outline-none transition-colors"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  name="category"
                  value={meal.category}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-300 focus:border-orange-500 p-3 rounded-lg outline-none transition-colors"
                >
                  <option value="Veg">🥗 Vegetarian</option>
                  <option value="Non-Veg">🍗 Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹)</label>
                <input 
                  name="price" 
                  placeholder="e.g., 150"
                  type="number"
                  value={meal.price}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-300 focus:border-orange-500 p-3 rounded-lg outline-none transition-colors"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity Available</label>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() =>
                      setMeal(prev => ({
                        ...prev,
                        quantity: Math.max(0, Number(prev.quantity || 0) - 1)
                      }))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-lg font-bold text-xl shadow-md transition-colors"
                  >
                    −
                  </button>

                  <input 
                    type="number" 
                    name="quantity"
                    value={meal.quantity}
                    onChange={handleChange}
                    className="flex-1 border-2 border-slate-300 focus:border-orange-500 p-3 text-center rounded-lg text-xl font-bold outline-none transition-colors" 
                  />

                  <button 
                    type="button"
                    onClick={() =>
                      setMeal(prev => ({
                        ...prev,
                        quantity: Number(prev.quantity || 0) + 1
                      }))
                    }
                    className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-lg font-bold text-xl shadow-md transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all mt-6"
              >
                {editingId ? '💾 Update Meal' : '➕ Add Meal'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
    <div className="flex justify-between items-start mb-3">
      <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">{title}</p>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

export default Kitchen;