"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRegisterUserMutation } from '@/redux/Slice';
import toast from 'react-hot-toast';
import Link from 'next/link';
import bcrypt from 'bcryptjs';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();
  // const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Hash the password before sending it
      const hashedPassword = await bcrypt.hash(password, 10);
      await registerUser({ username, email, password: hashedPassword }).unwrap();
      toast.success('Registration successful');
      // router.push('/login');
    } catch (error) {
      toast.error('Error registering user...');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 font-medium"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-400 mt-4">
            Already registered?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
