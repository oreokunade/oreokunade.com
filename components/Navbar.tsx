import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'Home', label: 'Home' },
  { id: 'About', label: 'About' },
  { id: 'Services', label: 'Services' },
  { id: 'Work', label: 'Work' },
  { id: 'Resources', label: 'Resources' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active state based on pathname and hash
  const getActiveId = () => {
    if (location.pathname === '/store') return 'Resources';
    if (location.hash) {
      const hashMap: Record<string, string> = {
        '#home': 'Home',
        '#about': 'About',
        '#work': 'Work',
        '#services': 'Services'
      };
      return hashMap[location.hash] || 'Home';
    }
    return 'Home';
  };

  const active = getActiveId();

  const handleNavigate = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'Resources') {
      navigate('/store');
    } else if (id === 'Home') {
      navigate('/#home');
    } else {
      navigate(`/#${id.toLowerCase()}`);
    }
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-auto">
        {/* Outer Pill Container */}
        <nav className="flex items-center justify-between md:justify-center gap-3 md:gap-4 p-1.5 bg-[#2a2a2a] rounded-[1.25rem] shadow-2xl border border-white/5 w-full md:min-w-max mx-auto transition-all">
          
          {/* Left Logo Block */}
          <div className="flex items-center justify-center px-4 w-14 md:w-16 h-12 bg-[#1a1a1a] rounded-[14px] shrink-0 border border-white/5 z-50 relative">
            <img
              src="/logos/logo-dark.svg"
              alt="Logo"
              className="w-8 md:w-10 h-auto object-contain"
            />
          </div>
          
          {/* Middle Links Container (Desktop) */}
          <div className="hidden md:flex items-center h-12">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-4 lg:px-5 h-full flex items-center justify-center text-[13px] lg:text-sm font-medium transition-colors border-y border-r border-white/5 first:border-l first:rounded-l-[14px] last:rounded-r-[14px] ${
                    isActive ? 'bg-[#3a3a3a] text-white shadow-inner' : 'bg-[#333333] text-neutral-300 hover:text-white hover:bg-[#3a3a3a]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          {/* Right CTA (Desktop) */}
          <a href="mailto:oreokunade@gmail.com" className="hidden md:inline-flex items-center gap-1.5 px-4 lg:px-4.5 h-10 md:mr-1 bg-[#f0f0f0] hover:bg-white text-black text-[13px] lg:text-sm font-semibold rounded-[14px] transition-colors shrink-0 justify-center">
            Work with me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center justify-center w-12 h-12 bg-[#1a1a1a] rounded-[14px] text-white border border-white/5 shrink-0 z-50 relative active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#121212]/98 backdrop-blur-xl md:hidden flex flex-col pt-32 px-6 pb-8 h-[100dvh]"
          >
            <div className="flex flex-col gap-2 flex-1 mt-4">
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center justify-between w-full p-4 rounded-2xl text-xl font-medium transition-colors ${
                      isActive ? 'bg-[#2a2a2a] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#2a2a2a]/50'
                    }`}
                  >
                    {item.label}
                    {isActive && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </motion.button>
                );
              })}
            </div>
            
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
              href="mailto:oreokunade@gmail.com" 
              className="mt-auto w-full inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform justify-center"
            >
              Work with me
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
