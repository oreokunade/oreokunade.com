const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

// 1. Center the "This process is the difference between:" sentence
const oldDifferenceBlock = \`          <motion.div variants={fadeUp} className="w-full flex flex-col mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <p className="mb-8">This process is the difference between:</p>
            <div className="flex flex-col items-center text-center w-full pb-16 border-b border-neutral-200 dark:border-neutral-800">
              <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-6">"AI built my website."</p>\`;

const newDifferenceBlock = \`          <motion.div variants={fadeUp} className="w-full flex flex-col mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center text-center w-full pb-16 border-b border-neutral-200 dark:border-neutral-800">
              <p className="mb-8">This process is the difference between:</p>
              <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-6">"AI built my website."</p>\`;

content = content.replace(oldDifferenceBlock, newDifferenceBlock);

// 2. Center the "This guide is for you" paragraphs
const oldGuideBlock = \`            <p className="mt-8">Maybe you're thinking, "I need to learn this before everyone else does."</p>
            <p>Or maybe you've already started building with AI...but you just can't place what you're getting wrong.</p>
            
            <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl mt-6 tracking-tight mb-8">This guide is for you.</p>\`;

const newGuideBlock = \`            <div className="w-full flex flex-col items-center text-center mt-8">
              <p className="mb-4">Maybe you're thinking, "I need to learn this before everyone else does."</p>
              <p className="mb-2">Or maybe you've already started building with AI...but you just can't place what you're getting wrong.</p>
              
              <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl mt-6 tracking-tight mb-8">This guide is for you.</p>
            </div>\`;

content = content.replace(oldGuideBlock, newGuideBlock);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Centered text sections successfully.');
