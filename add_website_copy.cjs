const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldPromptTemplateBlock = `[Color Context]

Use colours intentionally across the interface rather than applying them uniformly.

## 2. Design Direction`;

const newPromptTemplateBlock = `[Color Context]

Use colours intentionally across the interface rather than applying them uniformly.

Here is the provided website copy that you should use to populate the content:
[Website Copy]

## 2. Design Direction`;

const oldVariablesBlock = `    promptVariables: [
      { id: "[Project Type]", label: "What are you building?", placeholder: "e.g. portfolio website, SaaS dashboard" },
      { id: "[Target Audience]", label: "Target Audience", placeholder: "e.g. creative professionals, enterprise clients" },
      { id: "[Primary Goal]", label: "Primary Goal", placeholder: "e.g. convert visitors to newsletter subscribers" },
      { id: "[Brand Name]", label: "Brand Name", placeholder: "e.g. Acme Corp" },
      { id: "[Color Context]", label: "Primary brand colour or palette", type: "color-vibe" }
    ]`;

const newVariablesBlock = `    promptVariables: [
      { id: "[Project Type]", label: "What are you building?", placeholder: "e.g. portfolio website, SaaS dashboard" },
      { id: "[Target Audience]", label: "Target Audience", placeholder: "e.g. creative professionals, enterprise clients" },
      { id: "[Primary Goal]", label: "Primary Goal", placeholder: "e.g. convert visitors to newsletter subscribers" },
      { id: "[Brand Name]", label: "Brand Name", placeholder: "e.g. Acme Corp" },
      { id: "[Color Context]", label: "Primary brand colour or palette", type: "color-vibe" },
      { id: "[Website Copy]", label: "Website Copy", placeholder: "Paste your website copy/content here...", type: "textarea" }
    ]`;

let replaced = false;

if (content.includes(oldPromptTemplateBlock)) {
    content = content.replace(oldPromptTemplateBlock, newPromptTemplateBlock);
    replaced = true;
    console.log('Replaced prompt template block');
} else {
    console.log('Could not find prompt template block');
}

if (content.includes(oldVariablesBlock)) {
    content = content.replace(oldVariablesBlock, newVariablesBlock);
    replaced = true;
    console.log('Replaced variables block');
} else {
    console.log('Could not find variables block');
}

if(replaced) {
    fs.writeFileSync('constants.ts', content);
}
