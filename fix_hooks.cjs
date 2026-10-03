const fs = require('fs');
let content = fs.readFileSync('components/PromptModal.tsx', 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldCode = `  if (!product || !product.promptTemplate) return null;

  const handleInputChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const extractHexColors = (text: string) => {
    if (!text) return [];
    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b/gi;
    const matches = text.match(hexRegex);
    return matches ? Array.from(new Set(matches)) : []; // unique colors
  };

  const deferredValues = useDeferredValue(values);
  
  const generatedPrompt = useMemo(() => {
    return product.promptTemplate.replace(/\\[([^\\]]+)\\]/g, (match) => {
      const variable = product.promptVariables?.find(v => v.id === match);`;

const newCode = `  const deferredValues = useDeferredValue(values);
  
  const extractHexColors = (text: string) => {
    if (!text) return [];
    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b/gi;
    const matches = text.match(hexRegex);
    return matches ? Array.from(new Set(matches)) : []; // unique colors
  };

  const generatedPrompt = useMemo(() => {
    if (!product || !product.promptTemplate) return '';
    return product.promptTemplate.replace(/\\[([^\\]]+)\\]/g, (match) => {
      const variable = product.promptVariables?.find(v => v.id === match);`;

const oldInputBlock = `      return rawVal || match;
    });
  }, [product, deferredValues, colorModes, paletteLabels]);

  const handleCopy = async () => {`;

const newInputBlock = `      return rawVal || match;
    });
  }, [product, deferredValues, colorModes, paletteLabels]);

  if (!product || !product.promptTemplate) return null;

  const handleInputChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleCopy = async () => {`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    content = content.replace(oldInputBlock, newInputBlock);
    fs.writeFileSync('components/PromptModal.tsx', content);
    console.log('Fixed hooks order');
} else {
    console.log('Could not find code block');
}
