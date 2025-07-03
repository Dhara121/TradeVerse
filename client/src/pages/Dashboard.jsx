// src/pages/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || 'Trader'} 👋</h1>
      <div className="bg-white shadow rounded p-6 w-full max-w-xl">
        <p className="text-lg font-semibold">Email: {user?.email}</p>
        <p className="text-lg font-semibold mt-2">
          Virtual Balance: ₹{user?.virtualBalance?.toLocaleString() || 0}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
