import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/login', data);

      // Store user details in localStorage (or sessionStorage)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Show success notification
      toast.success('Login successful! Redirecting...');

      // Redirect to main website after successful login
      navigate('/dashboard'); // Change '/dashboard' to your main website route
    } catch (error) {
      // Handle login error
      toast.error(error.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div className="login-page">
      <Toaster />
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
