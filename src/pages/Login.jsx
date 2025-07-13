import React, { useState } from 'react';
import { FaRoad } from 'react-icons/fa'; // Font Awesome icon


import {
  MdOutlineAdminPanelSettings,
  MdAccountCircle,
  MdSupervisorAccount,
} from 'react-icons/md';
import { IoPersonOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const roles = [
  { label: 'Admin', icon: MdOutlineAdminPanelSettings },
  { label: 'RO', icon: MdAccountCircle },
  { label: 'PIU', icon: MdSupervisorAccount },
];

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  setLoading(true);
  if (username && password) {
    try {
      const res = await login(username, password);
      if (res.success) {
        // ✅ Save token to localStorage
        localStorage.setItem("token", res.user.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate('/dashboard');
      } else {
        alert(res.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  } else {
    alert('Please enter username and password');
  }
  setLoading(false);
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full mb-3">
            <FaRoad size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Highway Survey</h1>
          <p className="text-sm text-gray-500">Field Data Inspection System</p>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to continue your Inspection work</p>
        </div>

        <label className="text-sm font-medium text-gray-700 block mb-1 mt-2">Select Role</label>
        <div className="flex gap-2 mb-4">
          {roles.map((r) => (
            <button
              key={r.label}
              onClick={() => setRole(r.label)}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg border ${
                role === r.label
                  ? 'bg-indigo-100 text-indigo-600 border-indigo-600 font-semibold'
                  : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
            >
              <r.icon size={18} className="mr-1" />
              {r.label}
            </button>
          ))}
        </div>

        <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 mb-3 bg-gray-100 h-12">
          <IoPersonOutline className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="bg-transparent outline-none flex-1 text-sm text-gray-800"
          />
        </div>

        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 mb-3 bg-gray-100 h-12">
          <IoLockClosedOutline className="text-gray-500 mr-2" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-transparent outline-none flex-1 text-sm text-gray-800"
          />
          <button onClick={() => setShowPassword((s) => !s)}>
            {showPassword ? (
              <IoEyeOffOutline className="text-gray-500" size={18} />
            ) : (
              <IoEyeOutline className="text-gray-500" size={18} />
            )}
          </button>
        </div>

        <div className="text-right mb-3">
          <button onClick={() => alert('Forgot Password?')} className="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
