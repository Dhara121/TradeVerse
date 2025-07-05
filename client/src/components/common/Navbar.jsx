import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-400';

  return (
    <header className="bg-[#0f172a] text-white shadow-md fixed w-full z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="TradeVerse Logo" className="h-9" />
          <span className="text-xl font-bold text-blue-400">TradeVerse</span>
        </NavLink>

        <div className="flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/trade" className={navLinkClass}>Trade</NavLink>
          <NavLink to="/portfolio" className={navLinkClass}>Portfolio</NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Get Started</button>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold cursor-pointer uppercase">
                {user.name?.[0] || 'U'}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] rounded-md shadow-lg p-4 text-sm space-y-2 z-50">
                  <p className="text-gray-300 truncate">📧 {user.email || 'N/A'}</p>
                  <NavLink to="/profile" className="block text-blue-400 hover:underline">View Profile</NavLink>
                  <button onClick={() => dispatch(logout())} className="text-red-400 hover:underline">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;