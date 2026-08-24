const fs = require('fs');

// 1. Remove the "DESIGN ENGINEER ROADMAP" product from constants.ts
let constantsContent = fs.readFileSync('constants.ts', 'utf8');

const roadmapRegex = /\s*\{\s*id:\s*"design-engineer-roadmap"[\s\S]*?tags:\s*\["PDF",\s*"Career",\s*"Roadmap"\]\s*\},?/;
constantsContent = constantsContent.replace(roadmapRegex, '');

fs.writeFileSync('constants.ts', constantsContent);
console.log('Removed roadmap product from constants.ts');

// 2. Reduce the size of the hero text in EscapeAISlop.tsx
let escapeContent = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

escapeContent = escapeContent.replace(
  /<h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-\[1\.05\]">/,
  `<h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">`
);

fs.writeFileSync('pages/EscapeAISlop.tsx', escapeContent);
console.log('Reduced text size in EscapeAISlop.tsx');
