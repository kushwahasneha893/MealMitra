import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomemakerProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          setError("Please login to view your profile");
          setLoading(false);
          navigate("/login");
          return;
        }

        console.log("Fetching profile with token:", token.substring(0, 20) + "...");

        const response = await fetch(
          "http://localhost:9999/api/homemaker/profile",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          
          if (response.status === 401 || response.status === 403) {
            setError("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError(`Failed to load profile: ${response.status}`);
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("✅ Profile data received:", data);
        setProfile(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Network error. Please check if backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  /* -------------------- ERROR STATE -------------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-red-600 font-medium mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- NO DATA STATE -------------------- */
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/kitchen")}
            className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            <span className="text-xl">←</span>
            Back to Kitchen
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-5xl">👨‍🍳</span>
            My Profile
          </h1>
          
          <div className="w-32"></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Cover Banner */}
          <div className="h-40 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 relative">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          {/* Profile Content */}
          <div className="px-10 pb-10 -mt-16 relative">
            
            {/* Avatar and Name Section */}
            <div className="flex items-end gap-8 mb-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1870/1870096.png"
                    alt="Chef Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
              </div>

              {/* Name and Kitchen */}
              <div className="flex-1 pb-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-1">
                  {profile.kitchenName || "Kitchen Name Not Set"}
                </h2>
                <p className="text-gray-500 flex items-center gap-2">
                  <span>📧</span>
                  {profile.email || "No email"}
                </p>
              </div>

              {/* Edit Button */}
              <button 
                onClick={() => navigate("/homemaker/edit-profile")}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mb-2">
                <span>✏️</span>
                Edit Profile
              </button>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Wallet Balance */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-2xl">
                    💰
                  </div>
                  <span className="text-green-600 text-xl">📈</span>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Wallet Balance</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{profile.walletBalance !== null && profile.walletBalance !== undefined 
                    ? profile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : "0.00"}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-2xl">
                    📞
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Contact Number</p>
                <p className="text-2xl font-bold text-gray-800">
                  {profile.phone || "Not provided"}
                </p>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-2xl">
                    📍
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Location</p>
                <p className="text-xl font-bold text-gray-800">
                  {profile.location || "Not provided"}
                </p>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  icon="👤"
                  label="Homemaker ID" 
                  value={profile.id ? `#${profile.id}` : "N/A"} 
                />
                <InfoItem 
                  icon="📦"
                  label="Account Status" 
                  value="Active" 
                  valueClass="text-green-600 font-semibold"
                />
                <InfoItem 
                  icon="🏠"
                  label="Kitchen Name" 
                  value={profile.kitchenName || "Not set"} 
                />
                <InfoItem 
                  icon="📧"
                  label="Email Address" 
                  value={profile.email || "Not provided"} 
                />
              </div>
            </div>

            {/* Complete Profile Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Complete Profile Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailRow label="Kitchen Name" value={profile.kitchenName || "Not set"} />
                <DetailRow label="Email ID" value={profile.email || "Not provided"} />
                <DetailRow label="Contact Number" value={profile.phone || "Not provided"} />
                <DetailRow label="Service Location" value={profile.location || "Not provided"} />
                <DetailRow 
                  label="Wallet Balance" 
                  value={`₹ ${profile.walletBalance !== null && profile.walletBalance !== undefined 
                    ? profile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : "0.00"}`} 
                />
                <DetailRow label="Homemaker ID" value={profile.id ? `#${profile.id}` : "N/A"} />
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            title="View Orders"
            description="Manage your tiffin orders"
            icon="📦"
            onClick={() => navigate("/homemaker/orders")}
          />
          <ActionCard 
            title="Menu Management"
            description="Update your tiffin menu"
            icon="📋"
            onClick={() => navigate("/homemaker/menu")}
          />
          <ActionCard 
            title="Earnings"
            description="Track your income"
            icon="💰"
            onClick={() => navigate("/homemaker/earnings")}
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------- HELPER COMPONENTS -------------------- */

const InfoItem = ({ icon, label, value, valueClass = "text-gray-800" }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
    <p className="text-base font-semibold text-gray-800">{value}</p>
  </div>
);

const ActionCard = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left group hover:-translate-y-1"
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-500">{description}</p>
  </button>
);

export default HomemakerProfile;
