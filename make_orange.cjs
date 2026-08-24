const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const ctaRegex = /\{\/\* CTA CARD \*\/\}(.|\n)*?<\/motion\.div>/;

const newCTABlock = \`{/* CTA CARD */}
          <motion.div id="checkout" variants={fadeUp} className="w-full bg-[#ff4306] text-white rounded-3xl p-8 md:p-12 flex flex-col items-center mt-20 shadow-xl text-left">
            <div className="text-center w-full mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Escape AI Slop</h2>
              <h3 className="text-lg md:text-xl font-medium text-white/80">Make your skill more valuable.</h3>
            </div>
            
            <div className="w-full mb-10 flex flex-col gap-8 max-w-3xl mx-auto px-4 md:px-0">
               <div className="flex flex-col gap-6">
                 {[
                   { title: "01 — The Full Escape AI Slop Book", desc: "The complete system for going from idea to a polished website with AI, without settling for generic output.", value: "₦15,000" },
                   { title: "02 — The Prompt Library", desc: "Ready-to-use prompts for ideating, generating, iterating, refining and building with AI.", value: "₦10,000" },
                   { title: "03 — The DESIGN.md Framework", desc: "A practical system for giving AI a visual source of truth and keeping your website consistent as you build and iterate.", value: "₦10,000" },
                   { title: "04 — The Asset Resource Library", desc: "A curated list of resources for finding high-quality fonts, images, icons, illustrations, videos, 3D assets and more.", value: "₦5,000" },
                   { title: "05 — The AI Slop Checklist", desc: "A practical checklist for spotting the generic patterns AI keeps falling back on and knowing what to fix.", value: "₦5,000" },
                   { title: "06 — Build With AI Community", desc: "Get access to the community where we build together every week.", value: "₦25,000" }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 pb-6 border-b border-white/20 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
                        <h4 className="text-lg md:text-xl font-bold text-white">{item.title}</h4>
                        <span className="text-sm font-semibold px-3 py-1 bg-white/20 rounded-full whitespace-nowrap text-white w-fit">Value: {item.value}</span>
                      </div>
                      <p className="text-white/90 leading-relaxed">{item.desc}</p>
                    </div>
                 ))}
               </div>

               <div className="w-full mt-4 pt-8 border-t border-white/20">
                 <h4 className="text-lg font-bold mb-6 text-white">You'll get:</h4>
                 <ul className="flex flex-col gap-4">
                   {[
                     "Weekly live classes on building with AI",
                     "Live website reviews where I break down and critique community members' websites",
                     "Build sessions where we create new websites together from scratch",
                     "A community of people learning, building and sharing what they're working on"
                   ].map((feature, i) => (
                      <li key={i} className="flex gap-4 text-sm md:text-base text-white/90 leading-relaxed items-start">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#ff4306]"></div>
                        </div>
                        {feature}
                      </li>
                   ))}
                 </ul>
               </div>
            </div>

            <div className="w-full text-center mb-8 flex flex-col gap-2 text-white/90 text-lg md:text-xl font-medium">
              <p>You're not just buying a book.</p>
              <p>You're getting the playbook, tools, resources and community to actually put it into practice.</p>
            </div>

            <div className="w-full flex flex-col items-center gap-2 mb-10">
              <p className="text-white/70 line-through text-lg">Total Value: ₦70,000</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tight text-white">₦7,500</span>
                <span className="text-white/80 text-lg">pre-order</span>
              </div>
              <p className="text-white font-semibold mt-2 bg-black/10 px-4 py-2 rounded-full text-sm md:text-base">
                Price increases to ₦10,000 after launch.
              </p>
            </div>
            
            <a href="#" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#ff4306] text-xl font-extrabold rounded-2xl hover:scale-105 transition-transform w-full shadow-xl shadow-black/10">
              Pre-order now
            </a>
          </motion.div>\`;

content = content.replace(ctaRegex, newCTABlock);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Updated CTA card to be completely orange with white high-contrast text and a white button.');
