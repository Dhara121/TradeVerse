import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [portfolioSummary, setPortfolioSummary] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);
  const [virtualBalance, setVirtualBalance] = useState(user?.virtualBalance || 0);

  const token = user?.token;

  // Fallback if user/token missing
  if (!user || !token) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/portfolio', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolioSummary(res.data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (portfolioSummary.length === 0) return;

    const interval = setInterval(async () => {
      const symbols = portfolioSummary.map((stock) => stock.symbol);
      try {
        const res = await axiosInstance.get(`/stocks/live?symbols=${symbols.join(',')}`);
        setLivePrices(res.data);

        const time = new Date().toLocaleTimeString();
        const totalValue = symbols.reduce((acc, symbol) => {
          const price = res.data[symbol] || 0;
          const qty = portfolioSummary.find((p) => p.symbol === symbol)?.quantity || 0;
          return acc + price * qty;
        }, 0);

        setPriceHistory((prev) => [...prev.slice(-9), { time, value: totalValue }]);
      } catch (error) {
        console.error('Failed to fetch live prices:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [portfolioSummary]);

  const totalInvested = portfolioSummary.reduce(
    (acc, stock) => acc + stock.avgPrice * stock.quantity,
    0
  );
  const currentValue = portfolioSummary.reduce(
    (acc, stock) => acc + (livePrices[stock.symbol] || 0) * stock.quantity,
    0
  );

  const profitLoss = currentValue - totalInvested;
  const profitPercent = totalInvested ? (profitLoss / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0c0f1f] text-white flex flex-col items-center px-4 pt-24 pb-8">
      <h1 className="text-3xl font-bold mb-6">📊 Welcome {user?.name || 'Trader'}!</h1>

      {/* Summary Section */}
      <div className="w-full max-w-3xl bg-[#1c2238] p-6 rounded-xl shadow-lg mb-6 border border-gray-700">
        <p className="mb-2 text-sm text-gray-400">Email: {user?.email}</p>
        <p className="text-lg font-semibold text-blue-400 mb-4">
          💰 Virtual Balance: ₹{Number(virtualBalance).toLocaleString()}
        </p>
        <div className="text-white space-y-2 text-base">
          <p>Total Invested: ₹{totalInvested.toFixed(2)}</p>
          <p>Current Value: ₹{currentValue.toFixed(2)}</p>
          <p className={profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
            Net P&L: ₹{profitLoss.toFixed(2)} ({profitPercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="w-full max-w-3xl bg-[#1c2238] p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">📈 Portfolio Trend (Live)</h2>
        <ResponsiveContainer width="100%" height={300}>
          {priceHistory.length > 0 ? (
            <LineChart data={priceHistory}>
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} />
            </LineChart>
          ) : (
            <div className="text-center text-gray-400">Loading chart...</div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
