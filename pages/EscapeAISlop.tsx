import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbf8] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col gap-32">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          <div className="flex-1 flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                Escape AI Slop
              </span>
              <h1 style={{ fontFamily: "'Saira Condensed', sans-serif", lineHeight: "1.05" }} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 uppercase">
                Build Websites With AI That Actually Look <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic font-medium text-pink-500 lowercase text-[1.1em]">Designed.</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-4">
              <p>AI can build a website in minutes.</p>
              <p>So why do so many AI-generated websites look exactly the same?</p>
              <p className="text-neutral-900 dark:text-neutral-200">
                Same layouts. Same typography. Same gradients. Same rounded cards. Same generic copy. Same "premium" aesthetic.
              </p>
              <p className="font-semibold text-neutral-900 dark:text-white mt-4">AI isn't the problem.</p>
              <p>
                The problem is knowing what to tell it, what to keep, what to reject, and how to turn its output into something that actually feels intentional.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform w-full sm:w-auto justify-center">
                GET THE BOOK + ALL BONUSES — ₦20,000
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="flex-1 w-full max-w-md lg:max-w-none perspective-1000">
             <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-y-[-10deg] rotate-x-[5deg] border border-neutral-200 dark:border-neutral-800">
                <img 
                  src="/products/escape-ai-slop.png" 
                  alt="Escape AI Slop Cover" 
                  className="w-full h-full object-cover"
                />
             </div>
          </motion.div>
        </motion.section>

        {/* THE PROBLEM SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col items-center text-center max-w-3xl mx-auto border-t border-neutral-200 dark:border-neutral-800 pt-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-8">
            You don't need another AI tool. <br/><span className="text-neutral-400">You need better taste.</span>
          </motion.h2>
          
          <motion.div variants={fadeUp} className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-6 text-left w-full">
            <p>You need better taste, better direction, and a better process.</p>
            <p>AI has made building websites dramatically easier. But it has also created a new problem: <strong className="text-neutral-900 dark:text-white font-medium">Everyone now has access to the same tools.</strong></p>
            <p>Which means simply knowing how to prompt an AI coding tool isn't enough anymore.</p>
            
            <div className="bg-neutral-100/50 dark:bg-neutral-900/30 p-8 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 mt-4">
              <p className="font-semibold text-neutral-900 dark:text-white mb-6">If you want your websites to stand out, you need to understand:</p>
              <ul className="flex flex-col gap-4">
                {[
                  "How to give AI the right direction before it starts building",
                  "How to create a strong visual system instead of accepting generic defaults",
                  "How to recognise the patterns that make websites feel AI-generated",
                  "How to use AI as a creative partner instead of blindly accepting its decisions",
                  "How to refine AI-generated websites until they actually feel designed",
                  "How to build a repeatable process you can use on your next project"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span className="text-neutral-600 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* VISUALIZING SLOP SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col gap-12 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              Stop accepting the first thing AI gives you.
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light">
              The first version is rarely the best version. AI will happily give you generic layouts and call it "modern." You don't have to accept it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay z-10"></div>
                <img src="/products/ai-slop-gradient.jpg" alt="Generic AI Gradient Hero" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-sm tracking-widest">A gradient hero</h3>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                 <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay z-10"></div>
                <img src="/products/ai-slop-cards.jpg" alt="Generic AI Rounded Cards" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-sm tracking-widest">Three rounded cards</h3>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                 <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay z-10"></div>
                <img src="/products/ai-slop-dashboard.jpg" alt="Generic AI Dashboard" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-sm tracking-widest">A floating dashboard mockup</h3>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="text-center mt-8">
             <p className="text-xl font-medium text-neutral-900 dark:text-white">
               Escape AI Slop teaches you how to see the difference between something AI can generate and something worth shipping.
             </p>
          </motion.div>
        </motion.section>

        {/* WHAT YOU'LL LEARN */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col gap-12 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
             <h2 className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase">
                What You'll Learn
              </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Think Before You Prompt", desc: "Learn how to establish the strategy, structure and creative direction before asking AI to start building." },
              { num: "02", title: "Build a Design System", desc: "Stop relying on AI's default visual decisions. Create the rules for typography, colour, spacing, layout and components." },
              { num: "03", title: "Direct AI Properly", desc: "Learn how to communicate your intent to AI coding tools so you're not constantly fighting with the output." },
              { num: "04", title: "Recognise AI Slop", desc: "Understand the visual patterns, design decisions and copy that instantly make a website feel generic." },
              { num: "05", title: "Refine Instead of Accepting", desc: "Learn how to critique an AI-generated website and systematically push it toward something more intentional." },
              { num: "06", title: "Build Your Own Process", desc: "Turn what you've learned into a repeatable workflow you can use again and again for future websites." }
            ].map((module, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col gap-4 p-8 rounded-3xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <span className="text-2xl font-bold text-neutral-300 dark:text-neutral-700 font-mono">{module.num}</span>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{module.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed text-sm">
                  {module.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* WHO IT'S FOR */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col lg:flex-row gap-12 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex-1 flex flex-col gap-8 bg-neutral-100/50 dark:bg-neutral-900/30 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">This is for you if...</h3>
            <ul className="flex flex-col gap-4">
              {[
                "You want to build websites with AI but don't want them to look like AI built them.",
                "You are a designer who wants to use AI without sacrificing your taste.",
                "You are a developer who wants to produce better-looking interfaces.",
                "You run a business and want to understand how modern AI website creation actually works.",
                "You are a freelancer who wants to build better websites, faster.",
                "You are learning AI coding tools and want a process instead of endless trial and error."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                  <span className="text-neutral-600 dark:text-neutral-300 font-light">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 flex flex-col gap-8 bg-red-50 dark:bg-red-950/20 p-8 md:p-12 rounded-3xl border border-red-100 dark:border-red-900/30">
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-400">This is NOT for you if...</h3>
            <ul className="flex flex-col gap-4">
              {[
                "You want a magic prompt that produces a perfect website with zero thinking.",
                "You don't care what your website looks like as long as it technically works.",
                "You're looking for another collection of generic '10 prompts to build a website' tricks.",
                "You want AI to make every creative decision for you."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                  <span className="text-red-900/70 dark:text-red-300/70 font-light">{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-medium text-red-900 dark:text-red-400 italic">
              This book is about becoming better at directing AI — not becoming dependent on it.
            </p>
          </div>
        </motion.section>

        {/* THE OFFER */}
        <motion.section 
          id="pricing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col items-center pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-12 text-center uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
            What You Get
          </motion.h2>

          <div className="w-full max-w-3xl flex flex-col gap-4 mb-16">
            {[
              { title: "THE ESCAPE AI SLOP BOOK", desc: "The complete guide to building intentional, polished websites with AI.", val: "₦20,000", main: true },
              { title: "BONUS #1 — THE AI WEBSITE PROMPT LIBRARY", desc: "A curated collection of prompts covering the different stages of the website-building process.", val: "₦15,000" },
              { title: "BONUS #2 — THE ANTI-SLOP CHECKLIST", desc: "A practical checklist for reviewing your website before you ship it.", val: "₦5,000" },
              { title: "BONUS #3 — WEBSITE BRIEF + DESIGN SYSTEM TEMPLATES", desc: "Reusable templates for planning your website before you start building.", val: "₦10,000" },
              { title: "BONUS #4 — THE FIRST PROMPT", desc: "The starting framework for taking your website idea and giving your AI coding tool everything it needs to begin intelligently.", val: "₦5,000" },
              { title: "BONUS #5 — 50 RULES FOR BETTER AI WEBSITES", desc: "A quick-reference guide to the principles that separate intentional websites from AI-generated noise.", val: "₦5,000" },
              { title: "BONUS #6 — AI WEBSITE TEARDOWNS", desc: "See real examples of AI-generated design, understand what's wrong with them, and learn how to improve them.", val: "₦10,000" },
              { title: "BONUS #7 — 4 LIVE AI WEBSITE BUILD SESSIONS", desc: "Follow along as we go from idea → strategy → design → AI build → final polish. You'll also receive the recordings.", val: "₦20,000" },
              { title: "BONUS #8 — THE ESCAPE AI SLOP COMMUNITY", desc: "A private community for sharing your work, asking questions, getting feedback and learning alongside other people building with AI.", val: "₦10,000" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl border ${item.main ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent' : 'bg-white dark:bg-[#111111] border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white'}`}>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className={`text-sm ${item.main ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'}`}>{item.desc}</p>
                </div>
                <div className={`font-mono font-bold whitespace-nowrap ${item.main ? 'text-white dark:text-black' : 'text-neutral-400 dark:text-neutral-600 line-through'}`}>
                  Value: {item.val}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="w-full max-w-2xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-neutral-900 dark:bg-white"></div>
            
            <h3 className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase mb-4">
              Total Value: <span className="line-through">₦80,000+</span>
            </h3>
            <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight">
              ₦20,000
            </h2>

            <div className="flex flex-col gap-4 text-neutral-600 dark:text-neutral-300 font-light mb-10">
              <p>You could spend months figuring this out through trial and error.</p>
              <p>You could spend thousands hiring someone to build every website for you.</p>
              <p className="font-medium text-neutral-900 dark:text-white">Or you could learn the process once and use it every time you build.</p>
            </div>

            <a href="#" className="inline-flex items-center gap-2 px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-[16px] hover:scale-105 transition-transform w-full justify-center">
              GET ACCESS NOW
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-neutral-400 mt-4">Instant access.</p>
          </motion.div>
        </motion.section>

        {/* FINAL PITCH & AUTHOR */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col md:flex-row gap-16 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              What You're Really Buying
            </h2>
            <div className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-4">
              <p>You're not buying another ebook. You're buying a <strong className="text-neutral-900 dark:text-white font-medium">better way to build.</strong></p>
              <p>A way to use AI without allowing AI to dictate your taste. A way to move faster without producing generic work.</p>
              <p>A way to go from:</p>
              <blockquote className="border-l-4 border-neutral-200 dark:border-neutral-800 pl-4 py-2 italic font-serif text-neutral-400">
                "AI made this website."
              </blockquote>
              <p>to:</p>
              <blockquote className="border-l-4 border-neutral-900 dark:border-white pl-4 py-2 italic font-serif text-neutral-900 dark:text-white font-medium text-xl">
                "Wait… AI made this?"
              </blockquote>
            </div>
          </div>

          <div className="flex-1 bg-neutral-100/50 dark:bg-neutral-900/30 rounded-3xl p-8 md:p-10 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase mb-6">
              About the Author
            </h3>
            <div className="flex items-center gap-6 mb-8">
              <img src="/profile.jpg" alt="Ore Okunade" className="w-20 h-20 rounded-full object-cover grayscale border border-neutral-200 dark:border-neutral-700" />
              <div>
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Ore Okunade</h4>
                <p className="text-neutral-500 text-sm">Product Design Engineer</p>
              </div>
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-4 text-sm md:text-base">
              <p>I'm a product designer and technology builder who has spent years thinking about how products, interfaces and technology come together.</p>
              <p>I've watched AI completely change the way websites can be built. And I've also watched it create an entirely new category of mediocre websites.</p>
              <p><strong className="text-neutral-900 dark:text-white font-medium">Escape AI Slop is my attempt to solve that problem.</strong></p>
              <p>Not by telling you to stop using AI. But by showing you how to use it better.</p>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#111111] py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-6">
           <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase max-w-2xl" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              Your website doesn't have to look like every other AI website.
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              AI has lowered the barrier to building. Now the advantage is knowing what deserves to be built.
            </p>
            <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform">
              GET THE BOOK + ALL BONUSES
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-neutral-400 mt-8">© {new Date().getFullYear()} Oreoluwa Okunade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EscapeAISlop;
