// src/components/common/Button.jsx
import React from "react";

export const Button = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
    >
      {label}
    </button>
  );
};
