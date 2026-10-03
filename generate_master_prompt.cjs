const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');

content = content.replace(/import \{ X, Copy, Check, Info, ChevronDown \} from 'lucide-react';/, "import { Copy, Check, Info, ChevronDown } from 'lucide-react';");
content = content.replace("interface PromptModalProps {\n  product: DigitalProduct | null;\n  onClose: () => void;\n}", "");

// Replace the component signature
content = content.replace("const PromptModal: React.FC<PromptModalProps> = ({ product, onClose }) => {", "import { DIGITAL_PRODUCTS } from '../constants';\n\nconst MasterPrompt = () => {\n  const product = DIGITAL_PRODUCTS.find(p => p.id === 'master-prompt-generator');");

// Replace the close button
content = content.replace(/<button[\s\S]*?onClick={onClose}[\s\S]*?<X className="w-5 h-5" \/>[\s\S]*?<\/button>/m, '');

// Replace the modal wrappers
content = content.replace(/<AnimatePresence>\s*<div className="fixed inset-0 z-\[100\] flex items-center justify-center p-4 sm:p-6">\s*<motion\.div[^>]*onClick={onClose}[^>]*\/>/m, '<div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">');

content = content.replace(/<motion\.div\s*initial={{ opacity: 0, scale: 0\.95, y: 20 }}\s*animate={{ opacity: 1, scale: 1, y: 0 }}\s*exit={{ opacity: 0, scale: 0\.95, y: 20 }}\s*transition={{ type: "spring", damping: 25, stiffness: 300 }}\s*className="relative w-full max-w-3xl max-h-\[90vh\] bg-\[#F9F8F6\] dark:bg-\[#0a0a0a\] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200\/50 dark:border-neutral-800\/50"\s*>/, '<div className="relative w-full bg-[#F9F8F6] dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-xl flex flex-col border border-neutral-200/50 dark:border-neutral-800/50">');

content = content.replace(/<\/motion\.div>\s*<\/div>\s*<\/AnimatePresence>/m, '</div></div>');

content = content.replace('export default PromptModal;', 'export default MasterPrompt;');

// Remove useEffect for overflow hidden
content = content.replace(/useEffect\(\(\) => \{[\s\S]*?document\.body\.style\.overflow = 'unset';\s*\};\s*\}, \[product\]\);/, '');

// Make sure to remove any remaining `onClose` references or issues
fs.writeFileSync('pages/MasterPrompt.tsx', content);
console.log('Duplicated and modified');
