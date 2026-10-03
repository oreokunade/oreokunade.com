const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldBlock = `                              <button
                                onClick={() => setColorModes(prev => ({ ...prev, [variable.id]: 'vibe' }))}
                                className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-colors \${mode === 'vibe' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'}\`}
                              >
                                Generate for me
                              </button>`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, '');
    fs.writeFileSync('components/PromptModal.tsx', content);
    console.log('Removed button successfully');
} else {
    console.log('Block not found');
}
