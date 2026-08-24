const fs = require('fs');
let content = fs.readFileSync('pages/EscapeAISlop.tsx', 'utf8');

// Replace the pill shape (rounded-full) with rounded-2xl (16px) on the buttons
content = content.replace(
  'rounded-full hover:scale-105 transition-transform text-lg w-full max-w-[320px]',
  'rounded-2xl hover:scale-105 transition-transform text-lg w-full max-w-[320px]'
);

// Check if there is another button in the CTA card and replace if it has rounded-xl or rounded-full
content = content.replace(
  'rounded-xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20',
  'rounded-2xl hover:scale-105 transition-transform w-full shadow-lg shadow-[#ff4306]/20'
);

fs.writeFileSync('pages/EscapeAISlop.tsx', content);
console.log('Updated button corner radiuses.');
