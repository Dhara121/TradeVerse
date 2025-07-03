// src/components/common/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1b1f3b] text-white text-center py-6 mt-10">
      <p className="text-sm">&copy; {new Date().getFullYear()} TradeVerse. All rights reserved.</p>
      <p className="text-xs mt-1">Built for educational purposes to simulate stock trading experience.</p>
    </footer>
  );
};

export default Footer;
