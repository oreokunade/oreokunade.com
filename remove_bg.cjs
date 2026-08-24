const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the hardcoded backgrounds from the wrapper divs so the global body grid shows through
  content = content.replace(/bg-\[#fcfbf8\]/g, 'bg-transparent');
  content = content.replace(/bg-\[#FDFCFB\]/g, 'bg-transparent');
  content = content.replace(/dark:bg-\[#0a0a0a\]/g, 'dark:bg-transparent');

  fs.writeFileSync(filePath, content);
  console.log('Processed', file);
}
