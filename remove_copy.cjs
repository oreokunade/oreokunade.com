const fs = require('fs');
let content = fs.readFileSync('pages/Store.tsx', 'utf8');

// Normalize for searching
content = content.replace(/\r\n/g, '\n');

const oldBlock = `                      {/* Copy icon for Prompt Templates, Arrow for others */}
                      {product.tags.includes('Prompts') ? (
                        <CopyButton text={product.description} />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0">
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      )}`;

const newBlock = `                      {/* Arrow icon for all products */}
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0">
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                      </div>`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync('pages/Store.tsx', content);
    console.log('Replaced successfully');
} else {
    console.log('Block not found');
}
