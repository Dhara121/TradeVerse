// src/pages/Portfolio.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useSelector } from 'react-redux';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axiosInstance.get('/user/portfolio', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPortfolio(res.data);
      } catch (err) {
        alert('Error fetching portfolio');
      }
    };

    fetchPortfolio();
  }, [user.token]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Portfolio 📈</h2>
      <div className="grid gap-4">
        {portfolio.map((stock) => (
          <div key={stock.stockSymbol} className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">{stock.stockSymbol}</h3>
            <p>Quantity: {stock.quantity}</p>
            <p>Avg Buy Price: ₹{stock.averageBuyPrice}</p>
            <p>Total Invested: ₹{stock.totalInvested}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
