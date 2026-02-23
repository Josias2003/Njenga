import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    setMessage(`If an account with ${email} exists, a reset link has been sent.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
        {message ? (
          <p className="text-green-500">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}