const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldInputBlock = `                          <input
                            type="text"
                            placeholder={variable.placeholder}
                            value={values[variable.id] || ''}
                            onChange={(e) => handleInputChange(variable.id, e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all"
                          />`;

const newInputBlock = `                          {variable.type === 'textarea' ? (
                            <textarea
                              placeholder={variable.placeholder}
                              value={values[variable.id] || ''}
                              onChange={(e) => handleInputChange(variable.id, e.target.value)}
                              rows={6}
                              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all resize-y"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder={variable.placeholder}
                              value={values[variable.id] || ''}
                              onChange={(e) => handleInputChange(variable.id, e.target.value)}
                              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 text-neutral-900 dark:text-white transition-all"
                            />
                          )}`;

if (content.includes(oldInputBlock)) {
    content = content.replace(oldInputBlock, newInputBlock);
    fs.writeFileSync('components/PromptModal.tsx', content);
    console.log('Added textarea support to PromptModal');
} else {
    console.log('Could not find input block');
}
