const fs = require('fs');
const file = 'c:/Users/PC/Desktop/DE Portfolio/pages/EscapeAISlop.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add Navbar import if it doesn't exist
if (!content.includes('import Navbar')) {
  content = content.replace("import PocketCard from '../components/PocketCard';", "import PocketCard from '../components/PocketCard';\nimport Navbar from '../components/Navbar';");
}

// Replace the top structure
const regex = /<div className="min-h-screen w-full bg-transparent.*?relative">[\s\S]*?<main className=".*?">[\s\S]*?<motion\.div variants=\{fadeUp\} className="mb-12 mt-4 flex justify-center w-full">[\s\S]*?<\/motion\.div>[\s\S]*?\{\/\* BIG HOOK \*\/\}[\s\S]*?<motion\.div[\s\S]*?className="w-full text-center mb-16 md:mb-20 pt-8"[\s\S]*?>[\s\S]*?<h1 className=".*?">/;

const newBlock = \`<div className="min-h-screen w-full bg-transparent dark:bg-transparent text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      <Navbar />
      
      <main className="max-w-[1000px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-32 flex flex-col items-start w-full text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
        
        {/* HERO SECTION */}
        <div className="w-full flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 md:gap-16 mb-24 md:mb-32">
          
          {/* BIG HOOK TEXT (Left) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full md:w-1/2 text-left"
          >
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1] flex flex-wrap justify-start gap-x-2 gap-y-1 md:gap-x-3 mb-8">
\`;

content = content.replace(regex, newBlock);

fs.writeFileSync(file, content);
console.log("Updated hero section");
