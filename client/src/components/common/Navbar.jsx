// src/components/common/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <Link to="/">
          <img src={logo} alt="TradeVerse Logo" className="h-10" />
        </Link>
        <div className="flex items-center space-x-6 text-[#1b1f3b] font-medium">
          <Link to="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
          <Link to="/trade" className="hover:text-blue-500 transition">Trade</Link>
          <Link to="/portfolio" className="hover:text-blue-500 transition">Portfolio</Link>
          <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
