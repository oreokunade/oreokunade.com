const fs = require('fs');

let content = fs.readFileSync('pages/Home.tsx', 'utf8');

// The "What I Do" cards classes
const oldWhatIDoClass = "flex flex-col gap-4 p-6 md:p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/20 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors duration-500 h-full";
const newWhatIDoClass = "flex flex-col gap-4 p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full";
content = content.split(oldWhatIDoClass).join(newWhatIDoClass);

// The "Recent Work" cards classes
const oldRecentWorkClass = "flex flex-col p-8 md:p-10 rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-200/60 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 transition-colors duration-500 group";
const newRecentWorkClass = "flex flex-col p-8 md:p-10 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group";
content = content.split(oldRecentWorkClass).join(newRecentWorkClass);

fs.writeFileSync('pages/Home.tsx', content);
console.log('Updated homepage cards to match the crisp store card style');
