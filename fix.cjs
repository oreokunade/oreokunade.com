const fs = require('fs');
let content = fs.readFileSync('pages/Store.tsx', 'utf8');

const oldBlock = `                  target={product.promptTemplate ? undefined : "_blank"}\r
                  rel={product.promptTemplate ? undefined : "noopener noreferrer"}\r
                  onClick={(e) => {\r
                    if (product.promptTemplate) {\r
                      e.preventDefault();\r
                      setSelectedPrompt(product);\r
                    }\r
                  }}`;

const newBlock = `                  target={(!product.promptTemplate && !product.link?.startsWith('/')) ? "_blank" : undefined}\r
                  rel={(!product.promptTemplate && !product.link?.startsWith('/')) ? "noopener noreferrer" : undefined}\r
                  onClick={(e) => {\r
                    if (product.promptTemplate) {\r
                      e.preventDefault();\r
                      setSelectedPrompt(product);\r
                    } else if (product.link?.startsWith('/')) {\r
                      e.preventDefault();\r
                      navigate(product.link);\r
                    }\r
                  }}`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync('pages/Store.tsx', content);
    console.log('Replaced successfully');
} else {
    console.log('Block not found');
}
