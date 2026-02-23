import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface NavigationProps {
  currentPage: string;
  onAIChatOpen: () => void;
  onLogout?: () => void;
}

export function Navigation({ currentPage, onAIChatOpen, onLogout }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'AI Analytics', path: '/analytics', icon: '🤖' },
    { label: 'Crops', path: '/greenhouses', icon: '🌱' },
    { label: 'Alerts', path: '/alerts', icon: '🚨' },
    { label: 'Reports', path: '/reports', icon: '📈' },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-cyan-400 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-orbitron text-2xl font-bold glow-text-cyan cursor-pointer"
          >
            NJENGA GREENS
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-mono text-sm font-bold uppercase transition-all ${
                  currentPage === item.path
                    ? 'bg-cyan-600 text-black'
                    : 'text-cyan-400 hover:text-cyan-300'
                }`}
              >
                {item.icon} {item.label}
              </motion.button>
            </Link>
          ))}

                    {/* AI Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAIChatOpen}
            className="ml-4 px-4 py-2 bg-purple-600 text-white font-mono text-sm font-bold uppercase rounded hover:bg-purple-500 transition-all"
          >
            🤖 AI Assistant
          </motion.button>

          {/* Logout Button */}
          {onLogout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="ml-2 px-4 py-2 bg-red-600 text-white font-mono text-sm font-bold uppercase rounded hover:bg-red-500 transition-all"
            >
              🚪 Logout
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden px-3 py-2 text-cyan-400 font-bold text-xl"
        >
          ☰
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-cyan-400 bg-black/90 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-left px-4 py-2 font-mono text-sm font-bold uppercase transition-all ${
                    currentPage === item.path
                      ? 'bg-cyan-600 text-black'
                      : 'text-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  {item.icon} {item.label}
                </motion.button>
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                onAIChatOpen();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 bg-purple-600 text-white font-mono text-sm font-bold uppercase rounded hover:bg-purple-500 transition-all"
            >
              🤖 AI Assistant
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
