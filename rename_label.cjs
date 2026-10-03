const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

const oldLabel = '"Primary Brand Color OR Vibe"';
const newLabel = '"Primary brand colour or palette"';

if (content.includes(oldLabel)) {
    content = content.replaceAll(oldLabel, newLabel);
    fs.writeFileSync('constants.ts', content);
    console.log('Replaced successfully');
} else {
    console.log('String not found');
}
