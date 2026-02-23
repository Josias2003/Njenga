import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface LoginProps {
  onLoginSuccess: (email: string, password: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Simple validation for demo
      if (!email || !password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Mock authentication - accept any valid email/password combination
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Store auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', email.split('@')[0]);

      const userRoles: { [key: string]: string } = {
        "admin@njenga.com": "admin",
        "farmer@njenga.com": "farmer",
        "agronomist@njenga.com": "agronomist",
      };

      const role = userRoles[email] || "guest";
      localStorage.setItem("userRole", role);

      if (role === "admin") {
        setLocation("/admin-dashboard");
      } else if (role === "farmer") {
        setLocation("/farmer-dashboard");
      } else if (role === "agronomist") {
        setLocation("/agronomist-dashboard");
      } else {
        setError("Unauthorized role");
        setIsLoading(false);
        return;
      }

      onLoginSuccess(email, password);
      setLocation('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'demo@njenga.com');
    localStorage.setItem('userName', 'Demo User');
    onLoginSuccess('demo@njenga.com', 'demo123');
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid )" />
        </svg>
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed top-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="fixed bottom-10 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* HUD Corners */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

          {/* Main Card */}
          <div className="p-8 border-2 border-cyan-400 bg-black/80 backdrop-blur-sm shadow-2xl shadow-cyan-500/20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-8"
            >
              <h1 className="font-orbitron text-4xl font-bold glow-text-cyan mb-2">
                NJENGA
              </h1>
              <p className="font-orbitron text-lg font-bold glow-text-pink">
                GREENS
              </p>
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mt-4"></div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-gray-400 font-mono text-sm mb-8"
            >
              Smart Greenhouse Monitoring System
            </motion.p>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email Input */}
              <div>
                <label className="block text-xs uppercase font-mono font-bold text-cyan-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder-gray-600"
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs uppercase font-mono font-bold text-cyan-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder-gray-600"
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-900/30 border-2 border-red-500 text-red-400 text-xs font-mono"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-orbitron font-bold uppercase text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  'LOGIN'
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
              <span className="text-xs text-gray-600 font-mono">OR</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
            </div>

            {/* Demo Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-3 border-2 border-pink-500 text-pink-400 font-orbitron font-bold uppercase text-sm transition-all hover:bg-pink-500/10"
            >
              DEMO LOGIN
            </motion.button>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 pt-6 border-t border-gray-700 text-center"
            >
              <p className="text-xs text-gray-500 font-mono mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Email: <span className="text-cyan-400">demo@njenga.com</span>
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Password: <span className="text-cyan-400">demo123</span>
              </p>
            </motion.div>

            <div className="flex justify-between items-center mt-4">
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setLocation("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '0%',
            }}
          />
        ))}
      </div>
    </div>
  );
}