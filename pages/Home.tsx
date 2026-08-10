import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Github, Twitter, Linkedin, Sparkles, Copy, Instagram, Code2, Layers, Cpu, MousePointer2, Terminal } from 'lucide-react';
import { FaEnvelope, FaBookOpen, FaFigma } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { WORKS, WRITING, SOCIAL_LINKS, OFFERS } from '../constants';
import Navbar from '../components/Navbar';
import PocketCard from '../components/PocketCard';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAktiv8Soon, setShowAktiv8Soon] = useState(false);
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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Fade up animation variants
  const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#fcfbf8] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-500 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      


      <Navbar />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.section 
          id="home"
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center text-center gap-6 md:gap-8 pt-24 pb-10 md:pt-32 md:pb-12"
        >
          <motion.div 
            variants={fadeUp}
            className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xl dark:shadow-none"
          >
            <img 
              src="/profile.jpg" 
              alt="Oreoluwa Okunade" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </motion.div>

          <div className="flex flex-col items-center gap-6 md:gap-8 max-w-2xl">
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <h1 style={{ fontFamily: "'Saira Condensed', sans-serif", lineHeight: "0.9" }} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide mb-1 text-neutral-900 dark:text-white mt-1">
                OREOLUW<span style={{ fontSize: "0.96em" }}>Ʌ</span> OKUN<span style={{ fontSize: "0.96em" }}>Ʌ</span>DE
              </h1>
              <h2 className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase mb-0 mt-1">
                Product Design Engineer
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-2xl text-center mx-auto mb-2 md:mb-4 px-4 md:px-0">
              <h3 className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed md:leading-[2.2]">
                Over <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-neutral-900 dark:text-white font-medium text-[1.15em]">half a decade</span> shaping and building <span className="text-neutral-900 dark:text-white font-medium">products</span> and <span className="text-neutral-900 dark:text-white font-medium">solutions</span>.{' '}
                <span className="block mt-4 md:inline md:mt-0 leading-[2.2]">
                  Currently building{' '}
                  <a href="https://usephocus.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-3 py-1 rounded-xl transition-all border border-neutral-200 dark:border-neutral-700 shadow-sm group align-middle mx-1 md:-mt-1">
                    <img src="/logos/phocus.svg" alt="Phocus" className="w-4 h-4 md:w-5 md:h-5 rounded-md" />
                    <span className="text-neutral-900 dark:text-white font-medium text-lg md:text-xl">Phocus</span>
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                  </a>
                  {' '}and running{' '}
                  <span className="relative inline-flex items-center group/studiox align-middle mx-1 md:-mt-1">
                    <a href="https://www.instagram.com/studiox.build/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-3 py-1 rounded-xl transition-all border border-neutral-200 dark:border-neutral-700 shadow-sm group cursor-pointer">
                      <img src="/logos/studio-x.png" alt="Studio X" className="w-4 h-4 md:w-5 md:h-5 rounded-md object-cover" />
                      <span className="text-neutral-900 dark:text-white font-medium text-lg md:text-xl">Studio X</span>
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                    </a>
                  </span>.
                </span>
              </h3>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4 mt-2">
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform">
                Work with me
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button onClick={() => navigate('/store')} className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform">
                Learn from me
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Tool Stack */}
            <motion.div variants={fadeUp} className="flex flex-col items-center mt-12 md:mt-16 w-full border-t border-neutral-200/50 dark:border-neutral-800/50 pt-8">
              <p className="text-[10px] md:text-[11px] text-neutral-400 dark:text-neutral-500 font-medium tracking-[0.2em] uppercase mb-6">
                Techstack
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-neutral-400 dark:text-neutral-500">
                <div className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                  <img src="/logos/figma.svg" alt="Figma" className="w-4 h-4 md:w-5 md:h-5 dark:invert" />
                  <span className="font-semibold tracking-tight text-sm md:text-base">Figma</span>
                </div>
                <div className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                  <img src="/logos/storybook.svg" alt="Storybook" className="w-4 h-4 md:w-5 md:h-5 dark:invert" />
                  <span className="font-semibold tracking-tight text-sm md:text-base">Storybook</span>
                </div>
                <div className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                  <img src="/logos/antigravity.svg" alt="Google Antigravity" className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-semibold tracking-tight text-sm md:text-base">Google Antigravity</span>
                </div>
                <div className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                  <img src="/logos/anthropic.svg" alt="Claude Code" className="w-4 h-4 md:w-5 md:h-5 dark:invert" />
                  <span className="font-semibold tracking-tight text-sm md:text-base">Claude Code</span>
                </div>
                <div className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default">
                  <img src="/logos/cursor.svg" alt="Cursor" className="w-4 h-4 md:w-5 md:h-5 dark:invert" />
                  <span className="font-semibold tracking-tight text-sm md:text-base">Cursor</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* 2. Philosophy / Manifesto Section */}
        <section 
          id="about" 
          className="w-full snap-start flex flex-col justify-center items-center py-20 md:py-24"
        >
          <div className="max-w-[800px] mx-auto px-6 md:px-12 w-full text-center">
            <h2 className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase mb-6">
              Philosophy & Vision
            </h2>
            <div className="flex flex-col gap-6 text-lg md:text-xl lg:text-2xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed md:leading-[2]">
              <p>
                My vision is simple: <span className="text-neutral-900 dark:text-white font-medium italic text-[1.05em]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>help people live focused, purposeful lives.</span> I'm doing this through{' '}
                <a href="https://www.instagram.com/ore.okunade/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3 py-0.5 rounded-full transition-all border border-neutral-200 dark:border-neutral-800 shadow-sm group align-middle mx-1 relative -top-[2px]">
                  <Instagram className="w-[0.9em] h-[0.9em] text-neutral-400 group-hover:text-pink-500 transition-colors" />
                  <span className="text-neutral-700 dark:text-neutral-200 font-medium text-[0.95em]">writing</span>
                  <ArrowUpRight className="w-[0.8em] h-[0.8em] text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </a>
                , speaking, and a suite of products I'm building over the next couple of years, helping people lay aside the things that hinder them from becoming who they were made to be.
              </p>
              <p>
                This vision also drives my design philosophy (simplicity).<br className="hidden md:block" /> My mantra: <strong className="text-neutral-700 dark:text-neutral-300 font-medium">complexity is easy, simplicity is hard.</strong> It's easy to add another button or feature. What's hard is asking what to take away. If an element doesn't actively serve the user, it gets cut. Strip the bloat, kill the friction, make the design invisible.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <motion.section 
          id="work" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full snap-start flex flex-col justify-center py-20 md:py-24"
        >
          <motion.div 
            variants={fadeUp}
            className="flex items-baseline gap-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4"
          >
            <h2 className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase">
              Selected Works
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {WORKS.map((work, index) => (
              <motion.div
                key={work.id}
                variants={fadeUp}
              >
                <PocketCard 
                  title={work.title}
                  subtitle={work.description}
                  link={work.link}
                  mainImage={work.details?.heroImage}
                  decorations={index % 2 === 0 ? ['✨', '🚀'] : ['☀️', '💻']}
                  tags={work.tags}
                  year={work.year}
                  onClick={() => navigate(`/work/${work.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Philosophy / When to Hire Me */}
        <motion.section 
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full snap-start border-t border-neutral-200 dark:border-neutral-900 py-20 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <motion.div variants={fadeUp} className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6">
                When is it ideal to partner with me?
              </h2>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                The traditional handoff from design to engineering is broken. A lot gets lost in translation. As a Product Design Engineer, I operate precisely at this intersection.
              </p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Product + Frontend</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light text-sm">
                  Hire me when you need someone who understands deep product logic and can immediately construct those ideas into high-performance frontend code.
                </p>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Aesthetic Sensibility</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light text-sm">
                  When you need an interface that doesn't just work, but feels premium. I bring high-end aesthetic intuition and translate it directly into fluid interactions.
                </p>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">The Engineering Bridge</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light text-sm max-w-xl">
                  I speak the language of software engineering. I collaborate seamlessly with backend and full-stack developers, architecting the UI layer so they can focus on core infrastructure.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full snap-start flex flex-col justify-center border-t border-neutral-200 dark:border-neutral-900 py-20 md:py-24"
        >
          <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
             <h2 className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.2em] uppercase">
                Services
              </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {OFFERS.map((offer, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                className="flex flex-col p-8 md:p-10 rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-200/60 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors duration-500"
              >
                <span className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-neutral-600 mb-8">
                  0{index + 1}
                </span>
                
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
                  {offer.title}
                </h3>
                
                <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  {offer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>



      </div>

      {/* Footer CTA */}
      <section className="snap-start border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 dark:text-white mb-6 tracking-tight">
              Ready to elevate your product?
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl mb-10 font-light">
              I partner with founders and modern brands to build fast, beautiful, and highly engineered digital products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-[14px] hover:scale-105 transition-transform"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="snap-start w-full overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-6 md:py-8 flex relative">
        <motion.div
          className="flex whitespace-nowrap shrink-0 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center px-4 md:px-8">
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", lineHeight: "1" }} className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide text-neutral-900 dark:text-white mt-1">
                OREOLUW<span style={{ fontSize: "0.96em" }}>Ʌ</span> OKUN<span style={{ fontSize: "0.96em" }}>Ʌ</span>DE
              </span>
              <span className="mx-4 md:mx-8 text-xl md:text-2xl text-neutral-300 dark:text-neutral-800">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="snap-start bg-white dark:bg-black pb-12 pt-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Oreoluwa Okunade.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;