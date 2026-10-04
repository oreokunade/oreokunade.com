const fs = require('fs');
const path = 'c:/Users/PC/Desktop/DE portfolio/pages/EscapeAISlop.tsx';
let content = fs.readFileSync(path, 'utf8');

// The original array block:
const searchRegex = /\[\s*\{\s*title:\s*"01[^\]]+\]/m;

// Let's replace the entire array
content = content.replace(/\[\s*\{\s*title:\s*"01[\s\S]*?\]/, [
                     { title: "01 — The Full Escape AI Slop Book", desc: "The complete system for going from idea to a polished website with AI, without settling for generic output.", value: "?20,000" },
                     { title: "02 — The Prompt Library", desc: "Ready-to-use prompts for ideating, generating, iterating, refining and building with AI.", value: "?15,000" },
                     { title: "03 — The Asset Resource Library", desc: "A curated list of resources for finding high-quality fonts, images, icons, illustrations, videos, 3D assets and more.", value: "?10,000" },
                     { 
                       title: "04 — Build With AI Community", 
                       desc: "Get access to the community where we build together every week.", 
                       value: "?25,000",
                       features: [
                         "Weekly live classes on building with AI",
                         "Live website reviews where I break down and critique community members' websites",
                         "Build sessions where we create new websites together from scratch",
                         "A community of people learning, building and sharing what they're working on"
                       ]
                     }
                   ]);

fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
