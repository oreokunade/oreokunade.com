import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import { FaEnvelope } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { WORKS, SOCIAL_LINKS } from '../constants';
import PocketCard from '../components/PocketCard';
import Navbar from '../components/Navbar';
import PurchaseToast from '../components/PurchaseToast';

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
    { step: "02 — GENERATE", desc: "Create a \"special file\" and master prompt that give AI actual creative and technical direction instead of a blank canvas." },
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

  const showcaseWorks = WORKS.filter(w => w.id === 'simon-dan-consulting' || w.id === 'wecreate-consult');

  return (
    <div className="min-h-screen w-full bg-transparent dark:bg-transparent text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="w-full px-6 md:px-[100px] pt-[100px] md:pt-[132px] pb-16 md:pb-24 flex flex-col-reverse md:flex-row md:items-start justify-between gap-12 md:gap-16 max-w-[1600px] mx-auto">
          
          {/* BIG HOOK TEXT (Left) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full md:w-[55%] text-left md:mt-12 lg:mt-16"
          >
            <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[3.75rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1] flex flex-wrap justify-start gap-x-2 gap-y-1 md:gap-x-3 mb-5">
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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col items-start gap-5"
            >
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-[90%] leading-snug">
                Learn the system I used to build websites that got me paid in millions
              </p>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#ff4306] text-white text-lg font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#ff4306]/20 cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  Get the guide
                  <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                    <ArrowRight className="absolute w-5 h-5 transition-transform duration-300 group-hover:translate-x-[150%]" />
                    <ArrowRight className="absolute w-5 h-5 -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                  </div>
                </span>
              </a>
              
              <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop"
                  ].map((url, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-[#0a0a0a] overflow-hidden">
                      <img src={url} alt="Student avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span>Trusted by ambitious designers and founders</span>
              </div>
            </motion.div>

            <div className="w-full md:w-[60%] lg:w-[45%] overflow-hidden mt-10 md:mt-12 relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
              <motion.div 
                className="flex gap-12 md:gap-16 w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              >
                {[
                  { name: "Figma", icon: "/logos/figma.svg", invert: true },
                  { name: "Google Antigravity", icon: "/logos/antigravity.svg", invert: false },
                  { name: "Claude Code", icon: "/logos/anthropic.svg", invert: true },
                  { name: "Cursor", icon: "/logos/cursor.svg", invert: true },
                  { name: "Figma", icon: "/logos/figma.svg", invert: true },
                  { name: "Google Antigravity", icon: "/logos/antigravity.svg", invert: false },
                  { name: "Claude Code", icon: "/logos/anthropic.svg", invert: true },
                  { name: "Cursor", icon: "/logos/cursor.svg", invert: true },
                  { name: "Figma", icon: "/logos/figma.svg", invert: true },
                  { name: "Google Antigravity", icon: "/logos/antigravity.svg", invert: false },
                  { name: "Claude Code", icon: "/logos/anthropic.svg", invert: true },
                  { name: "Cursor", icon: "/logos/cursor.svg", invert: true }
                ].map((tool, i) => (
                  <div key={i} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                    <img src={tool.icon} alt={tool.name} className={`w-8 h-8 md:w-10 md:h-10 object-contain ${tool.invert ? 'dark:invert' : ''}`} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* BOOK IMAGE (Right) */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="w-full md:w-[45%] flex justify-center md:justify-end">
             <img 
                src="/products/main-cover.png" 
                alt="Escape AI Slop Cover" 
                className="w-full max-w-[380px] md:max-w-[580px] lg:max-w-[720px] h-auto object-contain"
                fetchPriority="high"
             />
          </motion.div>
      </section>

      <main className="max-w-[700px] mx-auto px-6 md:px-8 pb-32 flex flex-col items-center w-full text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
        {/* BODY START */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="w-full flex flex-col gap-6 md:gap-8"
        >
          <div className="w-full flex flex-col items-center text-center gap-6 md:gap-8 max-w-[650px] mx-auto">
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
          </div>
          
          <motion.div variants={fadeUp} className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-10 mb-12 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-4 md:gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[59, 60, 61, 62, 59, 60, 61, 62].map((num, i) => (
                <div key={i} className="w-[320px] md:w-[500px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 group relative">
                  <img 
                    src={`/slopexamples/Screenshot (${num}).png`}
                    alt={`AI Slop Example ${i + 1}`}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="py-2 text-neutral-500 text-base md:text-lg">
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff4306]">
              {aiLookList.map((item, index) => (
                <li key={index} className="leading-tight pl-1">{item}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium text-xl md:text-2xl mt-4">
            The list is literally endless.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            In this book, I’ll show you how I approach building websites with AI, using one real project from start to finish.
          </motion.p>
          
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-8 mb-6">
            In this book, you'll learn how to:
          </motion.h2>
          
          {steps.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-1 mb-6">
              <span className="font-bold text-[#ff4306] tracking-tight">{item.step}</span>
              <p>{item.desc}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="w-full flex flex-col mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center text-center w-full pb-16 border-b border-neutral-200 dark:border-neutral-800">
              <p className="mb-8 w-full text-center">This process is the difference between:</p>
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

            <div className="w-full flex flex-col items-center text-center mt-8">
              <p className="mb-4">Maybe you're thinking, "I need to learn this before everyone else does."</p>
              <p className="mb-2">Or maybe you've already started building with AI... but you just can't place what you're getting wrong.</p>
              
              <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl mt-6 tracking-tight mb-8">This guide is for you.</p>
            </div>

            <div className="w-full flex justify-center pb-16">
              <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#ff4306] text-white font-semibold rounded-2xl hover:scale-105 transition-transform text-lg w-full max-w-[320px] cursor-pointer">
                Get the guide <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full flex flex-col mt-8 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
              Here are some examples of sites that I've built with AI:
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
                  onClick={() => navigate(`/work/${work.id}`)}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA CARD */}
          <motion.div id="pricing" variants={fadeUp} className="w-full bg-transparent border-4 border-[#ff4306] rounded-3xl p-8 md:p-12 flex flex-col items-center mt-20 shadow-xl text-left scroll-mt-24">
            <div className="text-center w-full mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-neutral-900 dark:text-white uppercase">Get the complete bundle</h2>
              <h3 className="text-lg md:text-xl font-bold text-neutral-700 dark:text-neutral-300">Get the book, the prompt library, design framework, assets, and community access.</h3>
            </div>
            
            <div className="w-full mb-10 flex flex-col gap-8 max-w-3xl mx-auto px-4 md:px-0">
               <div className="flex flex-col gap-6">
                 {[
                   { title: "01 — The Full Escape AI Slop Book", desc: "The complete system for going from idea to a polished website with AI, without settling for generic output.", value: "₦15,000" },
                   { title: "02 — The Prompt Library", desc: "Ready-to-use prompts for ideating, generating, iterating, refining and building with AI.", value: "₦10,000" },
                   { title: "03 — The DESIGN.md Framework", desc: "A practical system for giving AI a visual source of truth and keeping your website consistent as you build and iterate.", value: "₦10,000" },
                   { title: "04 — The Asset Resource Library", desc: "A curated list of resources for finding high-quality fonts, images, icons, illustrations, videos, 3D assets and more.", value: "₦5,000" },
                   { title: "05 — The AI Slop Checklist", desc: "A practical checklist for spotting the generic patterns AI keeps falling back on and knowing what to fix.", value: "₦5,000" },
                   { 
                     title: "06 — Build With AI Community", 
                     desc: "Get access to the community where we build together every week.", 
                     value: "₦25,000",
                     features: [
                       "Weekly live classes on building with AI",
                       "Live website reviews where I break down and critique community members' websites",
                       "Build sessions where we create new websites together from scratch",
                       "A community of people learning, building and sharing what they're working on"
                     ]
                   }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4">
                        <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                        <span className="text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#ff4306] rounded-lg whitespace-nowrap text-white w-fit shadow-sm">Value: {item.value}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                      
                      {item.features && (
                        <div className="mt-4">
                          <h4 className="font-bold mb-3 text-[#ff4306]">What you get in the community:</h4>
                          <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-[#ff4306]">
                            {item.features.map((feature, j) => (
                              <li key={j} className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed pl-1">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                 ))}
               </div>
            </div>

            <div className="w-full text-center mb-8 flex flex-col gap-2 text-neutral-600 dark:text-neutral-400 text-lg md:text-xl font-medium">
              <p>You're not just buying a book.</p>
              <p>You're getting the playbook, tools, resources and community to actually put it into practice.</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-3 mb-10 mt-6 text-center">
              <p className="text-neutral-900 dark:text-white text-xl md:text-2xl font-black tracking-tight">
                Total value: ₦70,000
              </p>
              
              <p className="text-[#ff4306] text-3xl md:text-4xl font-black tracking-tight my-2">
                Pre-order price: ₦7,500
              </p>

              <p className="text-neutral-900 dark:text-white text-lg md:text-xl font-bold tracking-tight">
                After launch price: ₦15,000
              </p>
            </div>
            
            <a href="#" className="group relative inline-flex items-center justify-center w-full px-10 py-5 bg-[#ff4306] text-white text-xl font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#ff4306]/20">
              <span className="relative z-10 flex items-center gap-2">
                Pre-order for ₦7,500
                <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                  <ArrowRight className="absolute w-6 h-6 transition-transform duration-300 group-hover:translate-x-[150%]" />
                  <ArrowRight className="absolute w-6 h-6 -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                </div>
              </span>
            </a>
          </motion.div>

        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0a0a0a] pb-12 pt-12 border-t border-neutral-200 dark:border-neutral-900 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Oreoluwa Okunade.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="font-medium text-neutral-900 dark:text-white mr-2 hidden sm:inline-block">Connect with me:</span>
            <a href="https://www.instagram.com/ore.okunade" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-2 group">
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>@ore.okunade</span>
            </a>
            <a href="https://linkedin.com/in/oreokunade" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
              <FaEnvelope className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EscapeAISlop;
