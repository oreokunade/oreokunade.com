const fs = require('fs');

const fileContent = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { WORKS } from '../constants';
import PocketCard from '../components/PocketCard';

const EscapeAISlop = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const aiLookList = [
    "Purple/blue gradients",
    "Excessive glassmorphism",
    "Gradient text",
    "Giant hero headlines",
    "Tiny eyebrow labels above headings",
    "Inter/Geist/Space Grotesk used by default",
    "Excessive rounded corners",
    "Pills everywhere",
    "Decorative glows everywhere",
    "Random blobs and abstract shapes",
    "Generic SVG illustrations",
    "Every section using the same layout",
    "Generic stat/metric blocks",
    "Excessive badges and labels",
    "Fake blinking cursors",
    "Generic SaaS copy",
    "“Supercharge your workflow” language",
    "“This isn’t X, it’s Y” copy",
    "Over-explaining simple ideas",
    "Dark background + neon accent + glow as a default “premium” aesthetic",
    "Visual effects being used instead of actual composition",
    "Sections feeling like they came from different websites"
  ];

  const steps = [
    { step: "01 — IDEATE", desc: "Figure out what you're actually trying to build before opening your AI tool." },
    { step: "02 — GENERATE", desc: "Create a \\"special file\\" and master prompt that give AI actual creative and technical direction instead of a blank canvas." },
    { step: "03 — ITERATE", desc: "Know what to change when the first version isn't right." },
    { step: "04 — SYSTEMIZE", desc: "Turn the decisions you're making into a repeatable system you can use across future projects." },
    { step: "05 — DEPLOY", desc: "Take what you've built and actually get it out into the world." }
  ];

  const targetAudience = [
    "You're a designer trying to add development to your skillset.",
    "You're a developer trying to become faster.",
    "You're a founder/business owner building your own product/business website",
    "You're a student or fresh graduate looking for a skill that can actually give you an edge."
  ];

  const showcaseWorks = WORKS.filter(w => w.id === 'simon-dan-consulting' || w.id === 'we-create-consult');

  return (
    <div className="min-h-screen w-full bg-transparent dark:bg-transparent text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      <Link 
        to="/store"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 group shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden md:inline">Back to Resources</span>
      </Link>
      
      <main className="max-w-[700px] mx-auto px-6 md:px-8 pt-24 pb-32 flex flex-col items-start w-full text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
        
        <motion.div variants={fadeUp} className="mb-12 mt-4 flex justify-center w-full">
           <img 
              src="/products/escape-ai-slop.png" 
              alt="Escape AI Slop Cover" 
              className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain mix-blend-multiply dark:mix-blend-lighten shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none rounded-sm"
              fetchPriority="high"
           />
        </motion.div>

        {/* BIG HOOK */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full text-center mb-16 md:mb-20 pt-8"
        >
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1] flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3">
            {"Learn how to build clean and professional websites with AI.".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* BODY START */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="w-full flex flex-col gap-6 md:gap-8"
        >
          <motion.p variants={fadeUp}>
            You can generate a website in 30 seconds, that's the easy part.
          </motion.p>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white">
            Making it look intentional, professional and ready for launch is the hard part.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            You've probably already tried Lovable, Bolt, Cursor, v0 or another AI builder. The website works. The sections are there.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            But it has that "look" that every AI generated website has:
          </motion.p>
          
          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] flex flex-col gap-3 py-2 text-neutral-500 text-base md:text-lg">
            {aiLookList.map((item, index) => (
              <p key={index} className="leading-tight">{item}</p>
            ))}
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium text-xl md:text-2xl mt-4">
            The list is literally endless.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            In this book, I’ll show you how I approach building websites with AI as a product designer, using one real project from start to finish.
          </motion.p>
          
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-8 mb-6">
            You'll learn how to:
          </motion.h2>
          
          {steps.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-1 mb-6">
              <span className="font-bold text-[#ff4306] tracking-tight">{item.step}</span>
              <p>{item.desc}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="w-full flex flex-col mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <p className="mb-8">This process is the difference between:</p>
            <div className="flex flex-col items-center text-center w-full pb-16 border-b border-neutral-200 dark:border-neutral-800">
              <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-6">"AI built my website."</p>
              <p>and</p>
              <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-6">"I designed this website with AI."</p>
              <p className="text-neutral-900 dark:text-white font-medium mt-6 text-xl">It's not about the tool but the system behind the tool.</p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-col gap-6 mt-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              This guide is for you if:
            </h2>
            
            <div className="flex flex-col gap-4">
              {targetAudience.map((audience, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff4306] mt-2.5 shrink-0" />
                  <p>{audience}</p>
                </div>
              ))}
            </div>

            <p className="mt-8">Maybe you're thinking, "I need to learn this before everyone else does."</p>
            <p>Or maybe you've already started building with AI...but you just can't place what you're getting wrong.</p>
            
            <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl mt-6 tracking-tight mb-8">This guide is for you.</p>

            <div className="w-full flex justify-center pb-16">
              <a href="#checkout" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#ff4306] text-white font-semibold rounded-2xl hover:scale-105 transition-transform text-lg w-full max-w-[320px]">
                Get the guide <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full flex flex-col mt-8 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
              Here are some examples of sites that I've build with AI:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {showcaseWorks.map((work, index) => (
                <PocketCard 
                  key={work.id}
                  title={work.title}
                  subtitle={work.description}
                  link={work.link}
                  mainImage={work.details?.heroImage}
                  decorations={index % 2 === 0 ? ['✨', '🚀'] : ['☀️', '💻']}
                  tags={work.tags}
                  year={work.year}
                  onClick={() => navigate(\`/work/\${work.id}\`)}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA CARD */}
          <motion.div id="checkout" variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-8 md:p-12 flex flex-col items-center text-center mt-20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Escape AI Slop</h2>
            <h3 className="text-lg md:text-xl font-medium text-neutral-400 dark:text-neutral-500 mb-8">Make your skill more valuable.</h3>
            
            <div className="bg-white/10 dark:bg-black/5 rounded-2xl p-6 md:p-8 w-full mb-8 border border-white/10 dark:border-black/10 text-left flex flex-col gap-2">
               <h4 className="text-xl md:text-2xl font-bold mb-2">Pre-order Access</h4>
               <p className="text-sm md:text-base text-neutral-400 dark:text-neutral-600 mb-6">The book + asset library + AI playbook + community.</p>

               <ul className="flex flex-col gap-3 mb-6">
                 {["The complete 5-step system", "Master prompt templates", "Real project case study"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm md:text-base text-neutral-200 dark:text-neutral-800">
                      <div className="w-5 h-5 rounded-full bg-[#ff4306]/20 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#ff4306]"></div>
                      </div>
                      {feature}
                    </li>
                 ))}
               </ul>
            </div>
            
            <a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ff4306] text-white text-lg font-bold rounded-2xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20">
              Pre-order now
            </a>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

export default EscapeAISlop;
`;

fs.writeFileSync('pages/EscapeAISlop.tsx', fileContent);
console.log('Successfully rewrote EscapeAISlop.tsx');
