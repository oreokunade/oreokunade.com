const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

// Normalize line endings for reliable matching
content = content.replace(/\r\n/g, '\n');

const oldPromptTemplateBlock = `I want to build a **[Project Type]** for **[Target Audience]**.

The primary goal of this website is **[Primary Goal]**.

The website should communicate **[Brand Personality / Positioning]** and have a **[Vibe / Aesthetic]** visual direction.

My brand colours are:

**Primary:** [Primary Hex]

**Secondary:** [Secondary Hex]

**Background:** [Background Hex]

**Text:** [Text Hex]

Use these colours intentionally across the interface rather than applying them uniformly.`;

const newPromptTemplateBlock = `I want to build a **[Project Type]** for **[Target Audience]**.

The primary goal of this website is **[Primary Goal]**.

The brand name is **[Brand Name]**.

[Color Context]

Use colours intentionally across the interface rather than applying them uniformly.`;

content = content.replace(oldPromptTemplateBlock, newPromptTemplateBlock);


const oldVariablesBlock = `    promptVariables: [
      { id: "[Project Type]", label: "What are you building?", placeholder: "e.g. portfolio website, SaaS dashboard" },
      { id: "[Target Audience]", label: "Target Audience", placeholder: "e.g. creative professionals, enterprise clients" },
      { id: "[Primary Goal]", label: "Primary Goal", placeholder: "e.g. convert visitors to newsletter subscribers" },
      { id: "[Brand Personality / Positioning]", label: "Brand Personality", placeholder: "e.g. minimalist and high-end" },
      { id: "[Vibe / Aesthetic]", label: "Visual Vibe", placeholder: "e.g. dark mode brutalism" },
      { id: "[Primary Hex]", label: "Primary Brand Color (Hex)", placeholder: "e.g. #ff4306" },
      { id: "[Secondary Hex]", label: "Secondary Color (Hex)", placeholder: "e.g. #111111" },
      { id: "[Background Hex]", label: "Background Color (Hex)", placeholder: "e.g. #0a0a0a" },
      { id: "[Text Hex]", label: "Text Color (Hex)", placeholder: "e.g. #ffffff" }
    ]`;

const newVariablesBlock = `    promptVariables: [
      { id: "[Project Type]", label: "What are you building?", placeholder: "e.g. portfolio website, SaaS dashboard" },
      { id: "[Target Audience]", label: "Target Audience", placeholder: "e.g. creative professionals, enterprise clients" },
      { id: "[Primary Goal]", label: "Primary Goal", placeholder: "e.g. convert visitors to newsletter subscribers" },
      { id: "[Brand Name]", label: "Brand Name", placeholder: "e.g. Acme Corp" },
      { id: "[Color Context]", label: "Primary Brand Color OR Vibe", type: "color-vibe" }
    ]`;

content = content.replace(oldVariablesBlock, newVariablesBlock);
fs.writeFileSync('constants.ts', content);
console.log('done');
