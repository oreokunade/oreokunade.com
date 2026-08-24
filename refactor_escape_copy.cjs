const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const newMainContent = `      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col gap-16 md:gap-24">
        
        {/* SECTION 1: HERO */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4 lg:pt-12 max-w-[1200px] mx-auto w-full"
        >
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                AI can build a website in minutes.<br />
                <span className="text-neutral-400 dark:text-neutral-500">So why do most AI websites look the same?</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
              <p>
                <strong className="text-neutral-900 dark:text-white font-bold">Escape AI Slop</strong> is a practical guide for designers, developers, and founders who want to use AI to build websites with intention, taste, and a point of view.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-[500px]">
                <img 
                  src="/products/escape-ai-slop.png" 
                  alt="Escape AI Slop Cover" 
                  className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-lighten"
                  fetchPriority="high"
                  decoding="async"
                />
             </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: THE PROBLEM */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger} 
          className="max-w-[800px] mx-auto w-full flex flex-col gap-8 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed pt-12 md:pt-20"
        >
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium text-2xl md:text-3xl leading-snug">
            You can generate a website in 30 seconds.<br/>
            <span className="text-neutral-500">Making it look intentional is the hard part.</span>
          </motion.p>
          <motion.p variants={fadeUp}>
            You've probably already tried Lovable, Bolt, Cursor, v0 or another AI builder. The website works. The sections are there. But somehow, it still looks like an AI-generated website.
          </motion.p>
          <motion.div variants={fadeUp} className="pl-6 md:pl-8 border-l-2 border-neutral-200 dark:border-neutral-800 flex flex-col gap-3 py-4 text-lg md:text-xl">
            <p>The same gradients.</p>
            <p>The same rounded cards.</p>
            <p>The same giant hero text.</p>
            <p>The same generic layouts.</p>
          </motion.div>
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium">
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
        </motion.section>

        {/* SECTION 3: THE PROCESS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger} 
          className="max-w-[800px] mx-auto w-full flex flex-col gap-12 pt-12 md:pt-20 border-t border-neutral-200 dark:border-neutral-800"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            You'll learn how to:
          </motion.h2>
          
          <div className="flex flex-col gap-12 md:gap-16">
            {[
              { step: "01", title: "IDEATE", desc: "Figure out what you're actually trying to build before opening your AI tool." },
              { step: "02", title: "GENERATE", desc: "Create a DESIGN.md and master prompt that give AI actual creative and technical direction instead of a blank canvas." },
              { step: "03", title: "ITERATE", desc: "Know what to change when the first version isn't right, use reference screenshots to guide layouts, and make controlled section-by-section improvements without destroying what already works." },
              { step: "04", title: "SYSTEMIZE", desc: "Turn the decisions you're making into a repeatable system you can use across future projects." },
              { step: "05", title: "DEPLOY", desc: "Take what you've built and actually get it out into the world." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start group">
                <span className="text-sm font-bold tracking-widest text-neutral-400 dark:text-neutral-500 mt-1 md:w-32 shrink-0 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{item.step} — {item.title}</span>
                <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 font-light flex-1 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: THE MINDSET SHIFT */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger} 
          className="max-w-[800px] mx-auto w-full flex flex-col gap-8 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed pt-12 md:pt-20 text-center"
        >
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-medium">
            You're not buying another prompt.<br/>
            You're learning how to think before you prompt.
          </motion.p>
          
          <motion.div variants={fadeUp} className="py-8 md:py-12 flex flex-col items-center">
            <p>Because the difference between:</p>
            <p className="text-neutral-900 dark:text-white italic font-serif text-2xl md:text-3xl my-6">"AI built my website."</p>
            <p>and</p>
            <p className="text-neutral-900 dark:text-white italic font-serif text-2xl md:text-3xl my-6">"I designed this website with AI."</p>
            <p>isn't the tool.</p>
            <p className="text-neutral-900 dark:text-white font-medium mt-6 text-2xl">It's the system behind it.</p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-8 pb-16 border-b border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-900 dark:text-white font-bold text-3xl md:text-4xl tracking-tight uppercase">Build better. Move faster.<br/>Stop shipping slop.</p>
            <a href="#checkout" className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-xl">
              Get Escape AI Slop <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.section>

        {/* SECTION 5: WHO IS IT FOR? */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger} 
          className="max-w-[800px] mx-auto w-full flex flex-col gap-6 text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed pt-12 pb-12"
        >
          <motion.p variants={fadeUp}>Maybe you're a designer trying to add development to your skillset.</motion.p>
          <motion.p variants={fadeUp}>Maybe you're a developer trying to become faster.</motion.p>
          <motion.p variants={fadeUp}>Maybe you're a founder building your own product.</motion.p>
          <motion.p variants={fadeUp}>Maybe you're a student or fresh graduate looking for a skill that can actually give you an edge.</motion.p>
          <motion.p variants={fadeUp}>Maybe you're thinking, “I need to learn this before everyone else does.”</motion.p>
          
          <motion.p variants={fadeUp} className="mt-8 text-neutral-700 dark:text-neutral-300">Or maybe you've already started building with AI...</motion.p>
          <motion.p variants={fadeUp} className="text-neutral-700 dark:text-neutral-300">...but you're not sure you're building well.</motion.p>
          <motion.p variants={fadeUp} className="text-neutral-700 dark:text-neutral-300">Because there's something you can't quite ignore.</motion.p>
          
          <motion.p variants={fadeUp} className="text-neutral-900 dark:text-white font-bold text-4xl md:text-5xl mt-6 tracking-tight uppercase">You can build.</motion.p>
        </motion.section>

        {/* SECTION 6: CTA CARD */}
        <motion.section 
          id="checkout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-[1200px] mx-auto w-full flex flex-col gap-16 pt-8"
        >
          <motion.div variants={fadeUp} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center text-center shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase leading-tight">Escape AI Slop</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-400 dark:text-neutral-500 mb-10 uppercase tracking-tight">Make your skill more valuable.</h3>
            
            <div className="bg-white/10 dark:bg-black/5 rounded-3xl p-8 md:p-10 w-full max-w-3xl mb-12 border border-white/10 dark:border-black/10 text-left flex flex-col gap-2">
               <h4 className="text-3xl font-bold mb-2">Pre-order Access</h4>
               <p className="text-base text-neutral-400 dark:text-neutral-600 mb-8 font-medium">The book + asset library + AI building playbook + community + ongoing updates.</p>
               
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/20 dark:border-black/20 pt-8 mt-2">
                 <div className="flex flex-col gap-1">
                   <span className="text-lg font-medium text-neutral-300 dark:text-neutral-700">Early Bird Pricing</span>
                   <span className="text-sm text-neutral-500">Instant access to all current materials.</span>
                 </div>
                 <div className="flex flex-col items-start sm:items-end">
                   <span className="text-sm font-medium text-neutral-500 line-through mb-1">Standard: ₦15,000</span>
                   <span className="text-4xl md:text-5xl font-bold tracking-tight">₦7,500</span>
                 </div>
               </div>
            </div>

            <a href="#" className="group inline-flex items-center gap-3 px-12 py-6 bg-white dark:bg-black text-black dark:text-white text-xl font-bold rounded-2xl hover:scale-105 transition-transform w-full max-w-3xl justify-center shadow-xl">
              GET ACCESS NOW
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.section>

      </main>`;

const mainRegex = /<main className="max-w-\[1400px\] mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col gap-24 md:gap-32">[\s\S]*?<\/main>/;

content = content.replace(mainRegex, newMainContent);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Replaced main content with new sales copy flow');
