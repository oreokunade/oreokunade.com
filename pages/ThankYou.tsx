import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative flex flex-col items-center justify-center p-6">
      
      {/* Absolute Header with back button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a1a] rounded-xl hover:scale-105 transition-all shadow-sm border border-neutral-200 dark:border-white/5 font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-12 md:mt-0"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-8 shadow-xl">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#ff4306]">
          Purchase Successful!
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12">
          Thank you for grabbing <span className="font-bold text-neutral-900 dark:text-white">The Escape AI Slop Book</span>. Your copy and bonuses have been sent to your email!
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-3xl bg-white dark:bg-[#111] p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#ff4306]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-48 md:w-64 shrink-0 relative z-10">
            <img 
              src={import.meta.env.BASE_URL + "products/killaislop-cover.png"} 
              alt="Escape AI Slop Cover" 
              className="w-full h-auto shadow-2xl rounded-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Your next step:</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Don't build alone. Join our exclusive "Build With AI" community to get feedback, access weekly live classes, and share your progress with other builders.
            </p>

            <a 
              href="https://chat.whatsapp.com/Bg23GwQIegS3UGe3sHeiK6" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#ff4306] text-white text-lg font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#ff4306]/20 w-full md:w-auto"
            >
              <span className="flex items-center gap-2">
                <MessageCircle size={20} />
                Join the Community
              </span>
            </a>
            <p className="text-sm text-neutral-500 mt-4 italic">
              * The link to join is also included in your receipt email.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
