import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9999/api/customer/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        setCustomer(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  // ✅ Back button → Meals page
  const handleBackClick = () => {
    navigate("/meals");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <p className="text-gray-500">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex justify-center items-center p-6 py-40">
      <div className="w-full max-w-3xl">

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 pt-8 pb-20 px-10">
            
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2
                         text-white font-semibold rounded-lg
                         bg-white/20 backdrop-blur-sm
                         hover:bg-white/30 hover:scale-105
                         transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="relative flex flex-col items-center mt-4">
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-5xl font-bold shadow-2xl text-orange-600 ring-4 ring-white/50">
                {customer.name.charAt(0).toUpperCase()}
              </div>

              <h1 className="mt-6 text-3xl font-bold text-white">
                {customer.name}
              </h1>
              <p className="mt-2 text-orange-50">
                {customer.user.email}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 py-8 -mt-8">
            <div className="space-y-3">
              <ProfileRow icon="👤" label="Full Name" value={customer.name} />
              <ProfileRow icon="📞" label="Mobile Number" value={customer.phone} />
              <ProfileRow icon="📧" label="Email Address" value={customer.user.email} />
              <ProfileRow icon="📍" label="Address" value={customer.address} />
              <ProfileRow icon="🏙️" label="City" value={customer.city} />
              <ProfileRow icon="📮" label="Pincode" value={customer.pincode} />
            </div>

            {/* ❌ Edit button removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 border-2 border-gray-100 rounded-2xl p-4
                  hover:border-orange-200 hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
      <p className="text-gray-800 font-semibold">
        {value || <span className="text-gray-400">Not provided</span>}
      </p>
    </div>
  </div>
);

export default CustomerProfile;
