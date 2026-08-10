import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitchProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 ${
        isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`w-6 h-6 rounded-full shadow-sm flex items-center justify-center ${
           isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
        }`}
        style={{
          x: isDarkMode ? 24 : 0
        }}
      >
        {isDarkMode ? (
          <Moon className="w-3 h-3" />
        ) : (
          <Sun className="w-3 h-3" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeSwitch;