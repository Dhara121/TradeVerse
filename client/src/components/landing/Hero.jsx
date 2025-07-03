import React from 'react';
import heroImg from '../../assets/hero-charts.png'; // import your image

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-50">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Invest Smarter with TradeVerse</h1>
        <p className="mb-6 text-gray-700">
          Real-time stock prices, portfolio insights, and secure trading — all in one place.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Get Started
        </button>
      </div>
      <img src={heroImg} alt="Dashboard UI" className="w-full md:w-1/2 mt-10 md:mt-0" />
    </section>
  );
};

export default Hero;
