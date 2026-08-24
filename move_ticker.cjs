const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const listMarkup = \`          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] py-2 text-neutral-500 text-base md:text-lg">
            <ul className="list-disc pl-4 flex flex-col gap-2">
              {aiLookList.map((item, index) => (
                <li key={index} className="leading-tight pl-1">{item}</li>
              ))}
            </ul>
          </motion.div>\`;

const oldTickerMarkup = \`          <motion.div variants={fadeUp} className="w-full mt-8 mb-6 overflow-hidden relative rounded-2xl">
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

const searchStr = \`\${listMarkup}

\${oldTickerMarkup}\`;

const newTickerMarkup = \`          <motion.div variants={fadeUp} className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-10 mb-12 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-4 md:gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[59, 60, 61, 62, 59, 60, 61, 62].map((num, i) => (
                <div key={i} className="w-[320px] md:w-[500px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 group relative">
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

const replacementStr = \`\${newTickerMarkup}

\${listMarkup}\`;

content = content.replace(searchStr, replacementStr);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Swapped list and ticker, and made ticker full viewport width.');
