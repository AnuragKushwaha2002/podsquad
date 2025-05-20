'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.success('Signup successful! Please login.');
      router.push('/login'); // redirect to login
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSignup} className="space-y-6 w-full max-w-md p-8 border rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" className="mt-1 block w-full border rounded p-2"
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Account</button>
      </form>
    </main>
  );
}
