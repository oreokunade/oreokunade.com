const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const oldCTABlock = \`          {/* CTA CARD */}
          <motion.div id="checkout" variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-8 md:p-12 flex flex-col items-center text-center mt-20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Escape AI Slop</h2>
            <h3 className="text-lg md:text-xl font-medium text-neutral-400 dark:text-neutral-500 mb-8">Make your skill more valuable.</h3>
            
            <div className="bg-white/10 dark:bg-black/5 rounded-2xl p-6 md:p-8 w-full mb-8 border border-white/10 dark:border-black/10 text-left flex flex-col gap-2">
               <h4 className="text-xl md:text-2xl font-bold mb-2">Pre-order Access</h4>
               <p className="text-sm md:text-base text-neutral-400 dark:text-neutral-600 mb-6">The book + asset library + AI playbook + community.</p>

               <ul className="flex flex-col gap-3 mb-6">
                 {["The complete 5-step system", "Master prompt templates", "Real project case study"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm md:text-base text-neutral-200 dark:text-neutral-800">
                      <div className="w-5 h-5 rounded-full bg-[#ff4306]/20 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#ff4306]"></div>
                      </div>
                      {feature}
                    </li>
                 ))}
               </ul>
            </div>
            
            <a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ff4306] text-white text-lg font-bold rounded-2xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20">
              Pre-order now
            </a>
          </motion.div>\`;

const newCTABlock = \`          {/* CTA CARD */}
          <motion.div id="checkout" variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-8 md:p-12 flex flex-col items-center mt-20 shadow-xl text-left">
            <div className="text-center w-full mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Escape AI Slop</h2>
              <h3 className="text-lg md:text-xl font-medium text-neutral-400 dark:text-neutral-500">Make your skill more valuable.</h3>
            </div>
            
            <div className="bg-white/5 dark:bg-black/5 rounded-3xl p-6 md:p-10 w-full mb-10 border border-white/10 dark:border-black/10 flex flex-col gap-8">
               <div className="flex flex-col gap-6">
                 {[
                   { title: "01 — The Full Escape AI Slop Book", desc: "The complete system for going from idea to a polished website with AI, without settling for generic output." },
                   { title: "02 — The Prompt Library", desc: "Ready-to-use prompts for ideating, generating, iterating, refining and building with AI." },
                   { title: "03 — The DESIGN.md Framework", desc: "A practical system for giving AI a visual source of truth and keeping your website consistent as you build and iterate." },
                   { title: "04 — The Asset Resource Library", desc: "A curated list of resources for finding high-quality fonts, images, icons, illustrations, videos, 3D assets and more." },
                   { title: "05 — The AI Slop Checklist", desc: "A practical checklist for spotting the generic patterns AI keeps falling back on and knowing what to fix." },
                   { title: "06 — Build With AI Community", desc: "Get access to the community where we build together every week." }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5 pb-6 border-b border-white/10 dark:border-black/10 last:border-0 last:pb-0">
                      <h4 className="text-lg md:text-xl font-bold text-white dark:text-black">{item.title}</h4>
                      <p className="text-neutral-400 dark:text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                 ))}
               </div>

               <div className="w-full bg-[#ff4306]/10 rounded-2xl p-6 md:p-8 border border-[#ff4306]/20 mt-4">
                 <h4 className="text-lg font-bold mb-4 text-[#ff4306]">You'll get:</h4>
                 <ul className="flex flex-col gap-3">
                   {[
                     "Weekly live classes on building with AI",
                     "Live website reviews where I break down and critique community members' websites",
                     "Build sessions where we create new websites together from scratch",
                     "A community of people learning, building and sharing what they're working on"
                   ].map((feature, i) => (
                      <li key={i} className="flex gap-3 text-sm md:text-base text-neutral-300 dark:text-neutral-700 leading-relaxed items-start">
                        <div className="w-5 h-5 rounded-full bg-[#ff4306]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#ff4306]"></div>
                        </div>
                        {feature}
                      </li>
                   ))}
                 </ul>
               </div>
            </div>

            <div className="w-full text-center mb-8 flex flex-col gap-2 text-neutral-300 dark:text-neutral-700 text-lg md:text-xl font-medium">
              <p>You're not just buying a book.</p>
              <p>You're getting the playbook, tools, resources and community to actually put it into practice.</p>
            </div>
            
            <a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#ff4306] text-white text-xl font-bold rounded-2xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20">
              Pre-order now
            </a>
          </motion.div>\`;

content = content.replace(oldCTABlock, newCTABlock);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Expanded CTA block to a full sales-style value stack.');
