import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../redux/slices/authSlice';
import Spinner from '../components/common/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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
    if (password !== password2) return toast.error('Passwords do not match');
    dispatch(register({ name, email, password }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-[#1e293b] p-8 rounded-xl w-full max-w-md space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input name="name" value={name} onChange={onChange} placeholder="Name" required className="w-full p-2 bg-[#111827] border border-gray-600 rounded" />
        <input name="email" value={email} onChange={onChange} type="email" placeholder="Email" required className="w-full p-2 bg-[#111827] border border-gray-600 rounded" />
        <input name="password" value={password} onChange={onChange} type="password" placeholder="Password" required className="w-full p-2 bg-[#111827] border border-gray-600 rounded" />
        <input name="password2" value={password2} onChange={onChange} type="password" placeholder="Confirm Password" required className="w-full p-2 bg-[#111827] border border-gray-600 rounded" />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">Register</button>
      </form>
    </div>
  );
};

export default Register;