import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchPortfolio = async () => {
      try {
        const res = await axiosInstance.get('/portfolio', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPortfolio(res.data);
        toast.success('Portfolio loaded successfully');
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        toast.error('Failed to fetch portfolio');
      }
    };

    fetchPortfolio();
  }, [user]);

  return (
    <div className="p-24 min-h-screen bg-[#0f172a] text-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Your Portfolio 📈</h2>

      {portfolio.length === 0 ? (
        <p className="text-gray-400">No stocks in your portfolio yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((stock) => {
            const currentPrice = stock.currentPrice || 0; // ensure backend sends this
            const totalValue = currentPrice * stock.quantity;
            const profitLoss = totalValue - stock.totalInvested;
            const profitLossPercent = stock.totalInvested ? ((profitLoss / stock.totalInvested) * 100).toFixed(2) : 0;

            return (
              <div
                key={stock.stockSymbol}
                className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-gray-700 hover:shadow-blue-500/30 transition duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{stock.stockSymbol}</h3>
                <p className="text-gray-300">Quantity: {stock.quantity}</p>
                <p className="text-gray-300">Avg Buy Price: ₹{stock.averageBuyPrice}</p>
                <p className="text-gray-300">Current Price: ₹{currentPrice}</p>
                <p className={`font-semibold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profitLoss >= 0 ? 'Profit' : 'Loss'}: ₹{Math.abs(profitLoss)} ({profitLossPercent}%)
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
