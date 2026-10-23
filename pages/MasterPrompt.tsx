import React, { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DIGITAL_PRODUCTS } from '../constants';
import { Copy, Check, Info, ChevronDown, ArrowLeft, X } from 'lucide-react';

const ColorLabelSelect: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["Primary", "Secondary", "Accent", "Background", "Neutrals"];
  
  const tooltips: Record<string, string> = {
    Primary: "Accounts for 10% of the visual weight. Reserved for primary call-to-action buttons, active states, links, key highlights, and one intentional focal point per section.",
    Secondary: "Complements the primary palette. Used sparingly for specific visuals, product interfaces, and informational states without competing with the primary brand colour.",
    Accent: "Sits outside the 60-30-10 ratio. Used sparingly for specific visuals, technical diagrams, data visualizations, and informational states.",
    Background: "Occupies roughly 60% of the interface. Serves as the primary canvas, creating clarity, generous whitespace, and allowing the content to breathe.",
    Neutrals: "Used for typography, surfaces, borders, dividers, and supporting interface elements, providing structure and contrast without overwhelming the design."
  };
  
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.color-label-select')) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div className="relative color-label-select ml-1">
      <button 
        type="button"
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors outline-none"
      >
        {value || 'Label...'}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl flex flex-col py-1 z-[100]"
          >
            <button 
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className={`px-3 py-1.5 text-xs text-left transition-colors ${!value ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
            >
              None
            </button>
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex items-center justify-between px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${value === opt ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <span>{opt}</span>
                <div className="relative group flex items-center" onClick={(e) => e.stopPropagation()}>
                  <Info className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-help" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 w-56 p-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-normal rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none normal-case whitespace-normal leading-relaxed">
                    {tooltips[opt]}
                    <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-1 border-4 border-transparent border-r-neutral-900 dark:border-r-white" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MasterPrompt: React.FC = () => {
  const navigate = useNavigate();
  const product = useMemo(() => DIGITAL_PRODUCTS.find(p => p.id === 'master-prompt-generator'), []);

  const [values, setValues] = useState<Record<string, string>>({});
  const [colorModes, setColorModes] = useState<Record<string, 'color' | 'palette' | 'vibe'>>({});
  const [paletteLabels, setPaletteLabels] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product) {
      setValues({});
      setColorModes({});
      setPaletteLabels({});
      setCopied(false);
    }
  }, [product]);

  const deferredValues = useDeferredValue(values);
  
  const extractHexColors = (text: string) => {
    if (!text) return [];
    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/gi;
    const matches = text.match(hexRegex);
    return matches ? Array.from(new Set(matches)) : [];
  };

  const generatedPrompt = useMemo(() => {
    if (!product || !product.promptTemplate) return '';
    return product.promptTemplate.replace(/\[([^\]]+)\]/g, (match) => {
      const variable = product.promptVariables?.find(v => v.id === match);
      const rawVal = deferredValues[match];
    
      if (variable?.type === 'color-vibe') {
        const mode = colorModes[match] || 'color';
        if (mode === 'color') {
          if (!rawVal) return match;
          const extractedColors = extractHexColors(rawVal);
          const colorStr = extractedColors.length > 0 ? extractedColors[0] : rawVal;
          return `My primary brand colour is ${colorStr}.`;
        } else if (mode === 'palette') {
          if (!rawVal) return match;
          const extractedColors = extractHexColors(rawVal);
          const labeledColors = extractedColors.map(hex => {
            const label = paletteLabels[hex];
            return label ? `${label}: ${hex}` : hex;
          });
          const paletteStr = labeledColors.length > 0 ? labeledColors.join(', ') : rawVal;
          return `Here is the complete color palette I have already created for the brand:\n${paletteStr}\nPlease integrate these exact colors into the color system section.`;
        } else {
          return `I don't have a primary color yet. Please extract a suitable primary brand color and a cohesive color system from the reference screenshots.`;
        }
      }
    
      return rawVal || match;
    });
  }, [product, deferredValues, colorModes, paletteLabels]);

  const handleInputChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/store');
    }
  };

  if (!product || !product.promptTemplate) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="text-neutral-500 mb-4">Prompt resource not found.</p>
        <button
          onClick={() => navigate('/store')}
          className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium"
        >
          Back to Resources
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto flex flex-col">
      {/* Top Back Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Resources</span>
        </button>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
          Free Interactive Template
        </span>
      </div>

      <div className="relative w-full bg-[#F9F8F6] dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-xl flex flex-col border border-neutral-200/60 dark:border-neutral-800/60">
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div>
            <h1 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white">
              {product.title}
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light mt-1">
              {product.description}
            </p>
          </div>
          <button 
            type="button"
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Back to resources"
            aria-label="Back to resources"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-8">
          {product.promptVariables && product.promptVariables.length > 0 && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Configure Prompt
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.promptVariables.map(variable => {
                  if (variable.type === 'color-vibe') {
                    const mode = colorModes[variable.id] || 'color';
                    return (
                      <div key={variable.id} className="flex flex-col gap-3 sm:col-span-2 p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {variable.label}
                          </label>
                          <div className="flex flex-wrap items-center gap-1 bg-neutral-200/50 dark:bg-neutral-900 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => setColorModes(prev => ({ ...prev, [variable.id]: 'color' }))}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'color' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'}`}
                            >
                              Single Color
                            </button>
                            <button
                              type="button"
                              onClick={() => setColorModes(prev => ({ ...prev, [variable.id]: 'palette' }))}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'palette' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'}`}
                            >
                              Full Palette
                            </button>
                          </div>
                        </div>
                        {mode === 'color' && (
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. #0F172A"
                              value={values[variable.id] || ''}
                              onChange={(e) => handleInputChange(variable.id, e.target.value)}
                              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all w-full pr-12 font-mono text-sm"
                            />
                            {extractHexColors(values[variable.id] || '')[0] && (
                              <div 
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700" 
                                style={{ backgroundColor: extractHexColors(values[variable.id] || '')[0] }} 
                              />
                            )}
                          </div>
                        )}
                        {mode === 'palette' && (
                          <div className="flex flex-col gap-3">
                            <textarea
                              placeholder="Paste your generated color palette here (separate with commas)... e.g. #0F172A, #F8FAFC"
                              value={values[variable.id] || ''}
                              onChange={(e) => handleInputChange(variable.id, e.target.value)}
                              rows={4}
                              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all w-full resize-none font-mono text-sm leading-relaxed"
                            />
                            
                            {extractHexColors(values[variable.id] || '').length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 px-1">
                                {extractHexColors(values[variable.id] || '').map((hex, i) => (
                                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
                                    <div className="w-4 h-4 rounded-full shadow-inner border border-black/10 dark:border-white/10" style={{ backgroundColor: hex }} />
                                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase">{hex}</span>
                                    <ColorLabelSelect 
                                      value={paletteLabels[hex] || ''}
                                      onChange={(val) => setPaletteLabels(prev => ({ ...prev, [hex]: val }))}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <div key={variable.id} className={`flex flex-col gap-1.5 ${variable.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {variable.label}
                      </label>
                      {variable.type === 'textarea' ? (
                        <textarea
                          placeholder={variable.placeholder}
                          value={values[variable.id] || ''}
                          onChange={(e) => handleInputChange(variable.id, e.target.value)}
                          rows={4}
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all resize-y w-full text-sm leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={variable.placeholder}
                          value={values[variable.id] || ''}
                          onChange={(e) => handleInputChange(variable.id, e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Generated Prompt Preview */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Generated Prompt
              </h4>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm font-medium cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <div className="relative rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 overflow-hidden">
              <pre className="font-sans text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {generatedPrompt}
              </pre>
              
              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl shadow-lg border border-neutral-800 dark:border-neutral-200 flex items-center gap-2 whitespace-nowrap z-10"
                  >
                    <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-500" />
                    Prompt copied! Remember to attach your reference screenshots.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterPrompt;
