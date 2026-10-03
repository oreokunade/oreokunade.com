const fs = require('fs');
const content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
const lines = content.split('\n');
const start = lines.findIndex((l, i) => l.includes('} else {') && i < lines.length - 1 && lines[i+1].includes('<div className="flex flex-col gap-3">'));
for(let i = start; i < start + 25; i++) {
    console.log(lines[i]);
}
