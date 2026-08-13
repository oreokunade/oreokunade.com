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
              <h1 style={{ fontFamily: "'Saira Condensed', sans-serif", lineHeight: "1.05" }} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 uppercase">
                Your Website Looks <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic font-medium text-pink-500 lowercase text-[1.1em]">AI-Generated.</span>
              </h1>
              <h2 className="text-2xl md:text-4xl text-neutral-500 dark:text-neutral-400 font-semibold tracking-tight">
                Here's How to Fix It.
              </h2>
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-4 mt-2">
              <p>AI has made it ridiculously easy to build a website.</p>
              <p>Give it a prompt. Wait a few seconds. You have a website.</p>
              <p>Then you look at it again.</p>
              <p>Something feels off. The layout is fine. The colours are fine. The animations work. Technically, everything is there.</p>
              <p className="font-semibold text-neutral-900 dark:text-white text-xl">But it doesn't feel designed.</p>
              <p>It feels like AI made it. And once you've seen enough AI-generated websites, you start noticing the pattern everywhere.</p>
              <p className="mt-2 text-neutral-900 dark:text-neutral-300">
                <strong className="text-neutral-900 dark:text-white font-bold">Escape AI Slop</strong> is a practical guide to using AI to build websites with intention, taste and a point of view.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform w-full sm:w-auto justify-center">
                GET THE BOOK + THE COMPLETE TOOLKIT FOR ₦20,000
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-sm text-neutral-400 mt-3 text-center sm:text-left ml-2">Instant access.</p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="flex-1 w-full max-w-md lg:max-w-none perspective-1000">
             <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-y-[-10deg] rotate-x-[5deg] border border-neutral-200 dark:border-neutral-800 group hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
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
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8 uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
            AI didn't kill good design.
          </motion.h2>
          
          <motion.div variants={fadeUp} className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-6 text-left w-full">
            <p>It just made mediocre design much easier to produce.</p>
            <p>And that's the interesting part. The advantage used to be knowing how to build. Now AI can handle a huge part of the building.</p>
            
            <div className="bg-neutral-100/50 dark:bg-neutral-900/30 p-8 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 mt-4">
              <p className="text-xl text-neutral-900 dark:text-white mb-6">
                The advantage is increasingly becoming <strong className="font-bold">knowing what good looks like.</strong>
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  "Knowing when the typography is wrong.",
                  "Knowing when the spacing feels lazy.",
                  "Knowing why the hero section isn't working.",
                  "Knowing when the AI has made the obvious choice.",
                  "And, more importantly, knowing what to tell it to do next."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span className="text-neutral-600 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-neutral-900 dark:text-white font-medium">That's the skill <strong className="font-bold">Escape AI Slop</strong> is built around.</p>
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
              You've probably seen it.
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light">
              It looks impressive for about five seconds. Then you realise you've seen the exact same website twenty times this month.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="/products/ai-slop-gradient.jpg" alt="Generic AI Gradient Hero" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 flex flex-col gap-1">
                <p>A huge headline.</p>
                <p>A dark background.</p>
                <p>A glowing gradient.</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                 <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="/products/ai-slop-cards.jpg" alt="Generic AI Rounded Cards" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 flex flex-col gap-1">
                <p>Three cards underneath.</p>
                <p>“Empowering the future of…”</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group">
                 <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                <img src="/products/ai-slop-dashboard.jpg" alt="Generic AI Dashboard" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-20">SLOP</div>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 flex flex-col gap-1">
                <p>A floating dashboard.</p>
                <p>Some smooth animations.</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="text-center mt-8 max-w-3xl mx-auto flex flex-col gap-4 text-lg text-neutral-500 dark:text-neutral-400">
             <p>
               That's what happens when you give AI the responsibility of making the creative decisions. <strong className="text-neutral-900 dark:text-white">It gives you what it has learned works.</strong>
             </p>
             <p className="text-xl font-medium text-neutral-900 dark:text-white">
               Your job is to develop the judgement to know when that's good enough—and when it isn't.
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
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                This is what I want you to learn.
              </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "HOW TO THINK BEFORE YOU BUILD", desc: "The quality of your final website is heavily influenced by what happens before you open your AI coding tool. Learn how to think through structure, content, and visual direction." },
              { num: "02", title: "HOW TO GIVE AI BETTER DIRECTION", desc: "AI is incredibly good at executing instructions. The problem is that most people give it terrible instructions. Learn how to structure your inputs for better decisions." },
              { num: "03", title: "HOW TO CREATE A DESIGN SYSTEM AI CAN ACTUALLY FOLLOW", desc: "Typography. Colour. Spacing. Layout. Components. Motion. Establish these decisions deliberately and use them as the foundation for your build." },
              { num: "04", title: "HOW TO SPOT AI SLOP", desc: "You'll start seeing it everywhere. The predictable layouts. The unnecessary gradients. The strange spacing. The generic copy. Once you know, you'll never see it the same way again." },
              { num: "05", title: "HOW TO CRITIQUE WHAT AI BUILDS", desc: "This might be the most important part. AI will give you something. Is it good? Learn how to identify what's weakening the design and give direction for the next iteration." },
              { num: "06", title: "HOW TO BUILD FASTER WITHOUT LOWERING YOUR STANDARD", desc: "The goal isn't to fight AI. The goal is to get really good at working with it. Move from idea to refinement much faster, without handing your taste over to a chatbot." }
            ].map((module, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col gap-4 p-8 rounded-3xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl font-bold text-neutral-300 dark:text-neutral-700 font-mono">{module.num}</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{module.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed text-sm">
                  {module.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* THE OFFER - BOOK & BONUSES */}
        <motion.section 
          id="pricing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col gap-12 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          {/* Main Book */}
          <motion.div variants={fadeUp} className="bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-8 md:p-12 border border-transparent shadow-2xl flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 flex flex-col gap-6">
                <span className="text-sm font-bold tracking-widest uppercase opacity-70">The Book</span>
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>ESCAPE AI SLOP</h2>
                <h3 className="text-xl font-medium opacity-90">How to Build Websites With AI That Actually Look Designed.</h3>
                <p className="opacity-80 font-light leading-relaxed text-sm md:text-base">
                  This is the complete framework I use to think about building websites in the age of AI. Inside, we'll go through the thinking, the process, the prompts, the design decisions and the refinement required to turn AI's first attempt into something worth putting your name on.
                </p>
             </div>
             <div className="flex-none">
                <a href="#checkout" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-black text-black dark:text-white text-sm font-bold rounded-[14px] hover:scale-105 transition-transform">
                  GET THE BOOK — ₦20,000
                  <ArrowUpRight className="w-4 h-4" />
                </a>
             </div>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto my-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              And because reading a book isn't the same as actually building...
            </h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">
              I've put together the resources I wish existed when I started figuring this out.
            </p>
          </motion.div>

          {/* Bonuses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "THE AI WEBSITE PROMPT LIBRARY", desc: "A growing library of prompts you can use throughout the website-building process. From figuring out your structure to refining the interface.", highlight: "You don't have to start from a blank chat." },
              { title: "THE FIRST PROMPT", desc: "The prompt that gets the whole process moving. Give your AI coding tool the right context from the beginning and start your build from a much stronger foundation.", highlight: "Copy. Paste. Build." },
              { title: "THE ANTI-SLOP CHECKLIST", desc: "Your final website needs a last pass. This checklist gives you the questions to ask before you ship: Typography? Rhythm? Human copy?", highlight: "Use it before you call the website finished." },
              { title: "WEBSITE BRIEF + DESIGN SYSTEM TEMPLATES", desc: "Don't open your AI coding tool with: 'Build me a website for my business.' These templates help you define structure, visual direction and design system.", highlight: "Start with a proper brief." },
              { title: "50 RULES FOR BETTER AI WEBSITES", desc: "A short reference guide containing the principles I keep coming back to when designing and building with AI.", highlight: "Keep it beside you while you work." },
              { title: "AI WEBSITE TEARDOWNS", desc: "This is where the theory gets interesting. We'll take AI-generated websites and break them down. What's working? What's generic? What would I tell the AI?", highlight: "How do you get from 'okay' to 'actually good'?" }
            ].map((bonus, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col gap-4 p-8 rounded-3xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase">{bonus.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed text-sm">
                  {bonus.desc}
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white text-sm mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                  {bonus.highlight}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Live Sessions & Community */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <motion.div variants={fadeUp} className="flex flex-col gap-6 p-8 md:p-10 rounded-3xl bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white uppercase">Then We Build Together.<br/><span className="text-pink-500">4 Live AI Website Build Sessions</span></h3>
              <p className="text-neutral-500 dark:text-neutral-400 font-light text-sm">
                Because sometimes the easiest way to understand a process is to watch someone actually do it. We'll go through the process together:
              </p>
              <ul className="flex flex-col gap-2 font-mono text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                <li>01 — Idea → Strategy</li>
                <li>02 — Strategy → Design Direction</li>
                <li>03 — Design → AI Build</li>
                <li>04 — AI Build → Final Polish</li>
              </ul>
              <p className="text-sm font-medium text-neutral-900 dark:text-white mt-auto">
                You'll get the recordings too, so you can come back to them whenever you're building your next project.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-6 p-8 md:p-10 rounded-3xl bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white uppercase">And You Won't Have To Figure It Out Alone.<br/><span className="text-blue-500">The Escape AI Slop Community</span></h3>
              <p className="text-neutral-500 dark:text-neutral-400 font-light text-sm">
                A private space for people learning to build with AI. Share what you're working on. Ask questions. Share prompts. Get feedback. See what other people are building.
              </p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white mt-auto">
                Because the more you build, the better your eye gets.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* PRICING TABLE / VALUE STACK */}
        <motion.section 
          id="checkout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <motion.div variants={fadeUp} className="w-full max-w-3xl mx-auto bg-white dark:bg-[#111111] border-2 border-neutral-900 dark:border-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-neutral-900 dark:bg-white"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-10 tracking-tight uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              Here's Everything You Get
            </h2>

            <div className="flex flex-col gap-4 mb-10 border-l-2 border-neutral-100 dark:border-neutral-800 pl-6">
              {[
                ["Escape AI Slop", "The complete book."],
                ["AI Website Prompt Library", "Ready-to-use prompts for the entire workflow."],
                ["The First Prompt", "Your starting point for AI-assisted website building."],
                ["Anti-Slop Checklist", "A final quality-control pass for your website."],
                ["Website Brief + Templates", "Reusable tools for planning your projects."],
                ["50 Rules for Better AI Websites", "The principles worth keeping close."],
                ["AI Website Teardowns", "Real examples. Real critique. Real improvements."],
                ["4 Live Build Sessions", "Watch the process from beginning to end."],
                ["Private Community", "Build, share and learn with other people doing the same thing."]
              ].map(([title, desc], i) => (
                <div key={i} className="flex flex-col gap-1">
                  <h4 className="font-bold text-neutral-900 dark:text-white text-base">{title}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">{desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                ₦20,000
              </h2>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-white mb-6">
                One book. A complete system for building better with AI.
              </h3>

              <div className="flex flex-col gap-4 text-neutral-500 dark:text-neutral-400 font-light mb-8 text-sm md:text-base">
                <p>You can spend the next year opening a new AI chat every time you want to build something.</p>
                <p>Or you can develop a process you can keep using.</p>
                <p className="font-semibold text-neutral-900 dark:text-white">Get Escape AI Slop for ₦20,000.</p>
              </div>

              <a href="#" className="inline-flex items-center gap-2 px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-[16px] hover:scale-105 transition-transform w-full justify-center">
                GET ACCESS NOW
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-neutral-400 mt-4 text-center">Instant access to the book and all included resources.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* WHO IS THIS FOR? */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col lg:flex-row gap-12 pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              Who is this for?
            </h2>
            <div className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-6">
              <p>This is for you if you've started using AI to build websites and thought:</p>
              <blockquote className="border-l-4 border-neutral-900 dark:border-white pl-4 py-2 italic font-serif text-neutral-900 dark:text-white font-medium text-xl">
                "Why does mine look like this?"
              </blockquote>
              <ul className="flex flex-col gap-4">
                {[
                  "It's for designers figuring out how their craft changes when AI can write the code.",
                  "It's for developers who want their interfaces to feel considerably more considered.",
                  "It's for freelancers who want to produce better websites in less time.",
                  "It's for founders who want to understand what AI can actually do for their business."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span className="text-neutral-600 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-medium text-neutral-900 dark:text-white bg-neutral-100/50 dark:bg-neutral-900/30 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                And it's for anyone who's realised that <strong className="font-bold">having access to the tools is becoming less valuable than knowing how to use them well.</strong>
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 bg-white dark:bg-[#111111] p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 dark:bg-pink-500/5 rounded-bl-[100px] pointer-events-none"></div>
             
             <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase mb-2">
              One Last Thing.
             </h2>
             <div className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed flex flex-col gap-4 text-sm md:text-base z-10">
                <p>AI is going to keep getting better. The tools will improve. The models will get smarter. The prompts will get easier. Building a website will become even more accessible.</p>
                <p>That's great.</p>
                <p>But when everyone has access to the same tools, <strong className="text-neutral-900 dark:text-white font-medium">your judgement becomes the differentiator.</strong></p>
                <ul className="pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 flex flex-col gap-1">
                  <li>Your taste.</li>
                  <li>Your ability to recognise what works.</li>
                  <li>Your ability to ask better questions.</li>
                  <li>Your ability to take the first version and keep going until it's right.</li>
                </ul>
                <p>That's what I want you to get from this book.</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-white mt-4 leading-tight">
                  The ability to build with AI without letting AI decide what good looks like.
                </p>
             </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-6">
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase max-w-2xl" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              Your Website Looks AI-Generated.
            </h2>
            <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium">
              Here's How to Fix It.
            </p>
            <p className="text-lg font-bold text-neutral-900 dark:text-white mt-4">
              Escape AI Slop — ₦20,000
            </p>
            <a href="#checkout" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform mt-4">
              GET THE BOOK + COMPLETE TOOLKIT
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-neutral-400 mt-8">© {new Date().getFullYear()} Oreoluwa Okunade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EscapeAISlop;
