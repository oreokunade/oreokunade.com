const fs = require('fs');
const file = 'c:/Users/PC/Desktop/DE Portfolio/pages/EscapeAISlop.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="w-full mb-10 flex flex-col gap-8 max-w-3xl mx-auto px-4 md:px-0">([\s\S]*?)<\/ul>\s*<\/div>\s*<\/div>/;

const newBlock = \`<div className="w-full mb-10 flex flex-col gap-8 max-w-3xl mx-auto px-4 md:px-0">
               <div className="flex flex-col gap-6">
                 {[
                   { title: "01 — The Full Escape AI Slop Book", desc: "The complete system for going from idea to a polished website with AI, without settling for generic output.", value: "₦15,000" },
                   { title: "02 — The Prompt Library", desc: "Ready-to-use prompts for ideating, generating, iterating, refining and building with AI.", value: "₦10,000" },
                   { title: "03 — The DESIGN.md Framework", desc: "A practical system for giving AI a visual source of truth and keeping your website consistent as you build and iterate.", value: "₦10,000" },
                   { title: "04 — The Asset Resource Library", desc: "A curated list of resources for finding high-quality fonts, images, icons, illustrations, videos, 3D assets and more.", value: "₦5,000" },
                   { title: "05 — The AI Slop Checklist", desc: "A practical checklist for spotting the generic patterns AI keeps falling back on and knowing what to fix.", value: "₦5,000" },
                   { 
                     title: "06 — Build With AI Community", 
                     desc: "Get access to the community where we build together every week.", 
                     value: "₦25,000",
                     features: [
                       "Weekly live classes on building with AI",
                       "Live website reviews where I break down and critique community members' websites",
                       "Build sessions where we create new websites together from scratch",
                       "A community of people learning, building and sharing what they're working on"
                     ]
                   }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4">
                        <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                        <span className="text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#ff4306] rounded-lg whitespace-nowrap text-white w-fit shadow-sm">Value: {item.value}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                      
                      {item.features && (
                        <div className="mt-4">
                          <h4 className="font-bold mb-3 text-[#ff4306]">You'll get:</h4>
                          <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-[#ff4306]">
                            {item.features.map((feature, j) => (
                              <li key={j} className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed pl-1">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                 ))}
               </div>
            </div>\`;

content = content.replace(regex, newBlock);
fs.writeFileSync(file, content);
console.log("Updated list");
