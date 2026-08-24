const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const oldList = \`          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] flex flex-col gap-3 py-2 text-neutral-500 text-base md:text-lg">
            {aiLookList.map((item, index) => (
              <p key={index} className="leading-tight">{item}</p>
            ))}
          </motion.div>\`;

const newList = \`          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] py-2 text-neutral-500 text-base md:text-lg">
            <ul className="list-disc pl-4 flex flex-col gap-2">
              {aiLookList.map((item, index) => (
                <li key={index} className="leading-tight pl-1">{item}</li>
              ))}
            </ul>
          </motion.div>\`;

content = content.replace(oldList, newList);

const oldGallery = \`          <motion.div variants={fadeUp} className="w-full mt-6 mb-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[59, 60, 61, 62].map((num, i) => (
                <div key={num} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 group relative">
                  <img 
                    src={\`/slopexamples/Screenshot (\${num}).png\`}
                    alt={\`AI Slop Example \${i + 1}\`}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>\`;

const newGallery = \`          <motion.div variants={fadeUp} className="w-full mt-8 mb-6 overflow-hidden relative rounded-2xl">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-4 md:gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 15, repeat: Infinity }}
            >
              {[59, 60, 61, 62, 59, 60, 61, 62].map((num, i) => (
                <div key={i} className="w-[280px] md:w-[320px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 group relative">
                  <img 
                    src={\`/slopexamples/Screenshot (\${num}).png\`}
                    alt={\`AI Slop Example \${i + 1}\`}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </motion.div>\`;

content = content.replace(oldGallery, newGallery);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Updated to bullets and infinite ticker');
