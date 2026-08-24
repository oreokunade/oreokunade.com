const fs = require('fs');
let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const newMainContent = `      <main className="max-w-[700px] mx-auto px-6 md:px-8 pt-24 pb-32 flex flex-col items-start w-full text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
        
        {/* BIG HOOK */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full text-center mb-16 md:mb-20 pt-8"
        >
          {/* Custom Text Reveal */}
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1] flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3">
            {"AI can build a website in minutes.".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}
            <span className="w-full h-0 basis-full"></span>
            {"So why do most AI websites look the same?".split(" ").map((word, i) => (
              <motion.span 
                key={i + 100} 
                className="text-neutral-400 dark:text-neutral-500 font-normal"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* BODY START */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="w-full flex flex-col gap-6 md:gap-8"
        >
          <motion.p variants={fadeUp}>
            <strong className="text-neutral-900 dark:text-white font-medium">Escape AI Slop</strong> is a practical guide for designers, developers, and founders who want to use AI to build websites with intention, taste, and a point of view.
          </motion.p>
          
          <motion.p variants={fadeUp} className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-white mt-6">
            You can generate a website in 30 seconds.<br/>
            <span className="text-neutral-500 font-normal">Making it look intentional and professional is the hard part.</span>
          </motion.p>
          
          <motion.p variants={fadeUp}>
            You've probably already tried Lovable, Bolt, Cursor, v0 or another AI builder. The website works. The sections are there. But somehow, it still looks like an AI-generated website.
          </motion.p>
          
          <motion.div variants={fadeUp} className="pl-6 border-l-[3px] border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 py-2 italic text-neutral-500">
            <p>The same gradients.</p>
            <p>The same rounded cards.</p>
            <p>The same giant hero text.</p>
            <p>The same generic layouts.</p>
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium text-xl md:text-2xl mt-4">
            That's AI slop.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            And you don't need to become a senior designer or learn how to code from scratch to escape it.
          </motion.p>
          
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium">
            This book gives you the system.
          </motion.p>
          
          <motion.p variants={fadeUp}>
            I’ll show you how I approach building websites with AI as a product designer, using one real project from start to finish.
          </motion.p>

          <motion.div variants={fadeUp} className="my-16 flex justify-center w-full">
             <img 
                src="/products/escape-ai-slop.png" 
                alt="Escape AI Slop Cover" 
                className="w-full max-w-[400px] h-auto object-contain mix-blend-multiply dark:mix-blend-lighten shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none rounded-sm"
                fetchPriority="high"
             />
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-8 mb-6">
            You'll learn how to:
          </motion.h2>
          
          {[
            { step: "01 \u2014 IDEATE", desc: "Figure out what you're actually trying to build before opening your AI tool." },
            { step: "02 \u2014 GENERATE", desc: "Create a DESIGN.md and master prompt that give AI actual creative and technical direction instead of a blank canvas." },
            { step: "03 \u2014 ITERATE", desc: "Know what to change when the first version isn't right, use reference screenshots to guide layouts, and make controlled section-by-section improvements without destroying what already works." },
            { step: "04 \u2014 SYSTEMIZE", desc: "Turn the decisions you're making into a repeatable system you can use across future projects." },
            { step: "05 \u2014 DEPLOY", desc: "Take what you've built and actually get it out into the world." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-1 mb-6">
              <span className="font-semibold text-neutral-900 dark:text-white tracking-tight">{item.step}</span>
              <p>{item.desc}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="w-full flex flex-col items-center text-center mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-900 dark:text-white font-medium text-2xl md:text-3xl">
              You're not buying another prompt.<br/>
              <span className="text-neutral-500 font-normal">You're learning how to think before you prompt.</span>
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="py-12 flex flex-col items-center text-center w-full">
            <p>Because the difference between:</p>
            <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-8">"AI built my website."</p>
            <p>and</p>
            <p className="text-neutral-900 dark:text-white italic font-serif text-3xl md:text-4xl my-8">"I designed this website with AI."</p>
            <p>isn't the tool.</p>
            <p className="text-neutral-900 dark:text-white font-medium mt-6 text-xl">It's the system behind it.</p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-2 pb-16 mb-16 border-b border-neutral-200 dark:border-neutral-800 w-full">
            <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl tracking-tight mb-8 leading-tight">Build better. Move faster.<br/>Stop shipping slop.</p>
            <a href="#checkout" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform text-lg w-full max-w-[320px]">
              Get Escape AI Slop <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <p>Maybe you're a designer trying to add development to your skillset.</p>
            <p>Maybe you're a developer trying to become faster.</p>
            <p>Maybe you're a founder building your own product.</p>
            <p>Maybe you're a student or fresh graduate looking for a skill that can actually give you an edge.</p>
            <p>Maybe you're thinking, "I need to learn this before everyone else does."</p>
            
            <p className="mt-6 text-neutral-900 dark:text-white font-medium">Or maybe you've already started building with AI...</p>
            <p>...but you're not sure you're building well.</p>
            <p>Because there's something you can't quite ignore.</p>
            
            <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl mt-6 tracking-tight">You can build.</p>
          </motion.div>

          {/* CTA CARD */}
          <motion.div id="checkout" variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl p-8 md:p-12 flex flex-col items-center text-center mt-20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Escape AI Slop</h2>
            <h3 className="text-lg md:text-xl font-medium text-neutral-400 dark:text-neutral-500 mb-8">Make your skill more valuable.</h3>
            
            <div className="bg-white/10 dark:bg-black/5 rounded-2xl p-6 md:p-8 w-full mb-8 border border-white/10 dark:border-black/10 text-left flex flex-col gap-2">
               <h4 className="text-xl md:text-2xl font-bold mb-2">Pre-order Access</h4>
               <p className="text-sm md:text-base text-neutral-400 dark:text-neutral-600 mb-6">The book + asset library + AI playbook + community.</p>
               
               <div className="flex flex-col md:flex-row justify-between gap-4 border-t border-white/20 dark:border-black/20 pt-6">
                 <div className="flex flex-col gap-1">
                   <span className="text-base font-medium text-neutral-300 dark:text-neutral-700">Early Bird Pricing</span>
                   <span className="text-xs text-neutral-500">Instant access to materials.</span>
                 </div>
                 <div className="flex flex-col md:items-end">
                   <span className="text-xs font-medium text-neutral-500 line-through mb-1">Standard: ₦15,000</span>
                   <span className="text-3xl md:text-4xl font-bold tracking-tight">₦7,500</span>
                 </div>
               </div>
            </div>

            <a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-black text-black dark:text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform w-full">
              GET ACCESS NOW
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

        </motion.div>
      </main>`;

const mainRegex = /<main className="max-w-\[1400px\] mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col gap-16 md:gap-24">[\s\S]*?<\/main>/;

content = content.replace(mainRegex, newMainContent);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Replaced layout to match Refactoring UI single-column aesthetic');
