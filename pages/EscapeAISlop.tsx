import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EscapeAISlop = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbf8] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      <Link 
        to="/store"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 group shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden md:inline">Back to Resources</span>
      </Link>
      
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col gap-24 md:gap-32">
        
        {/* SECTION 1: HERO */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4 lg:pt-12 max-w-[1200px] mx-auto w-full"
        >
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                AI can build a website in minutes.<br />
                <span className="text-neutral-400 dark:text-neutral-500">So why do most AI websites look the same?</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
              <p>
                <strong className="text-neutral-900 dark:text-white font-bold">Escape AI Slop</strong> is a practical guide for designers, developers, and founders who want to use AI to build websites with intention, taste, and a point of view.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-[500px]">
                <img 
                  src="/products/escape-ai-slop.png" 
                  alt="Escape AI Slop Cover" 
                  className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-lighten"
                  fetchPriority="high"
                  decoding="async"
                />
             </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: WHAT THEY ARE GETTING + CTA */}
        <motion.section 
          id="checkout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-[1200px] mx-auto w-full flex flex-col gap-16 pt-12"
        >
          {/* WHAT'S INSIDE */}
          <div className="flex flex-col gap-8 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">What's Inside</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                { title: "THE CORE TEXT", desc: "A concise, no-fluff guide on how to think about AI-assisted web development. We cover the mindset shift needed to move from 'prompting' to 'directing'." },
                { title: "THE DESIGN SYSTEM PLAYBOOK", desc: "Learn how to establish rules before you start generating. Colors, typography, spacing, and grids that ensure whatever the AI outputs feels cohesive and premium." },
                { title: "PROMPT ARCHITECTURE", desc: "How to structure your requests so the AI doesn't fall back to its generic defaults. Templates for layout generation, component refinement, and animation logic." },
                { title: "THE TASTE FILTER", desc: "A practical framework for reviewing AI output. Identifying the 'slop', the generic patterns, and knowing exactly what CSS or logic to tweak to make it yours." },
                { title: "THE AI WEBSITE PROMPT LIBRARY", desc: "A growing library of prompts you can use throughout the website-building process. From figuring out your structure to refining the interface. You don't have to start from a blank chat." },
                { title: "COMMUNITY & UPDATES", desc: "Access to a private group of builders sharing what's working right now. Plus lifetime updates to the guide as the tools evolve." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col gap-4 p-8 bg-white dark:bg-neutral-900/40 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FINAL CTA CARD */}
          <motion.div variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center text-center mt-12 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase leading-tight">Escape AI Slop</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-400 dark:text-neutral-500 mb-10 uppercase tracking-tight">Make your skill more valuable.</h3>
            
            <div className="bg-white/10 dark:bg-black/5 rounded-3xl p-8 md:p-10 w-full max-w-3xl mb-12 border border-white/10 dark:border-black/10 text-left flex flex-col gap-2">
               <h4 className="text-3xl font-bold mb-2">Pre-order Access</h4>
               <p className="text-base text-neutral-400 dark:text-neutral-600 mb-8 font-medium">The book + asset library + AI building playbook + community + ongoing updates.</p>
               
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/20 dark:border-black/20 pt-8 mt-2">
                 <div className="flex flex-col gap-1">
                   <span className="text-lg font-medium text-neutral-300 dark:text-neutral-700">Early Bird Pricing</span>
                   <span className="text-sm text-neutral-500">Instant access to all current materials.</span>
                 </div>
                 <div className="flex flex-col items-start sm:items-end">
                   <span className="text-sm font-medium text-neutral-500 line-through mb-1">Standard: ₦15,000</span>
                   <span className="text-4xl md:text-5xl font-bold tracking-tight">₦7,500</span>
                 </div>
               </div>
            </div>

            <a href="#" className="group inline-flex items-center gap-3 px-12 py-6 bg-white dark:bg-black text-black dark:text-white text-xl font-bold rounded-2xl hover:scale-105 transition-transform w-full max-w-3xl justify-center shadow-xl">
              GET ACCESS NOW
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
};

export default EscapeAISlop;
