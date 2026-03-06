import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Meals() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch meals from API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');

        if (!token) {
          setError("Please login again");
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(
          "http://localhost:9999/api/homemaker/public/menu"
        );
        setMeals(response.data);

        setFilteredMeals(response.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setError("Unauthorized or Server Error");
        setLoading(false);
      }
    };

    fetchMeals();
  }, [navigate]);

  // Determine if meal is veg or non-veg based on food name
  const getMealType = (foodName) => {
    const nonVegKeywords = [
      'chicken', 'mutton', 'fish', 'egg', 'meat', 'prawn', 'biryani',
      'nonveg', 'non-veg', 'non veg', 'pork', 'beef', 'lamb', 'turkey',
      'duck', 'crab', 'lobster', 'shrimp', 'seafood', 'bacon', 'sausage',
      'ham', 'salami', 'pepperoni', 'anchovies', 'tuna', 'salmon'
    ];
    const lowerCaseName = foodName.toLowerCase();
    
    for (let keyword of nonVegKeywords) {
      if (lowerCaseName.includes(keyword)) {
        return 'NON-VEG';
      }
    }
    return 'VEG';
  };

  // Handle order navigation
  const handleOrderClick = (mealId) => {
    navigate(`/details/${mealId}`);
  };

  // Handle order history navigation
  const handleOrderHistory = () => {
    navigate('/orders');
  };

  // Handle profile navigation
  const handleProfile = () => {
    navigate('/customerProfile');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-32">
        <div className="text-xl">Loading meals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-32">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-32 px-6 pb-6">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/mm.jpg')",
          zIndex: -1
        }}
      >
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-36 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all lg:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-32 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-64`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          
          {/* Profile Button */}
          <button
            onClick={handleProfile}
            className="w-full flex items-center gap-3 px-4 py-3 mb-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold">My Profile</span>
          </button>

          {/* Order History Button */}
          <button
            onClick={handleOrderHistory}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="font-semibold">Order History</span>
          </button>

          {/* Additional sidebar options can go here
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold">Home</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto relative lg:ml-64">
        {/* Meal Type Filter */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filter by Type</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilteredMeals(meals)}
              className="px-6 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              All Types
            </button>
            <button
              onClick={() => setFilteredMeals(meals.filter(meal => getMealType(meal.foodName) === 'VEG'))}
              className="px-6 py-2 rounded-full font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-all"
            >
              🥗 Vegetarian
            </button>
            <button
              onClick={() => setFilteredMeals(meals.filter(meal => getMealType(meal.foodName) === 'NON-VEG'))}
              className="px-6 py-2 rounded-full font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all"
            >
              🍗 Non-Vegetarian
            </button>
          </div>
        </div>

        {/* Meals Grid */}
        {filteredMeals.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-12">
            No meals found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map(meal => (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold">{meal.foodName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      getMealType(meal.foodName) === 'VEG' 
                        ? 'bg-green-500' 
                        : 'bg-red-600'
                    }`}>
                      {getMealType(meal.foodName)}
                    </span>
                  </div>
                  <p className="text-sm mt-1 opacity-90">{meal.category}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Kitchen Info */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">
                      🏪 {meal.homemaker?.kitchenName || 'Kitchen'}
                    </h4>
                    <div className="space-y-1 text-gray-600">
                      <p className="flex items-center">
                        <span className="font-medium mr-2">📍</span>
                        {meal.homemaker?.location || 'Location not available'}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium mr-2">📞</span>
                        <a 
                          href={`tel:${meal.homemaker?.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {meal.homemaker?.phone || 'N/A'}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-green-600">
  ₹{(meal.price * 1.25).toFixed(2)}
</p>

                    </div>
                    <div className="text-right">
                      
                     
                    </div>
                  </div>

                  {/* Order Button */}
                  <button 
                    onClick={() => handleOrderClick(meal.id)}
                    className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all ${
                      meal.quantity > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={meal.quantity === 0}
                  >
                    {meal.quantity > 0 ? 'Order Now' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Meals;