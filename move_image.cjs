const fs = require('fs');
const path = require('path');

const filePath = path.join('pages', 'EscapeAISlop.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const imageBlockRegex = /\s*<motion\.div variants=\{fadeUp\} className="my-16 flex justify-center w-full">\s*<img\s*src="\/products\/escape-ai-slop\.png"[\s\S]*?\/>\s*<\/motion\.div>/;

// Extract the image block
const match = content.match(imageBlockRegex);
if (match) {
    let imageBlock = match[0];
    
    // Remove it from its current position
    content = content.replace(imageBlockRegex, '');
    
    // Modify its classes slightly for the top position
    imageBlock = imageBlock.replace('my-16', 'mb-12 mt-4').replace('max-w-[400px]', 'max-w-[300px] md:max-w-[400px]');
    
    // Insert it before BIG HOOK
    const hookMarker = '{/* BIG HOOK */}';
    content = content.replace(hookMarker, imageBlock + '\n\n        ' + hookMarker);
    
    fs.writeFileSync(filePath, content);
    console.log('Successfully moved image to top.');
} else {
    console.log('Image block not found.');
}
