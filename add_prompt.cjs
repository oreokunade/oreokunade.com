const fs = require('fs');

const path = 'constants.ts';
let content = fs.readFileSync(path, 'utf8');

const MASTER_PROMPT_TEMPLATE = `\nexport const MASTER_PROMPT_TEMPLATE = \`# Website Building Megaprompt
    
## 1. Project Context

I want to build a **[Project Type]** for **[Target Audience]**.

The primary goal of this website is **[Primary Goal]**.

The website should communicate **[Brand Personality / Positioning]** and have a **[Vibe / Aesthetic]** visual direction.

My brand colours are:

**Primary:** [Primary Hex]

**Secondary:** [Secondary Hex]

**Background:** [Background Hex]

**Text:** [Text Hex]

Use these colours intentionally across the interface rather than applying them uniformly.

## 2. Design Direction

Before writing any code, inspect the project's **\\\`design.md\\\`** file.

This file is the primary source of truth for the visual direction of this project. Follow its typography, colour system, spacing, layout principles, components, imagery, and interaction guidelines.

I have also provided reference screenshots/websites. Study them for inspiration and identify what makes them effective, including composition, hierarchy, typography, spacing, interaction and visual rhythm.

**Do not copy the references directly.** Extract the underlying design principles and reinterpret them for this project.

If the reference material conflicts with \\\`design.md\\\`, follow \\\`design.md\\\`.

## 3. Think Before You Build

Before implementing the website:

1. Inspect the existing project structure and files.
2. Read \\\`design.md\\\` completely.
3. Analyse the provided references.
4. Identify the site's content hierarchy and key user journeys.
5. Determine the components and sections required.
6. Create a concise implementation plan.

Do not start coding until you have completed this analysis.

## 4. Your Role

Act as a **world-class product designer, creative director and senior front-end engineer**.

Your job is not simply to make the website functional. You are responsible for translating the creative direction into a polished digital experience with strong hierarchy, usability, responsiveness and attention to detail.

Make design decisions confidently when the instructions do not specify every detail, but ensure those decisions remain consistent with the established design direction.

## 5. Tech Stack

My preferred stack is:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion

If you strongly recommend a different architecture for this specific project, explain why before making the change.

Build the project using clean, modular and maintainable components.

## 6. Interaction & Motion

The website should feel alive, but **motion must have a purpose**.

Use animation where it improves:

- Visual hierarchy
- Storytelling
- Navigation
- Feedback
- Transitions
- Discoverability

Consider smooth scrolling, entrance animations, scroll-driven effects and subtle micro-interactions where appropriate.

Do not add animations simply because you can.

Avoid excessive parallax, unnecessary magnetic effects, constant movement and distracting transitions.

Respect \\\`prefers-reduced-motion\\\`.

## 7. Avoid AI Slop

Do not fall back on generic AI-generated web patterns.

Avoid unnecessary:

- Glassmorphism
- Giant gradient blobs
- Excessive rounded cards
- Generic SaaS dashboards
- Predictable hero sections
- Random 3D objects
- Excessive shadows
- Decorative elements with no purpose
- Repetitive card grids
- Default-looking typography
- Animations that exist only to make the site feel “fancy”

Every major visual decision should have a reason and should support the project's design direction.

## 8. Quality Standards

The final website must be:

- Fully responsive
- Accessible
- Fast and performant
- Keyboard navigable
- Visually consistent
- Componentised and maintainable
- SEO-friendly where appropriate

Do not use placeholders or unfinished sections.

If images, illustrations or videos are required, use appropriate high-quality assets and ensure they actually support the design.

Handle loading, error and empty states where relevant.

## 9. Implementation

Build the complete website directly inside the project.

Create and modify all necessary files, including configuration files, components, styles, assets and supporting logic.

Do not leave TODO comments, unfinished functionality or pseudo-code.

Before considering the project complete, test the implementation, check for errors, verify responsive behaviour and review the final result against \\\`design.md\\\` and the original requirements.

The goal is not simply to produce working code.

**The goal is to produce a website that feels intentionally designed.**\`;\n\n`;

const MASTER_PROMPT_CONFIG = `  {
    id: "master-prompt-generator",
    title: "Master Prompt Generator",
    type: "Template",
    price: "Free",
    description: "The ultimate master prompt I use to direct AI coding assistants. Instantly establishes brand, aesthetic, and quality standards before generating code.",
    link: "#",
    tags: ["Prompts", "Web Dev", "AI Context"],
    promptTemplate: MASTER_PROMPT_TEMPLATE,
    promptVariables: [
      { id: "[Project Type]", label: "What are you building?", placeholder: "e.g. portfolio website, SaaS dashboard" },
      { id: "[Target Audience]", label: "Target Audience", placeholder: "e.g. creative professionals, enterprise clients" },
      { id: "[Primary Goal]", label: "Primary Goal", placeholder: "e.g. convert visitors to newsletter subscribers" },
      { id: "[Brand Personality / Positioning]", label: "Brand Personality", placeholder: "e.g. minimalist and high-end" },
      { id: "[Vibe / Aesthetic]", label: "Visual Vibe", placeholder: "e.g. dark mode brutalism" },
      { id: "[Primary Hex]", label: "Primary Brand Color (Hex)", placeholder: "e.g. #ff4306" },
      { id: "[Secondary Hex]", label: "Secondary Color (Hex)", placeholder: "e.g. #111111" },
      { id: "[Background Hex]", label: "Background Color (Hex)", placeholder: "e.g. #0a0a0a" },
      { id: "[Text Hex]", label: "Text Color (Hex)", placeholder: "e.g. #ffffff" }
    ]
  },
`;

if (!content.includes('MASTER_PROMPT_TEMPLATE')) {
    content = content.replace('export const DIGITAL_PRODUCTS: DigitalProduct[] = [', MASTER_PROMPT_TEMPLATE + 'export const DIGITAL_PRODUCTS: DigitalProduct[] = [\n' + MASTER_PROMPT_CONFIG);
    fs.writeFileSync(path, content);
    console.log('Added Master Prompt Generator successfully.');
} else {
    console.log('Already added.');
}
