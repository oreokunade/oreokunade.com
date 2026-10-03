const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

if (!content.includes('useDeferredValue')) {
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useDeferredValue, useMemo } from 'react';");
}

const oldGenBlock = `  const generatedPrompt = product.promptTemplate.replace(/\\[([^\\]]+)\\]/g, (match) => {
    const variable = product.promptVariables?.find(v => v.id === match);
    const rawVal = values[match];`;

const newGenBlock = `  const deferredValues = useDeferredValue(values);
  
  const generatedPrompt = useMemo(() => {
    return product.promptTemplate.replace(/\\[([^\\]]+)\\]/g, (match) => {
      const variable = product.promptVariables?.find(v => v.id === match);
      const rawVal = deferredValues[match];`;

const oldEndBlock = `    return rawVal || match;
  });

  const handleCopy = async () => {`;

const newEndBlock = `      return rawVal || match;
    });
  }, [product, deferredValues, colorModes, paletteLabels]);

  const handleCopy = async () => {`;

let modified = false;

if (content.includes(oldGenBlock)) {
    content = content.replace(oldGenBlock, newGenBlock);
    modified = true;
    console.log('Replaced gen block');
} else {
    console.log('Gen block not found');
}

if (content.includes(oldEndBlock)) {
    content = content.replace(oldEndBlock, newEndBlock);
    modified = true;
    console.log('Replaced end block');
} else {
    console.log('End block not found');
}

if (modified) {
    fs.writeFileSync('components/PromptModal.tsx', content);
    console.log('Successfully optimized PromptModal with useDeferredValue');
}
