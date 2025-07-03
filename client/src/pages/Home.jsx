import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaLock } from 'react-icons/fa';
import { MdTimeline } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-20 px-6 lg:px-24">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1b1f3b] animate-fadeInUp">
            Invest Smarter with <span className="text-blue-600">TradeVerse</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Real-time stock prices, portfolio insights, and secure trading — all in one place.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
        <div className="w-full lg:w-1/2 animate-fadeIn">
          <img
            src="/hero.png" // replace with the image path or use import
            alt="TradeVerse Dashboard Preview"
            className="rounded-xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-[#1b1f3b] mb-12">
          Platform Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-lg border hover:shadow-2xl transition">
            <MdTimeline className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Real-time Prices</h3>
            <p className="text-gray-600">Get instant stock prices using our live API feed.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border hover:shadow-2xl transition">
            <FaChartLine className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Profit Charts</h3>
            <p className="text-gray-600">Visualize your portfolio with intuitive graphs.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border hover:shadow-2xl transition">
            <FaLock className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#1b1f3b]">Secure Trading</h3>
            <p className="text-gray-600">Simulate trades in a secure and fast environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
