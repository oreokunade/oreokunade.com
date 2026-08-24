const fs = require('fs');
let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

// We will replace the simple h1 in the Hero section with a staggered word reveal
const oldH1 = `<h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                AI can build a website in minutes.<br />
                <span className="text-neutral-400 dark:text-neutral-500">So why do most AI websites look the same?</span>
              </h1>`;

const newH1 = `{/* Custom Text Reveal */}
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05] flex flex-wrap gap-x-3 gap-y-1">
                {"AI can build a website in minutes.".split(" ").map((word, i) => (
                  <motion.span 
                    key={i} 
                    className="text-neutral-900 dark:text-white"
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
                    className="text-neutral-400 dark:text-neutral-500"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>`;

content = content.replace(oldH1, newH1);

// Also let's update stagger to be slightly faster for words
const oldStagger = `  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };`;

const newStagger = `  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };`;

content = content.replace(oldStagger, newStagger);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Added text reveal animation');
