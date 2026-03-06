import React from "react";

const DeliveryStats = ({ orders }) => {

  // 📦 pending = assigned + out for delivery
  const pending = orders.filter(
    o => o.status === "ASSIGNED" || o.status === "OUT_FOR_DELIVERY"
  ).length;

  // ✅ completed
  const completed = orders.filter(
    o => o.status === "DELIVERED"
  ).length;

  // 💰 delivery earnings only (not full payment)
  const totalEarnings = orders
    .filter(o => o.status === "DELIVERED")
    .reduce((total, order) => {
      const extra = order.amount * 0.25;
      const deliveryEarn = extra * 0.60;
      return total + deliveryEarn;
    }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* PENDING */}
      <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
        <p className="text-gray-500">Pending Tasks</p>
        <h2 className="text-3xl font-bold">{pending}</h2>
      </div>

      {/* EARNINGS */}
      <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
        <p className="text-gray-500">Today's Earnings</p>
        <h2 className="text-3xl font-bold text-green-700">
          ₹{totalEarnings.toFixed(0)}
        </h2>
      </div>

      {/* COMPLETED */}
      <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-orange-500">
        <p className="text-gray-500">Completed</p>
        <h2 className="text-3xl font-bold">{completed}</h2>
      </div>

    </div>
  );
};

export default DeliveryStats;
