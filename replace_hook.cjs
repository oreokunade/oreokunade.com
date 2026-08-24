const fs = require('fs');

let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

const oldHook = `{"AI can build a website in minutes.".split(" ").map((word, i) => (
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
            ))}`;

const newHook = `{"Learn how to build clean and professional websites with AI.".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}`;

content = content.replace(oldHook, newHook);
fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Hook replaced.');
