"use client";
import styles from './styles.module.css'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login,signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    // try {
    //   await login(email, password);
    // } catch {
    //   alert('Login failed');
    // }
    try {
      if (isSignup) {
        await signup(email,password,fullName)
        setIsSignup(false);
      } else {
        login(email,password);
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  // return (
  //   <div className={`min-h-screen flex items-center justify-center bg-gray-100 ${styles['red-color']}`}>

  //     <form
  //       onSubmit={handleSubmit}
  //       className="p-6 bg-white rounded shadow-md w-full max-w-sm"
  //     >
  //       <h2 className="text-xl font-bold mb-4">Login</h2>
  //       <label className="block mb-2">
  //         Email
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={e => setEmail(e.target.value)}
  //           required
  //           className="w-full p-2 border rounded mt-1"
  //         />
  //       </label>
  //       <label className="block mb-4">
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={e => setPassword(e.target.value)}
  //           required
  //           className="w-full p-2 border rounded mt-1"
  //         />
  //       </label>
  //       <button
  //         type="submit"
  //         className="w-full py-2 bg-blue-600 text-white rounded"
  //       >
  //         Sign In
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-100 ${styles['red-color']}`}
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

        {isSignup && (
          <label className="block mb-2">
            Full Name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-2 border rounded mt-1"
            />
          </label>
        )}

        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded mb-2"
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignup((prev) => !prev)}
          className="text-blue-500 text-sm underline"
        >
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}

