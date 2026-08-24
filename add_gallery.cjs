const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const targetStr = `          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-[#ff4306] flex flex-col gap-3 py-2 text-neutral-500 text-base md:text-lg">
            {aiLookList.map((item, index) => (
              <p key={index} className="leading-tight">{item}</p>
            ))}
          </motion.div>`;

const replacementStr = `${targetStr}

          <motion.div variants={fadeUp} className="w-full mt-6 mb-2">
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
          </motion.div>`;

content = content.replace(targetStr, replacementStr);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Added screenshot gallery');
