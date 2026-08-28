import { Project, Article, ProjectDetail } from './types';

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/oreoluwa",
  github: "https://github.com/oreoluwa",
  linkedin: "https://linkedin.com/in/oreoluwa",
  email: "oreokunade@gmail.com"
};

const MOCK_DETAILS: ProjectDetail = {
  subtitle: "Trim & crop animated GIFs",
  heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
  highlights: [
    { title: "Workflow-first utility design", description: "Turns trimming, cropping, reference overlays, and keyboard control into one focused Mac workflow." },
    { title: "Performance-minded implementation", description: "Splices GIF binary data for trims without re-encoding, while cropped exports use a parallel encoder." },
    { title: "Native Mac craft", description: "Built with SwiftUI, drag and drop, local files, no accounts, and no subscription model." }
  ],
  mainParagraph: "This is a focused, lightweight tool for editing animated GIFs on your Mac. Open a GIF, trim the frames you don't need, crop the area you want, and save. That's it.",
  features: [
    { title: "Trim frames", description: "Use the QuickTime-style filmstrip timeline to select exactly which frames to keep. Drag the yellow handles to set your start and end points. The red playhead shows you exactly where you are. Scrub through frames by clicking anywhere on the timeline, or use arrow keys to step frame by frame." },
    { title: "Crop the image", description: "Toggle the crop overlay and drag the corners or edges to select the area you want to keep. Move the entire crop area by dragging inside it. Dimensions update live in the title bar so you always know the output size." },
    { title: "Reference overlay", description: "Need to match the framing of another GIF or image? Load any image as a semi-transparent reference overlay. Hold Option and drag to position it, or pinch to resize. Adjust opacity with the slider. Supports PNG, JPEG, TIFF, HEIC, WebP, and GIF." }
  ],
  conclusion: "By focusing strictly on utility and native performance, the resulting product completely eliminated the friction of editing animated GIFs on Mac, setting a new standard for workflow-first tools."
};

const RAW_WORKS: Project[] = [
  {
    id: 'phocus',
    title: "Phocus",
    description: "Operating system for deep work.",
    tags: ["React", "Electron", "TypeScript"],
    year: "2026",
    status: "In Progress",
    link: "https://usephocus.com",
    logo: "/logos/phocus.svg",
    details: {
      subtitle: "Engineering a Secure Agentic Productivity Operating System",
      heroImage: "/casestudies/phocus-hero.png",
      mainParagraph: "The modern knowledge worker is paralyzed by context switching. Phocus OS is not just another task tracker, it is a localized productivity operating system engineered to combat digital distraction. By actively monitoring desktop window states, it calculates focus stability. We paired this strict monitoring with an autonomous Agentic AI layer that actively updates the user's schedule and manages their backlog, turning a passive list into a proactive executive assistant.",
      highlights: [
        { title: "Agentic AI Integration", description: "Engineered an autonomous AI capable of updating complex application state using heavily optimized data packages and strict function calls." },
        { title: "Zero Trust Cloud Architecture", description: "Architected a secure server proxy using Firebase Cloud Functions and Google Cloud Secret Manager, paired with identity based rate limiting to prevent unauthorized access." },
        { title: "Native Systems Telemetry", description: "Utilized the Electron framework to securely check active desktop windows, feeding a localized algorithm that evaluates focus stability in real time." }
      ],
      features: [
        { title: "Optimized Context Engineering", description: "Instead of blindly passing the entire database to the AI, I engineered a dynamic data pipeline. The system strips out archived tasks and maps only critical information, drastically reducing delays while providing precise situational awareness." },
        { title: "Autonomous Function Execution", description: "Defined strict data rules that allow the AI to interpret complex intents, like 'Clear my Friday afternoon', and execute batched updates securely across the calendar." },
        { title: "Real Time Telemetry and Aggregation", description: "The desktop client securely polls the operating system to determine active window focus. This data is aggregated into an Attention Score and an Intention Score, which are periodically saved to the cloud to minimize heavy network usage and optimize performance." },
        { title: "Hardware Accelerated UI Polish", description: "Managed complex fast updating state without slowing down the application. Implemented smooth drag and drop calendar planning, and organic non blocking animations that feel deeply premium." }
      ],
      conclusion: "Phocus successfully redefined the productivity landscape. By moving away from manual input and towards autonomous, telemetry-driven AI scheduling, it transformed the way users interact with their daily tasks, ultimately delivering true digital focus."
    }
  },
  {
    id: 'in-official',
    title: "IN official",
    description: "Luxury digital storefront.",
    tags: ["Next.js", "Tailwind", "Shopify"],
    year: "2026",
    status: "Active",
    link: "https://i-nofficial.com",
    logo: "/logos/in-official.png",
    details: {
      subtitle: "Crafting a Blazing Fast Headless Commerce Engine for Luxury Fashion",
      heroImage: "/casestudies/in-official-hero.png",
      mainParagraph: "IN Official is the digital flagship of designer Ifeanyi Nwune. The technical challenge was monumental: translate a high fashion, image heavy editorial aesthetic into an incredibly fast digital commerce experience. By fully decoupling the visual frontend from Shopify, I built a headless Next.js commerce engine that achieves load times under two seconds while maintaining the uncompromised visual fidelity expected of contemporary luxury.",
      highlights: [
        { title: "Shopify Headless Commerce", description: "Integrated Shopify's backend system with a completely custom Next.js frontend, entirely separating the database from the presentation layer to unlock total creative freedom." },
        { title: "Edge Performance Optimization", description: "Engineered extremely fast global load times using Next.js caching, automated image optimization, and aggressive edge server distribution strategies." },
        { title: "Editorial First Architecture", description: "Developed a custom layout engine that prioritizes full bleed, cinematic product presentation while preserving structured data for high end search engine visibility." }
      ],
      features: [
        { title: "Dynamic Collection Syncing", description: "Architected a system that automatically synchronizes and generates distinct visual identities for different collections based on Shopify product categorization." },
        { title: "Frictionless Quick Add Flow", description: "Engineered an interactive Add to Bag sequence directly within the product grids. Users can select sizes, colors, and update their cart without ever leaving the editorial viewing context." },
        { title: "Exclusive Gating Mechanics", description: "Built a sophisticated pre launch engine for exclusive drops complete with secure email capture, server synced countdowns, and early access gating." }
      ],
      conclusion: "The decoupling of the frontend from Shopify allowed IN Official to achieve sub-two-second load times globally. This headless architecture successfully merged high-fashion editorial design with lightning-fast commerce performance."
    }
  },
  {
    id: 'betpanta',
    title: "betpanta",
    description: "Sports betting platform.",
    tags: ["Vue", "Node.js", "PostgreSQL"],
    year: "2026",
    status: "Active",
    link: "https://betpanta.vercel.app",
    logo: "/logos/betpanta.svg",
    details: {
      subtitle: "Architecting a High Concurrency Real Time Sports Betting Platform",
      heroImage: "/casestudies/betpanta-hero.png",
      mainParagraph: "BetPanta is a next generation sports betting application demanding extreme performance and zero latency reliability in the Nigerian market. From day one, the entire platform was architected with a strict mobile-first approach, recognizing that the vast majority of the target demographic engages exclusively via smartphones. The architectural demands were massive: handling real time data ingestion, performing complex odds calculations on the fly, and maintaining a robust, swipe friendly mobile interface capable of sustaining thousands of concurrent users during peak live matches.",
      highlights: [
        { title: "Real Time Odds Engine", description: "Architected a highly resilient socket powered feed that pushes live match scores and fluctuating betting lines to the client instantly with zero page refresh delay." },
        { title: "Mobile First UX Engineering", description: "Designed and implemented a gesture driven, bottom navigation interface specifically optimized for one handed use, addressing the primary access pattern for the target demographic." },
        { title: "Unified Multi Sport Data Model", description: "Engineered a scalable database model capable of organizing complex rules across disparate sports, supporting hundreds of distinct market specific bet types." }
      ],
      features: [
        { title: "High Frequency Live Betting", description: "Built an interface capable of processing rapid data updates to render live scores and dynamic odds movement indicators flashing red or green instantly." },
        { title: "Complex Bet Slip Algorithms", description: "Developed the core logic handling complex math for single and multiple bets. Implemented a shareable Bet Code system allowing users to instantly reconstruct complex bets." },
        { title: "Integrated Casino Infrastructure", description: "Seamlessly integrated third party game providers, like crash games and virtual sports, within the same application framework without compromising the core sportsbook performance." }
      ],
      conclusion: "By rigorously adhering to a mobile-first philosophy, BetPanta's real-time odds engine and gesture-driven UX established a highly resilient, high-concurrency platform. It successfully scaled to handle peak live matches, delivering a seamless, app-like experience directly in the mobile browser without compromising on speed or reliability."
    }
  },
  {
    id: 'simon-dan-consulting',
    title: "Simon and Dan Consulting",
    description: "Corporate consulting website.",
    tags: ["React", "Framer Motion", "Tailwind"],
    year: "2026",
    status: "Active",
    link: "https://simondanconsulting.com",
    logo: "/logos/seun-daniel.png",
    details: {
      subtitle: "Engineering Digital Trust and Conversion for Corporate Consulting",
      heroImage: "/casestudies/simondan-hero.png",
      mainParagraph: "For Simon and Dan Consulting, a firm helping startups design solid financial structures, the digital presence had to instantly communicate rigorous credibility while actively driving lead conversion. I engineered a highly polished, conversion optimized platform that utilizes fluid animation and psychological trust architecture to convert passive visitors into booked advisory calls.",
      highlights: [
        { title: "Conversion Optimized Architecture", description: "Engineered strategic call to action placements integrated directly with scheduling software, resulting in a drastically reduced friction path for discovery call bookings." },
        { title: "Layered Trust Systems", description: "Designed a component driven trust architecture that dynamically pulls in statistics, verified client logos, and structured case studies to establish immediate authority." },
        { title: "Scroll Driven Storytelling", description: "Implemented highly optimized, hardware accelerated scroll animations. This progressively reveals the firm's narrative, maintaining user engagement without sacrificing rendering performance." }
      ],
      features: [
        { title: "Dynamic Service Explorer", description: "Built an interactive, state driven service module featuring hover reveal detail panels and seamless layout transitions that keep users deeply engaged." },
        { title: "Swipeable Case Study Engine", description: "Developed a performant, touch friendly case study carousel highlighting real world client impact, engineered to load assets efficiently and ensure smooth interaction across all devices." },
        { title: "Dual Persona Routing", description: "Architected a toggle based user experience that dynamically changes page content based on the user's persona, delivering highly tailored messaging and pain point resolutions." }
      ],
      conclusion: "The strategic implementation of psychological trust architecture and fluid scroll storytelling directly increased discovery call bookings. The platform successfully positioned Simon and Dan Consulting as a premium, highly credible corporate advisory firm."
    }
  },
  {
    id: 'abuja-startup-expo',
    title: "Abuja Startup Expo",
    description: "A web development project for ASE.",
    tags: ["React", "Next.js", "Tailwind"],
    year: "2026",
    status: "Active",
    link: "https://abujastartupexpo.com",
    logo: "/logos/ase.png",
    details: {
      subtitle: "Building the Digital Infrastructure for Nigeria's Premier Startup Gathering",
      heroImage: "/casestudies/ase-hero.png",
      mainParagraph: "CONVERGE 2026 required a digital footprint that matched the sheer scale of hosting over a thousand founders and investors. I engineered a high energy, scalable web platform designed specifically as a conversion engine for ticket sales, sponsorship acquisition, and complex multi tier user registration funnels.",
      highlights: [
        { title: "High Fidelity Visual Engineering", description: "Crafted a dark mode, high contrast user interface with bespoke amber accents. The design language was strictly codified to ensure pixel perfect consistency and authoritative brand messaging." },
        { title: "Scalable Conversion Engine", description: "Designed a multi tier pricing architecture utilizing psychological anchoring and direct integration with payment processors, streamlining the checkout flow and maximizing conversion rates." },
        { title: "Ecosystem Data Architecture", description: "Built a structured content management system to handle massive arrays of past speaker profiles, sponsor hierarchies, and visual galleries, instantly establishing institutional credibility." }
      ],
      features: [
        { title: "Interactive Zone Explorer", description: "Engineered a stateful mapping interface for the four CONVERGE experiences, utilizing dynamic layout animations for deep exploration." },
        { title: "Streamlined Application Funnels", description: "Architected complex application forms for startups pitching for investment. The flow cleanly aggregates data and pipes it directly into the organizers' management software." },
        { title: "Role Based Portal Management", description: "Developed dedicated intake portals for speakers, investors, and volunteers, featuring built in validation and automated newsletter synchronization." }
      ],
      conclusion: "CONVERGE 2026's digital infrastructure effortlessly handled massive registration volume and complex application funnels. The high-fidelity visual engineering established immediate authority, driving ticket sales and seamless user onboarding."
    }
  },
  {
    id: 'wecreate-consult',
    title: "We Create Consult",
    description: "Creative consulting platform.",
    tags: ["Consulting", "Design", "Strategy"],
    year: "2026",
    status: "Active",
    link: "https://wecreateconsult.com",
    logo: "",
    details: {
      subtitle: "Engineering Digital Authority for Startup Fundraising",
      heroImage: "/casestudies/wecreate-hero.png",
      mainParagraph: "Wecreate Consult specializes in making African startups fundable. To communicate their deep expertise in investment readiness and grant writing, I built a sophisticated, problem focused platform. The engineering focus was on simplifying a complex six tier service offering into an intuitive, high converting digital narrative that instills immediate confidence in founders and investors alike.",
      highlights: [
        { title: "Problem First UX Architecture", description: "Engineered a storytelling flow that intercepts the user's specific pain points, like needing a business case, before dynamically rendering the appropriate service solutions." },
        { title: "Complex Service Taxonomy", description: "Architected a scalable, grid based routing system to handle diverse offerings, ensuring each vertical has a dedicated, highly optimized landing experience." },
        { title: "Impact Metric Visualization", description: "Developed custom animated data visualization components to showcase millions in facilitated funding, cementing the firm's authority the moment the data enters the screen." }
      ],
      features: [
        { title: "Visual Process Framework", description: "Designed an interactive, four step methodology component that demystifies the consulting lifecycle and reduces cognitive load for prospective clients." },
        { title: "Sector Expertise Matrix", description: "Built a responsive, numbered grid system highlighting expertise across various technical sectors. Implemented a dynamic fallback option to capture unlisted industries." },
        { title: "Frictionless FAQ Engine", description: "Engineered an accessible accordion system addressing critical objections like pricing and timelines, strategically placed to eliminate friction right before the booking button." }
      ],
      conclusion: "By simplifying a complex six-tier service taxonomy into a problem-first narrative, the platform drastically reduced cognitive load. It successfully built digital authority, actively driving conversions for founders seeking investment readiness."
    }
  }
];

export const WORKS: Project[] = RAW_WORKS.map(work => ({
  ...work,
  details: work.details || MOCK_DETAILS
}));

export const OFFERS = [
  {
    title: "Web Design & Development",
    description: "Crafting high-performance, visually stunning websites that drive conversion and establish digital authority."
  },
  {
    title: "Product Design & Development",
    description: "End-to-end product creation, from complex UX logic to robust, scalable frontend architecture."
  },
  {
    title: "AI Powered Automation",
    description: "Integrating intelligent AI agents and automated workflows to radically reduce operational friction."
  },
  {
    title: "Product Audit",
    description: "A rigorous tear-down of your existing product's UX, performance, and architecture to identify critical growth blockers."
  },
  {
    title: "Consultation",
    description: "Expert guidance on a product you're currently building or planning to build. Ask me anything about design engineering, web design, or product strategy."
  }
];

export const WRITING: Article[] = [
  {
    id: 'a1',
    title: "0-1 with AI: Introduction",
    summary: "The opening chapter to my comprehensive guide on leveraging AI to build and validate your ideas.",
    date: "Nov 20, 2024",
    readTime: "10 min read",
    link: "#"
  },
  {
    id: 'a2',
    title: "Mistakes Founders Make in the AI Age",
    summary: "Reflections on common pitfalls when building AI-first products and how to avoid them.",
    date: "Oct 12, 2024",
    readTime: "6 min read",
    link: "#"
  },
  {
    id: 'a3',
    title: "You Were Built to Create Cool S**t",
    summary: "A personal development framework for productivity without overwhelm.",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    link: "#"
  },
  {
    id: 'a4',
    title: "Consumption Control",
    summary: "How to stop scrolling, reclaim your attention, and start actually living.",
    date: "Aug 15, 2024",
    readTime: "5 min read",
    link: "#"
  }
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for Oreoluwa Okunade's portfolio website. 
Oreoluwa is a Product Design Engineer who bridges the gap between design and engineering.
He specializes in React, TypeScript, and minimalist UI/UX.

Here is his work history:
${JSON.stringify(WORKS)}

Here are his offers:
${JSON.stringify(OFFERS)}

Here is his writing:
${JSON.stringify(WRITING)}

Your tone should be:
- Minimalist, concise, and professional.
- Friendly but intellectually curious.
- Use lowercase for stylistic choice occasionally, but maintain readability.
- If asked about contact, provide his email: ${SOCIAL_LINKS.email}.

Answer questions about his specific projects, his design philosophy (minimalism, function over form), and his background.
Do not hallucinate projects not listed here. If asked about something unknown, say you don't have that information.
`;

export interface PromptVariable {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'color-vibe';
}

export interface DigitalProduct {
  id: string;
  title: string;
  type: 'Course' | 'Template' | 'E-Book' | 'Kit';
  price: string;
  description: string;
  coverImage?: string;
  link: string;
  tags: string[];
  promptTemplate?: string;
  promptVariables?: PromptVariable[];
}

const DESIGN_MD_TEMPLATE = `I am building a website for a [business type].

I have attached reference screenshots of websites that capture the exact aesthetic and design language I want to achieve.

[Color Context]

Based on these references, act as a world-class UI/UX designer and create a comprehensive DESIGN.md file for my project.

Select a primary and secondary typeface (preferably Google Fonts) that best match the visual direction of the references.

Using the references as inspiration, create a complete and cohesive colour system. In addition to the primary colour, intelligently define secondary, accent, neutral, background, surface, text, border, and semantic colours (success, warning, error, info, etc.) that complement the aesthetic. Every colour should have a clear purpose within the interface and work together as a unified design system rather than a collection of random colours.

Important:
• Analyse the references instead of copying them.
• Infer the spacing system, colour palette, typography, component styling, interaction philosophy, motion language, and overall design language.
• Explain the reasoning behind your design decisions where appropriate.
• Follow the DESIGN.md template below exactly. Do not invent your own structure or headings.

Template: \`\`\`yaml
---
version: alpha
name: [Project Name]
description: [Brief project description]

colors:
  primary: "#HEX"
  secondary: "#HEX"
  accent: "#HEX"
  neutral:
    50: "#HEX"
    100: "#HEX"
    200: "#HEX"
    300: "#HEX"
    400: "#HEX"
    500: "#HEX"
    600: "#HEX"
    700: "#HEX"
    800: "#HEX"
    900: "#HEX"
  background: "#HEX"
  surface: "#HEX"
  text-primary: "#HEX"
  text-secondary: "#HEX"
  border: "#HEX"
  success: "#HEX"
  warning: "#HEX"
  error: "#HEX"
  info: "#HEX"

typography:
  headings:
    fontFamily: "[Font]"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "[Font]"
    fontSize: "16px"
    lineHeight: 1.6
  mono:
    fontFamily: "[Font]"

spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px

rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

components:
  button:
    bg: "{colors.primary}"
    color: "{colors.background}"
    radius: "{rounded.md}"
  card:
    bg: "{colors.surface}"
    radius: "{rounded.lg}"
  input:
    radius: "{rounded.md}"

motion:
  easing: "ease-out"
  duration:
    fast: 200ms
    normal: 400ms
    slow: 700ms
---

## Overview
Describe the overall design philosophy, visual personality, and emotional tone of the product.

## Colors
Define the role of each colour in the system, including primary, secondary, accent, neutrals, backgrounds, surfaces, typography, borders, and semantic colours. Explain how they should be applied across the interface and whether the palette follows a system such as the 60–30–10 rule.

## Typography
Describe the personality of the typefaces, hierarchy, readability, spacing, and when each typeface should be used.

## Layout & Spacing
Define the grid system, container widths, whitespace philosophy, alignment, rhythm, and responsive behavior.

## Shapes & Elevation
Specify border radii, borders, shadows, transparency, glass effects, and how depth should be created.

## Components
Describe the visual treatment of buttons, cards, forms, navigation, modals, badges, tables, and other reusable UI elements.

## Motion
Define the animation philosophy, easing, durations, page transitions, hover states, micro-interactions, and scroll behavior.

## Imagery
Describe the preferred style for photography, illustrations, icons, graphics, 3D, WebGL, or visual assets, including what should be avoided.

## Do's and Don'ts
List the design principles that should always be followed and the common visual patterns or UI decisions that should never be used.
\`\`\`
`;


export const MASTER_PROMPT_TEMPLATE = `# Website Building Megaprompt
    
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

Before writing any code, inspect the project's **\`design.md\`** file.

This file is the primary source of truth for the visual direction of this project. Follow its typography, colour system, spacing, layout principles, components, imagery, and interaction guidelines.

I have also provided reference screenshots/websites. Study them for inspiration and identify what makes them effective, including composition, hierarchy, typography, spacing, interaction and visual rhythm.

**Do not copy the references directly.** Extract the underlying design principles and reinterpret them for this project.

If the reference material conflicts with \`design.md\`, follow \`design.md\`.

## 3. Think Before You Build

Before implementing the website:

1. Inspect the existing project structure and files.
2. Read \`design.md\` completely.
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

Respect \`prefers-reduced-motion\`.

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

Before considering the project complete, test the implementation, check for errors, verify responsive behaviour and review the final result against \`design.md\` and the original requirements.

The goal is not simply to produce working code.

**The goal is to produce a website that feels intentionally designed.**`;

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
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

  {
    id: "escape-ai-slop",
    title: "Escape AI slop pandemic - Build Websites That Don't Look AI-Built",
    type: "E-Book",
    price: "₦7,500",
    coverImage: "/products/escape-ai-slop.png",
    description: "Learn how to inject soul, personality, and bespoke craftsmanship into your projects to stand out in a sea of generic AI-generated templates.",
    link: "/escape-ai-slop",
    tags: ["PDF", "Guide", "Design Strategy"]
  },
  {
    id: "design-md-prompt",
    title: "Design.md Generator",
    type: "Template",
    price: "Free",
    description: "The exact prompt I use to generate comprehensive design.md files for structuring complex web applications before coding.",
    link: "#",
    tags: ["Prompts", "Architecture", "Planning"],
    promptTemplate: DESIGN_MD_TEMPLATE,
    promptVariables: [
      { id: "[business type]", label: "What is the business type?", placeholder: "e.g. luxury real estate platform" },
      { id: "[Color Context]", label: "Primary Brand Color OR Vibe", type: "color-vibe" },
      { id: "[Project Name]", label: "Project Name", placeholder: "e.g. Acme Corp" },
      { id: "[Brief project description]", label: "Project Description", placeholder: "e.g. A marketplace for high-end properties" }
    ]
  }
];