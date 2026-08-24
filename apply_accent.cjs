const fs = require('fs');
let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

// 1. Accent the "Escape AI Slop" strong text in the first paragraph
content = content.replace(
  '<strong className="text-neutral-900 dark:text-white font-medium">Escape AI Slop</strong>',
  '<strong className="text-[#ff4306] font-semibold">Escape AI Slop</strong>'
);

// 2. Change the left border of the slop examples to the accent color
content = content.replace(
  '<motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 py-2 italic text-neutral-500">',
  '<motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] flex flex-col gap-2 py-2 italic text-neutral-500">'
);

// 3. Change the step numbering color to the accent color
content = content.replace(
  '<span className="font-semibold text-neutral-900 dark:text-white tracking-tight">{item.step}</span>',
  '<span className="font-bold text-[#ff4306] tracking-tight">{item.step}</span>'
);

// 4. Change the "Get Escape AI Slop" button to accent color
content = content.replace(
  '<a href="#checkout" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform text-lg w-full max-w-[320px]">',
  '<a href="#checkout" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#ff4306] text-white font-semibold rounded-full hover:scale-105 transition-transform text-lg w-full max-w-[320px]">'
);

// 5. Change the final CTA button to accent color
content = content.replace(
  '<a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-black text-black dark:text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform w-full">',
  '<a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ff4306] text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20">'
);

// 6. Highlight the big "Build better. Move faster. Stop shipping slop."
// Actually let's color "Stop shipping slop."
content = content.replace(
  '<p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl tracking-tight mb-8 leading-tight">Build better. Move faster.<br/>Stop shipping slop.</p>',
  '<p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl tracking-tight mb-8 leading-tight">Build better. Move faster.<br/><span className="text-[#ff4306]">Stop shipping slop.</span></p>'
);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Applied #ff4306 accents');
