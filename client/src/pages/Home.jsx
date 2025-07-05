import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaLock } from 'react-icons/fa';
import { MdTimeline } from 'react-icons/md';
import chartImage from "../assets/chart.png";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f172a] text-white min-h-screen pt-20 px-6 lg:px-24">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-20">
        {/* Left */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Invest Smarter with <span className="text-blue-500">TradeVerse</span>
          </h1>
          <p className="text-lg text-gray-300">
            Real-time stock prices, portfolio insights, and secure trading — all in one place.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={chartImage}
            alt="TradeVerse Dashboard Preview"
            className="rounded-xl shadow-lg w-full max-w-[480px] object-contain"
          />
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
          Platform Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/30 transition">
            <MdTimeline className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">Real-time Prices</h3>
            <p className="text-gray-300">Get instant stock prices using our live API feed.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-green-400/30 transition">
            <FaChartLine className="text-4xl text-green-400 mb-4" />
            <h3 className="text-xl font-semibold">Profit Charts</h3>
            <p className="text-gray-300">Visualize your portfolio with intuitive graphs.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-purple-400/30 transition">
            <FaLock className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold">Secure Trading</h3>
            <p className="text-gray-300">Simulate trades in a secure and fast environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
