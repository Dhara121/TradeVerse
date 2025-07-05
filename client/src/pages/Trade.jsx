import React, { useState , useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";


const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('buy');
  const user = useSelector((state) => state.auth.user);

  const handleTrade = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post(
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

    dispatch(updateBalance(res.data.virtualBalance)); // Redux + localStorage sync
    toast.success(res.data.message || 'Trade successful');

    // Reset form
    setSymbol('');
    setQuantity('');
    setPrice('');
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Trade failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e1a] px-4">
      <form
        onSubmit={handleTrade}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg text-white w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Execute Trade</h2>
        <input
          type="text"
          placeholder="Stock Symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 text-white"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 text-white"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/20 placeholder-gray-300 text-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-white/10 border border-white/20 text-white"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 px-4 rounded font-semibold transition"
        >
          Submit Trade
        </button>
      </form>
    </div>
  );
};

export default Trade;
