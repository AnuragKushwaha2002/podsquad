'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
        email,
        password,
      });

      console.log('Login success:', res.data);
      // Store token in localStorage/cookie if needed
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md p-8 border rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 block w-full border rounded p-2"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="mt-1 block w-full border rounded p-2"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </main>
  );
}
