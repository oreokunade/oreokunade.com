import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PocketCardProps {
  title: string;
  subtitle: string;
  link?: string;
  mainImage?: string;
  fallbackInitial?: string;
  decorations?: string[];
  tags?: string[];
  year?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const PocketCard = ({ title, subtitle, link, mainImage, fallbackInitial, tags, year, onClick }: PocketCardProps) => {
  return (
    <motion.a 
      href={link || '#'}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      target={link !== '#' ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group block relative w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 flex flex-col"
    >
      {/* Top Image Container with padding */}
      <div className="w-full p-2 pb-0">
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {mainImage ? (
            <img 
              src={mainImage} 
              alt={title} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-5xl font-bold text-white ${['bg-gradient-to-br from-orange-400 to-amber-500', 'bg-gradient-to-br from-blue-500 to-indigo-600', 'bg-gradient-to-br from-purple-400 to-fuchsia-500'][title.length % 3]}`}>
              {fallbackInitial || title.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Text Content */}
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        <div className="flex items-start justify-between h-full">
          <div className="flex flex-col flex-1 pr-4 h-full">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {title}
              </h3>
              {year && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  {year}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4 line-clamp-2">
              {subtitle}
            </p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default PocketCard;
