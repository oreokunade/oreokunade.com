import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Circle } from 'lucide-react';
import { WORKS, SOCIAL_LINKS } from '../constants';
import { Project } from '../types';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const project: Project | undefined = WORKS.find(w => w.id === id);

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

  if (!project) {
    return (
      <div className="min-h-screen bg-transparent dark:bg-transparent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/#work')}
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const details = project.details;

  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-500 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      

      <main className="pt-24 md:pt-32 pb-24 md:pb-40">
        
        {/* Back Button */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
          <button
            onClick={() => navigate('/#work')}
            className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to works
          </button>
        </div>

        {/* Hero Section */}
        {details?.heroImage && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-32"
          >
            <div className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-neutral-200 dark:bg-neutral-900 shadow-2xl">
              <img
                src={details.heroImage}
                alt={project.title}
                className="w-full h-auto block"
              />
            </div>
          </motion.section>
        )}

        {/* Editorial Layout: Split Column */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* Left Column: Sticky Meta */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:h-fit shrink-0">
              <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-8">
                
                <div className="flex flex-col gap-4">
                  <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 dark:text-white">
                    {project.title}
                  </motion.h1>
                  {details?.subtitle && (
                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                      {details.subtitle}
                    </motion.p>
                  )}
                </div>

                <motion.div variants={fadeUp} className="h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80" />

                <motion.div variants={fadeUp} className="flex flex-col gap-6">
                  {/* Meta Details */}
                  <div className="flex flex-col gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-900 dark:text-neutral-200">Year</span>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-900 dark:text-neutral-200">Status</span>
                      <div className="flex items-center gap-2">
                        <Circle className={`w-2 h-2 fill-current ${project.status === 'Active' ? 'text-emerald-500' : 'text-neutral-400'}`} />
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live Site Link */}
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-[14px] bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-black dark:hover:bg-neutral-100 transition-colors"
                    >
                      Visit Live Site
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>

              </motion.div>
            </div>

            {/* Right Column: Scrolling Content */}
            <div className="w-full lg:w-2/3 flex flex-col gap-24 lg:gap-32 pb-32">
              
              {/* Main Paragraph */}
              {details?.mainParagraph && (
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-6">Overview</h2>
                  <p className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 font-light leading-[1.6] md:leading-[1.7] tracking-[-0.01em]">
                    {details.mainParagraph}
                  </p>
                </motion.section>
              )}

              {/* Minimalist Highlights */}
              {details?.highlights && details.highlights.length > 0 && (
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
                  <motion.h2 variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-8">
                    Key Architecture
                  </motion.h2>
                  <div className="flex flex-col">
                    {details.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeUp}
                        className="flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-t border-neutral-200 dark:border-neutral-800 last:border-b"
                      >
                        <h3 className="w-full md:w-1/3 text-lg font-medium text-neutral-900 dark:text-neutral-100 shrink-0">
                          {highlight.title}
                        </h3>
                        <p className="w-full md:w-2/3 text-neutral-600 dark:text-neutral-400 leading-relaxed text-base md:text-lg font-light">
                          {highlight.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Editorial Deep Dive (Features) */}
              {details?.features && details.features.length > 0 && (
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
                  <motion.h2 variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-12">
                    Deep Dive
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {details.features.map((feature, idx) => (
                      <motion.div key={idx} variants={fadeUp} className="flex flex-col gap-4">
                        <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-500 mb-2">
                          {idx + 1}
                        </div>
                        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Conclusion */}
              {details?.conclusion && (
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-6">Outcome</h2>
                  <p className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 font-light leading-[1.6] md:leading-[1.7] tracking-[-0.01em]">
                    {details.conclusion}
                  </p>
                </motion.section>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black relative overflow-hidden">
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
              <button
                onClick={() => navigate('/#work')}
                className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-900 dark:text-white text-sm font-semibold rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-6 md:py-8 flex relative">
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
      <footer className="bg-white dark:bg-black pb-12 pt-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Oreoluwa Okunade.</p>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudy;
