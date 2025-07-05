import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from "../components/common/Spinner";


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard');

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] text-white px-4">
      <form onSubmit={onSubmit} className="bg-[#1c2431] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to TradeVerse</h2>

        <input type="email" name="email" value={formData.email} onChange={onChange} required
          className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600" placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={onChange} required
          className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600" placeholder="Password" />

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
