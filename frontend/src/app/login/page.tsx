'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
        email,
        password,
      });

      login(
        {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        },
        data.token
      );

      toast.success('Login successful!');
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Invalid credentials');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6d8f0] via-[#fce3e2] to-[#d3e3f7] px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-md bg-white/80 border border-gray-300 text-black shadow-lg rounded-2xl p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Login</h2>

        <div>
          <label className="block text-base font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg px-4 py-2 bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-lg px-4 py-2 bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-lg font-medium"
        >
          Login
        </button>
      </form>
    </main>
  );
}
