import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-[1400px] h-[95vh] bg-[#F9F8F6] dark:bg-[#0a0a0a] rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex-none flex items-center justify-between px-6 py-6 md:px-12 md:py-8 bg-[#F9F8F6] dark:bg-[#0a0a0a] border-b border-neutral-200/50 dark:border-neutral-800/50 z-10">
            <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 font-medium">
              <span>Work</span>
              <span>/</span>
              <span className="text-neutral-900 dark:text-white">{project.title}</span>
            </div>
            
            <div className="flex items-center gap-4">
              {project.link && project.link !== '#' && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-md transition-colors text-sm font-medium text-neutral-900 dark:text-white shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Visit Live Site
                </a>
              )}
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-md transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </div>
          </div>

          <div className="w-full flex-1 overflow-y-auto relative">
            {/* Content Body */}
          <div className="px-6 md:px-12 pb-24 max-w-5xl mx-auto w-full flex flex-col gap-12 md:gap-20 pt-4">
            
            {/* Title & Hero Image */}
            <div className="flex flex-col gap-8 md:gap-12">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
                  {project.title}
                </h1>
                {project.details?.subtitle && (
                  <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-light">
                    {project.details.subtitle}
                  </p>
                )}
              </div>

              {project.details?.heroImage && (
                <div className="w-full aspect-[16/10] md:aspect-video rounded-[32px] overflow-hidden bg-neutral-200 dark:bg-neutral-900 shadow-sm border border-neutral-200/50 dark:border-neutral-800">
                  <img 
                    src={project.details.heroImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Main Paragraph */}
            {project.details?.mainParagraph && (
              <div className="text-xl md:text-3xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed max-w-4xl">
                {project.details.mainParagraph}
              </div>
            )}

            {/* Highlights Grid */}
            {project.details?.highlights && project.details.highlights.length > 0 && (
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                  What this demonstrates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.details.highlights.map((highlight, idx) => (
                    <div 
                      key={idx} 
                      className="bg-neutral-100/60 dark:bg-neutral-900/40 p-8 rounded-[32px] flex flex-col gap-3"
                    >
                      <h4 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-white">
                        {highlight.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Features */}
            {project.details?.features && project.details.features.length > 0 && (
              <div className="flex flex-col gap-16 mt-8">
                {project.details.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-4 max-w-3xl">
                    <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
