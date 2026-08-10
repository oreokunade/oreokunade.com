import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Copy, Check } from 'lucide-react';
import { FaBagShopping, FaBook, FaCirclePlay, FaCode, FaPenNib } from 'react-icons/fa6';
import { DIGITAL_PRODUCTS, WRITING, DigitalProduct } from '../constants';
import Navbar from '../components/Navbar';
import PocketCard from '../components/PocketCard';
import PromptModal from '../components/PromptModal';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

type Category = 'Prompt templates' | 'Books' | 'Writing';
const CATEGORIES: Category[] = ['Prompt templates', 'Books', 'Writing'];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
    </button>
  );
};

const getProductIcon = (type: string) => {
  switch (type) {
    case 'Course':
      return <FaCirclePlay className="w-10 h-10" />;
    case 'Template':
      return <FaCode className="w-10 h-10" />;
    case 'E-Book':
      return <FaBook className="w-10 h-10" />;
    case 'Kit':
      return <FaBagShopping className="w-10 h-10" />;
    default:
      return <FaPenNib className="w-10 h-10" />;
  }
};

const Store = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('Prompt templates');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<DigitalProduct | null>(null);
  const location = useLocation();

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    
    // Check URL parameters for direct link
    const params = new URLSearchParams(location.search);
    const templateId = params.get('template');
    if (templateId) {
      const template = DIGITAL_PRODUCTS.find(p => p.id === templateId);
      if (template && (template.promptTemplate || template.type === 'Template' || template.tags?.includes('Prompts'))) {
        setSelectedPrompt(template);
      }
    }
  }, [location.search]);

  const filteredProducts = DIGITAL_PRODUCTS.filter(product => {
    if (activeCategory === 'Prompt templates') return product.type === 'Kit' || product.tags.includes('Prompts') || product.type === 'Template';
    if (activeCategory === 'Books') return product.type === 'E-Book';
    return true; 
  });

  return (
    <div className={`min-h-screen bg-[#FDFCFB] dark:bg-[#0a0a0a] font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Mobile Category Selector */}
        <div className="lg:hidden w-[100vw] relative z-30 mb-8 -mx-4 px-4 flex overflow-x-auto gap-2 py-3 border-y border-neutral-200 dark:border-neutral-800/50 bg-[#FDFCFB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style dangerouslySetInnerHTML={{__html: `.lg\\\\:hidden::-webkit-scrollbar { display: none; }`}} />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-neutral-800 dark:bg-[#2a2a2a] text-white shadow-sm' 
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-8">
          <div className="sticky top-32">
            <div className="mb-8">
              <h2 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4 px-3">Discover</h2>
              <nav className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 flex items-center gap-3 ${
                      activeCategory === cat 
                        ? 'bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-neutral-800/50' 
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#111111]'
                    }`}
                  >

                    {cat === 'Prompt templates' && <FaCode className="w-4 h-4 opacity-70" />}
                    {cat === 'Books' && <FaBook className="w-4 h-4 opacity-70" />}
                    {cat === 'Writing' && <FaPenNib className="w-4 h-4 opacity-70" />}
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="mb-10 lg:mb-12">
            <motion.h1 
              key={`title-${activeCategory}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight"
            >
              {activeCategory}
            </motion.h1>
            <motion.p 
              key={`desc-${activeCategory}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl"
            >

              {activeCategory === 'Prompt templates' && 'Micro-interactions and animation kits to elevate your workflow.'}
              {activeCategory === 'Books' && 'Comprehensive guides and roadmaps to level up your career.'}
              {activeCategory === 'Writing' && 'My latest essays on design, engineering, and product philosophy.'}
            </motion.p>
          </div>

          <motion.div 
            key={activeCategory} 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className={`grid grid-cols-1 ${activeCategory === 'Writing' ? 'md:grid-cols-2 gap-4 md:gap-6' : 'md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5'}`}
          >
            {activeCategory === 'Writing' ? (
              WRITING.map((article) => (
                <motion.div key={article.id} variants={fadeUp}>
                  <PocketCard 
                    title={article.title}
                    subtitle={`${article.date} · ${article.readTime}`}
                    link={article.link}
                    decorations={['📝', '💭']}
                  />
                </motion.div>
              ))
            ) : (
              filteredProducts.map((product) => (
                <motion.a
                  key={product.id}
                  href={product.promptTemplate ? '#' : product.link}
                  target={product.promptTemplate ? undefined : "_blank"}
                  rel={product.promptTemplate ? undefined : "noopener noreferrer"}
                  onClick={(e) => {
                    if (product.promptTemplate) {
                      e.preventDefault();
                      setSelectedPrompt(product);
                    }
                  }}
                  variants={fadeUp}
                  className="group flex flex-col bg-white dark:bg-[#111111] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer"
                >
                  {/* Product Cover (Only for Books) */}
                  {product.type === 'E-Book' && (
                    <div className="w-full aspect-[4/5] bg-neutral-100/50 dark:bg-[#161616] relative overflow-hidden flex items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
                      {product.coverImage ? (
                        <img src={product.coverImage} alt={product.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neutral-200/50 dark:to-neutral-800/50 z-0" />
                          <div className="w-24 h-24 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center text-neutral-400 dark:text-neutral-500 relative z-10 group-hover:scale-110 transition-transform duration-500">
                            {getProductIcon(product.type)}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-500">
                        {product.type}
                      </span>
                      {product.price && (
                        <span className="text-xs font-semibold px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-neutral-600 dark:text-neutral-300">
                          {product.price}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8 flex-1">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-neutral-100 dark:border-neutral-800/50">
                      <div className="flex flex-wrap gap-1.5">
                        {product.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-medium px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Copy icon for Prompt Templates, Arrow for others */}
                      {product.tags.includes('Prompts') ? (
                        <CopyButton text={product.description} />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0">
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))
            )}
            
            {/* Empty State Fallback */}
            {activeCategory !== 'Writing' && filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">No resources found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-400 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© {new Date().getFullYear()} Oreoluwa Okunade. All rights reserved.</p>
      </footer>

      <PromptModal 
        product={selectedPrompt} 
        onClose={() => setSelectedPrompt(null)} 
      />
    </div>
  );
};

export default Store;
