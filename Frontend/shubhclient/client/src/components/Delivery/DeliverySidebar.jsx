const DeliverySidebar = ({ activeTab, setActiveTab }) => {
  const item = (id, label, icon) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-5 py-3 text-left 
        transition
        ${
          activeTab === id
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-blue-700"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 z-20">

      {/* MENU */}
      <div className="flex-1 py-33 space-y-1">
        {item("dashboard", "Dashboard", "🏠")}
        {item("active", "Active Orders", "📦")}
        {item("history", "Order History", "🕘")}
        {item("earnings", "Earnings", "💰")}

      </div>

      
    </aside>
  );
};

export default DeliverySidebar;
