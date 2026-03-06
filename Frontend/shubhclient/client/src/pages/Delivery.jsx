import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DeliverySidebar from "../components/delivery/DeliverySidebar";
import DeliveryStats from "../components/delivery/DeliveryStats";
import DeliveryOrders from "../components/delivery/DeliveryOrders";
import DeliveryEarnings from "../components/delivery/DeliveryEarnings";

const API_BASE = "http://localhost:9999/api";

const Delivery = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "DELIVERY") {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  // 📦 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/delivery/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Orders:", res.data);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      
      {/* SIDEBAR */}
      <DeliverySidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 pt-40 pb-10">

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <DeliveryStats orders={orders} />
              <DeliveryOrders 
                orders={orders} 
                refreshOrders={fetchOrders} 
              />
            </>
          )}

          {/* ACTIVE ORDERS */}
          {activeTab === "active" && (
            <DeliveryOrders
              orders={orders.filter(o => o.status === "OUT_FOR_DELIVERY")}
              refreshOrders={fetchOrders}
            />
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <DeliveryOrders 
              orders={orders} 
              refreshOrders={fetchOrders} 
            />
          )}

          {/* EARNINGS */}
          {activeTab === "earnings" && (
            <DeliveryEarnings orders={orders} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Delivery;
