"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';  // Import the toast function
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user/get-profile')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);
  const signup=async(email,password,fullName)=>{
    try{
    const res = await api.post('/auth/signup', { email, password, fullName, roles: ['User'] });
    router.push('/login');
    toast.success('Signup successful! Please Login.')
    }catch(err){
      toast.error(err.response?.data?.message|| 'Signup failed');
    }
  }

  const login = async (email, password) => {
    try{
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const profile = await api.get('/user/get-profile');
    setUser(profile.data);
    router.push('/');
    toast.success("Login succesfull!");
    }catch(err){
      toast.error(err.response?.data?.message|| 'Login failed');

    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  // While auth status is loading, don’t render children
  if (user === undefined) return <div className="p-4">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user,login, logout,signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
