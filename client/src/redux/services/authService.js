import axiosInstance from '../../api/axiosInstance';

const register = async (userData) => {
  const res = await axiosInstance.post('/auth/register', userData);
  return { ...res.data.user, token: res.data.token };
};

const login = async (userData) => {
  const res = await axiosInstance.post('/auth/login', userData);
  return { ...res.data.user, token: res.data.token };
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
