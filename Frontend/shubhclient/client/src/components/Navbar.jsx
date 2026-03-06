import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in - checks both storage types
    const checkAuth = () => {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const role = sessionStorage.getItem("role") || localStorage.getItem("role");
      
      console.log("🔍 Auth Check - Token exists:", !!token);
      console.log("🔍 Auth Check - Role:", role);
      console.log("🔍 Current Path:", location.pathname);
      
      setIsLoggedIn(!!token);
    };

    // Run check on mount and whenever the URL/Route changes
    checkAuth();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Changed to location.pathname for more specific dependency

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    
    // Clear both sessionStorage and localStorage
    sessionStorage.clear();
    localStorage.clear();
    
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg py-4`}>
      <div className="px-6 flex justify-between items-center">
        {/* Logo and Title - Left Side */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-25 h-25 rounded-full overflow-hidden shadow-md">
              <img 
                src="/images/mm.png" 
                alt="MealMitra Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Meal<span className="text-orange-600">Mitra</span>
            </span>
          </Link>
          
          {/* Available Meals Title - Shows only on meals page */}
          {location.pathname === '/meals' && (
            <h1 className="text-2xl font-bold text-gray-800">Available Meals</h1>
          )}
        </div>

        {/* Navigation Items - Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-800 bg-orange-100 px-4 py-2 rounded-full">
                👋 Welcome
              </span>
              <button 
                onClick={handleLogout} 
                className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-6 py-2 rounded-full border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:scale-105 transition shadow-md hover:shadow-lg">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;