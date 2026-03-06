import React from "react";

const DeliveryEarnings = ({ orders }) => {
  const deliveredOrders = orders.filter(
    o => o.status === "DELIVERED"
  );

  const totalEarnings = deliveredOrders.reduce(
    (sum, o) => sum + (o.amount || 0),
    0
  );

  const totalDeliveries = deliveredOrders.length;

  return (
    <div className="max-w-3xl">
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-1 text-gray-800">
        Earnings
      </h2>
      <p className="text-gray-500 mb-6">
        Your delivery earnings summary
      </p>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Total Earnings
            </p>
            <p className="text-4xl font-bold text-green-600">
              ₹{totalEarnings}
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl">
            💰
          </div>
        </div>
      </div>

      {/* SMALL STATS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">
            Total Deliveries
          </p>
          <p className="text-2xl font-bold">
            {totalDeliveries}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
