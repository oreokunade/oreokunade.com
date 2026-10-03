const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. imports
content = content.replace("import { X, Copy, Check, Info, ChevronDown } from 'lucide-react';", "import { Copy, Check, Info, ChevronDown } from 'lucide-react';");

// 2. remove interface
content = content.replace(/interface PromptModalProps \{[\s\S]*?\}/, '');

// 3. component signature
const searchStr = 'const PromptModal: React.FC<PromptModalProps> = ({ product, onClose }) => {';
content = content.replace(searchStr, `import { DIGITAL_PRODUCTS } from '../constants';

const MasterPrompt = () => {
  const product = DIGITAL_PRODUCTS.find(p => p.id === 'master-prompt-generator');
  if (!product) return null;`);

// 4. remove useEffect overflow hidden
const useEffectStr = `  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setValues({});
      setColorModes({});
      setPaletteLabels({});
      setCopied(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);`;
content = content.replace(useEffectStr, `  useEffect(() => {
    if (product) {
      setValues({});
      setColorModes({});
      setPaletteLabels({});
      setCopied(false);
    }
  }, [product]);`);

// 5. Replace outer modal wrapper EXACTLY
const outerStartStr = `  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#F9F8F6] dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200/50 dark:border-neutral-800/50"
        >`;
const outerStartReplacement = `  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto flex flex-col justify-center">
        <div className="relative w-full bg-[#F9F8F6] dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-xl flex flex-col border border-neutral-200/50 dark:border-neutral-800/50">`;
content = content.replace(outerStartStr, outerStartReplacement);

// 6. Replace outer modal wrapper end EXACTLY
const outerEndStr = `        </motion.div>
      </div>
    </AnimatePresence>
  );
};`;
const outerEndReplacement = `        </div>
    </div>
  );
};`;
content = content.replace(outerEndStr, outerEndReplacement);

// 7. Remove close button X
const closeBtnRegex = /<button[\s\S]*?onClick=\{onClose\}[\s\S]*?<X className="w-5 h-5" \/>[\s\S]*?<\/button>/;
content = content.replace(closeBtnRegex, '');

// 8. Replace export
content = content.replace('export default PromptModal;', 'export default MasterPrompt;');

fs.writeFileSync('pages/MasterPrompt.tsx', content);
console.log('MasterPrompt.tsx generated correctly without regex deleting the file!');
