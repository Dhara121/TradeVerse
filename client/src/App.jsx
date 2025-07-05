// App.jsx (Updated)
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1b1f3b]">
      <Navbar />
      <main className="flex-grow">
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
