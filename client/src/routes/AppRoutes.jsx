// File: src/routes/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Portfolio from "../pages/Portfolio";
import Trade from "../pages/Trade";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/trade" element={<Trade />} />
    </Routes>
  );
};

export default AppRoutes;
