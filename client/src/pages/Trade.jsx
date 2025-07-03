// src/pages/Trade.jsx
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useSelector } from 'react-redux';

const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('buy');
  const user = useSelector((state) => state.auth.user);

  const handleTrade = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/trades',
        {
          stockSymbol: symbol,
          quantity: Number(quantity),
          price: Number(price),
          type: type.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert('Trade executed successfully!');
      setSymbol('');
      setQuantity('');
      setPrice('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Trade failed');
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">Execute Trade</h2>
      <form onSubmit={handleTrade} className="bg-white shadow p-6 rounded">
        <input
          type="text"
          placeholder="Stock Symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Trade
        </button>
      </form>
    </div>
  );
};

export default Trade;
