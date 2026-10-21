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
    logo: import.meta.env.BASE_URL + "logos/phocus.svg",
    details: {
      subtitle: "A desktop operating system that helps knowledge workers beat digital distraction and finish what they start",
      heroImage: import.meta.env.BASE_URL + "casestudies/phocus-screen-dashboard.png",
      mainParagraph: "Most knowledge workers struggle with digital distraction. You sit down to work on an important project, but within twenty minutes you are switching tabs, responding to notifications, and losing your train of thought. Phocus is a desktop app designed to break that cycle. It combines daily to-do lists, calendar time blocking, and a distraction-free focus timer with smart background tracking that gently reminds you when you drift off task.",
      highlights: [
        { title: "Real-Time Focus Tracking", description: "Phocus runs quietly in the background on your computer, noticing when you are actively working in your main app versus switching away to social media or random browser tabs." },
        { title: "Calendar Time Blocking", description: "Instead of an endless to-do list that causes anxiety, Phocus lets you drag tasks directly onto a visual timeline so every item has a dedicated hour to get done." },
        { title: "Distraction-Free Deep Work", description: "When you start a session, Phocus dims everything else on your screen, starts a countdown, and plays ambient background audio to keep your mind locked in flow." },
        { title: "Smart Daily Focus Score", description: "At the end of each day, Phocus gives you a simple score from 0 to 100 based on how much uninterrupted time you actually spent on your top priorities." }
      ],
      features: [
        { title: "Priority Task Planning", description: "Pick your top three priorities for the morning before opening any emails or chats, ensuring you always finish the most critical work first." },
        { title: "Automated Milestone Breakdown", description: "Got a big, daunting project? Phocus helps you break large multi-week goals down into bite-sized daily checklists you can actually execute." },
        { title: "Helpful AI Assistant", description: "An integrated AI helper powered by Google Gemini that lets you quickly type 'Schedule my design review for 2 PM' or 'Clear my Friday afternoon' without clicking around." },
        { title: "Privacy-First Desktop Engine", description: "Your activity and window data stays stored locally on your machine. Nothing invasive is sent to external servers or logged in the cloud." }
      ],
      screens: [
        {
          title: "Full Daily Planner & Workspace",
          image: import.meta.env.BASE_URL + "casestudies/phocus-screen-dashboard.png",
          description: "The command center for your workday. Displays your priority tasks for the day, upcoming calendar time blocks, and your current focus score in one clean view."
        },
        {
          title: "Deep Work Mode Focus Timer",
          image: import.meta.env.BASE_URL + "casestudies/phocus-screen-focus.png",
          description: "A clean, dark countdown card that eliminates visual clutter during intense focus sprints. Helps you stay in flow state until the timer completes."
        },
        {
          title: "Milestone Breakdown & Weekly Planning",
          image: import.meta.env.BASE_URL + "casestudies/phocus-screen-goals.png",
          description: "Long-term goals are broken down into bite-sized progress cards and mapped across a weekly schedule so you always know what to work on next."
        },
        {
          title: "Daily Focus Score & Session Stats",
          image: import.meta.env.BASE_URL + "casestudies/phocus-screen-analytics.png",
          description: "Clear daily summaries that track your flow state, total minutes of deep work, and weekly streak to keep you motivated without feeling overwhelming."
        }
      ],
      conclusion: "Phocus turned chaotic workdays into structured, calm productivity. By replacing guilt-inducing infinite task lists with realistic time blocks and gentle focus tracking, users reported spending over 40% more uninterrupted time on their most important work.",
      learnings: [
        "Infinite to-do lists create anxiety, not action: When users see twenty tasks on a screen, they freeze. Forcing users to pick just three priority items and schedule them into concrete calendar blocks instantly increased task completion rates.",
        "Window switching is the silent productivity killer: Users often thought they spent 4 hours coding or writing, but tracking revealed they switched windows every 3 minutes. Showing users their actual focus stability was an eye-opener that changed their daily habits.",
        "Local-first privacy earns deep user trust: Nobody wants software spying on what apps they use. By processing window telemetry strictly on the user's machine and only syncing aggregated numbers, users felt safe using Phocus every single day."
      ]
    }
  },
  {
    id: 'plugin-portfolio',
    title: "Plugin internal portfolio system",
    description: "Portfolio and project delivery tool for creators and freelancers.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    year: "2026",
    status: "Active",
    link: "https://plugin-2.vercel.app",
    logo: import.meta.env.BASE_URL + "logos/plugin.png",
    details: {
      subtitle: "A simple way for freelancers to showcase work, manage clients, and deliver projects",
      heroImage: import.meta.env.BASE_URL + "casestudies/plugin-hero.png",
      mainParagraph: "Freelancers often struggle when sharing work with potential clients. They end up sending scattered Google Drive links, messy PDF files, or screenshots across WhatsApp chats. Plugin solves this by giving freelancers a single, clean home for their craft. Creators get an intuitive dashboard to manage their work, share a polished personal portfolio link, and send project deliverables directly to clients for instant approval.",
      highlights: [
        { title: "Automatic Photo Cleanup", description: "When creators upload photos, Plugin automatically strips out sensitive location data and checks for phone numbers or watermarks so the work stays clean and professional." },
        { title: "Flexible Project Templates", description: "Different types of work need different presentations. Creators can pick between visual photo galleries, in-depth written case studies, or video showcases." },
        { title: "One-Tap Client Approval", description: "Clients do not need to download an app or create an account. They simply open a link on their phone, review the finished work, and tap to approve it." },
        { title: "Live Availability Status", description: "A simple toggle on the dashboard lets creators switch between 'Available', 'Busy', and 'Away' so clients know immediately when they can take on new work." }
      ],
      features: [
        { title: "Quick & Simple Uploads", description: "A guided step-by-step upload screen that lets creators drag and drop their best images, pick their preferred layout, and write a summary without complicated settings." },
        { title: "Mobile-First Portfolio Links", description: "Portfolios are designed specifically to look incredible on mobile devices, making them easy to open and browse directly inside messaging apps like WhatsApp." },
        { title: "Clear Deliverable Tracking", description: "A clean review screen where clients can see exactly what was promised, inspect high-resolution deliverables, and sign off on completed milestones." },
        { title: "Fast & Lightweight Performance", description: "Built with Next.js, Supabase, and Tailwind CSS so every page and high-res image loads in the blink of an eye, even on slow network connections." }
      ],
      screens: [
        {
          title: "Freelancer Dashboard",
          image: import.meta.env.BASE_URL + "casestudies/plugin-hero.png",
          description: "The creator's home base. Shows their live availability badge, quick business numbers, active contracts, and a one-click button to copy their public portfolio link."
        },
        {
          title: "Public Client Portfolio",
          image: import.meta.env.BASE_URL + "casestudies/plugin-screen-portfolio.png",
          description: "What clients see when opening the creator's link on mobile web or WhatsApp. Displays a clean bio, verified skills tags, and categorized project cards."
        },
        {
          title: "Project Upload & Template Picker",
          image: import.meta.env.BASE_URL + "casestudies/plugin-screen-upload.png",
          description: "Creators choose whether they want an image portfolio, a detailed case study, or a video showcase, keeping the upload flow fast and focused."
        },
        {
          title: "Client Deliverable Approval",
          image: import.meta.env.BASE_URL + "casestudies/plugin-screen-review.png",
          description: "A simple page sent to clients when a milestone is completed, allowing them to review files and approve the work with zero signup friction."
        }
      ],
      conclusion: "Plugin replaced messy links and confusing chat threads with a calm, organized experience. Freelancers got a professional presence they were proud to share, and clients got a clear, zero-friction way to review and sign off on completed work.",
      learnings: [
        "Zero friction for clients is everything: If a client has to sign up, download an app, or create a password just to review a file, they will delay it or ignore it. Keeping review links completely frictionless made approvals happen 5x faster.",
        "Automating photo cleanup saves creators hours: Freelancers often upload massive 20MB photos straight from cameras. Stripping heavy EXIF metadata and resizing images automatically on the server kept pages loading under one second and saved huge storage costs.",
        "Simple status controls build trust: A simple toggle between 'Available' and 'Busy' was one of the most loved features. It gave clients clarity upfront and saved freelancers from constantly answering 'Are you free for work?' messages."
      ]
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
    logo: import.meta.env.BASE_URL + "logos/in-official.png",
    details: {
      subtitle: "A lightning-fast luxury storefront for high-fashion collections that loads in under two seconds",
      heroImage: import.meta.env.BASE_URL + "casestudies/in-official-screen-hero.png",
      mainParagraph: "Luxury fashion brands face a tough problem online. Their websites rely on massive, high-resolution photography and cinematic videos to convey luxury, but those heavy files usually make the website slow and clunky. Customers get frustrated waiting for pages to load and leave before buying. For IN Official, the digital home of designer Ifeanyi Nwune, I built a custom storefront that loads in less than two seconds without sacrificing any of the rich, high-end visual polish.",
      highlights: [
        { title: "Under 2-Second Global Load Times", description: "High-res images load almost instantly so shoppers never see blank screens or stuttering animations, even on mobile data." },
        { title: "Shopify Power with Custom Design", description: "The store connects to Shopify for secure payments and inventory, while the visual frontend is completely custom-built for maximum creative freedom." },
        { title: "One-Click Quick Add", description: "Shoppers can pick sizes, select colors, and add items straight to their bag directly from collection lookbooks without getting redirected to separate pages." },
        { title: "VIP Drops & Early Access", description: "Built-in countdown timers and email capture for exclusive collection drops that notify loyal customers before items sell out." }
      ],
      features: [
        { title: "Dynamic Collection Lookbooks", description: "Interactive photo spreads that let shoppers explore editorial photoshoots and immediately see which garments are featured in each shot." },
        { title: "Slide-Out Shopping Bag", description: "A smooth cart drawer that slides in from the edge of the screen, allowing customers to review their selections and checkout without interrupting their browsing." },
        { title: "Mobile-First Luxury Layout", description: "Over 80% of high-fashion buyers shop from their phones via Instagram links. The mobile layout was carefully designed for smooth one-thumb scrolling." },
        { title: "Automated Image Compression", description: "Images are automatically optimized and served in modern formats, delivering crisp magazine-quality detail at a fraction of the file size." }
      ],
      screens: [
        {
          title: "Contemporary African Luxury Heritage Flagship",
          image: import.meta.env.BASE_URL + "casestudies/in-official-screen-hero.png",
          description: "The full-bleed hero experience introducing the brand's contemporary African luxury identity, pairing high-impact imagery with subtle navigation."
        },
        {
          title: "New Collection • Fidelitas Launch Showcase",
          image: import.meta.env.BASE_URL + "casestudies/in-official-screen-fidelitas.png",
          description: "Featured release announcement for the Fidelitas seasonal drop, pairing editorial imagery with direct lookbook exploration."
        },
        {
          title: "High-Fashion Lookbook Gallery",
          image: import.meta.env.BASE_URL + "casestudies/in-official-screen-lookbook.png",
          description: "Dual-column editorial layouts showcasing seasonal collections in dramatic detail, designed to feel like browsing an international print magazine."
        },
        {
          title: "Curated Luxury Product Showcase",
          image: import.meta.env.BASE_URL + "casestudies/in-official-screen-products.png",
          description: "Clean product cards with high-contrast framing, transparent pricing, and instant size selection for seamless checkout."
        }
      ],
      conclusion: "IN Official proved that luxury fashion websites don't have to be slow to feel premium. By pairing headless architecture with aggressive image optimization, the store delivered instant page loads and drove a noticeable increase in completed orders.",
      learnings: [
        "Speed is luxury: When affluent shoppers visit a luxury site, slow loading feels unpolished and frustrating. Making high-resolution photos load under two seconds instantly elevated perceived brand quality.",
        "Keep customers in the story: Traditional online stores force you to click back and forth between product pages and category lists. Letting customers add items straight from lookbooks reduced drop-off and boosted multi-item orders.",
        "Social media is the true storefront: Most buyers discover fashion drops through Instagram stories. If the mobile web experience doesn't load instantly within the in-app browser, the sale is lost."
      ]
    }
  },
  {
    id: 'betpanta',
    title: "betpanta",
    description: "Sports betting platform.",
    tags: ["React", "Node.js", "Sportsbook"],
    year: "2026",
    status: "Active",
    link: "https://betpanta.vercel.app",
    logo: import.meta.env.BASE_URL + "logos/betpanta.svg",
    details: {
      subtitle: "A fast, lightweight mobile sports betting app built for real-time odds and one-handed use",
      heroImage: import.meta.env.BASE_URL + "casestudies/betpanta-hero.png",
      mainParagraph: "In sports betting, timing is everything. When a team scores a goal, odds change in a split second. Bettors in Nigeria need an app that responds immediately without freezing or reloading the entire page, even on spotty mobile network connections. BetPanta was designed from the ground up as a mobile-first sportsbook that loads instantly, updates live scores in real time, and makes placing bets simple and intuitive with one hand.",
      highlights: [
        { title: "Live Instant Odds Updates", description: "Scores and odds flash red or green the exact moment they change during a live match, without needing to refresh the page." },
        { title: "Built for One-Handed Mobile Use", description: "Navigation, sports tabs, and bet placement buttons are placed right within thumb's reach at the bottom of the screen." },
        { title: "Shareable Bet Booking Codes", description: "Users can build a complex multi-match accumulator bet and generate a quick 6-letter code to share with friends on WhatsApp." },
        { title: "Reliable on Slow Connections", description: "Heavily optimized code and lightweight data transfers ensure the app opens in under a second even on 3G mobile networks." }
      ],
      features: [
        { title: "Quick Betslip Builder", description: "A clean drawer at the bottom of the screen that tracks your selections, calculates your potential payout in real time, and suggests smart combination bets." },
        { title: "Top Leagues Discovery", description: "Fast shortcuts to the Premier League, La Liga, Champions League, and Serie A so users can find today's biggest games in one tap." },
        { title: "In-Play Match Tracker", description: "Visual status tags showing match minutes, stoppage time, and current momentum for active games around the world." },
        { title: "Integrated Instant Casino", description: "Quick access to virtual sports, crash games, and instant games right inside the same app without requiring a separate wallet." }
      ],
      screens: [
        {
          title: "Live Matchday & Sportsbook Discovery",
          image: import.meta.env.BASE_URL + "casestudies/betpanta-screen-home.png",
          description: "The mobile home screen featuring game shortcuts (Panta Jet, Jackpot, Aviator), quick code loader, UEFA Europa League live match cards, and live odds."
        },
        {
          title: "Real-Time In-Play Match Feed & Dynamic Odds",
          image: import.meta.env.BASE_URL + "casestudies/betpanta-screen-live.png",
          description: "Live match tracker displaying active match clocks (90:00+ H2, 53:32 H2), real-time score updates, and fluctuating 1X2 and Over/Under betting lines."
        },
        {
          title: "Integrated Instant Win & Casino Lobby",
          image: import.meta.env.BASE_URL + "casestudies/betpanta-screen-casino.png",
          description: "Direct access to popular instant games, Golden Tomb Guardians, Aviator by Spribe, and live dealer lobbies without separate wallet transfers."
        },
        {
          title: "Interactive Odds Selection & Betslip Drawer",
          image: import.meta.env.BASE_URL + "casestudies/betpanta-screen-betslip.png",
          description: "Instant odds selection with active highlighting, real-time potential payout calculations, and shareable booking codes for community discussions."
        }
      ],
      conclusion: "BetPanta delivered a fast, rock-solid betting experience that Nigerian sports fans could rely on during high-traffic weekend matchdays. By prioritizing mobile responsiveness and zero-latency odds updates, user retention and daily bet volume surged.",
      learnings: [
        "Latency directly impacts revenue: In live sports betting, a 2-second delay means odds have already moved, causing bets to get rejected. Pushing updates over live sockets eliminated failed bets and kept users confident.",
        "Thumb zone ergonomics matter: Bettors hold their phones with one hand while watching games on TV. Putting key filters and bet buttons in the bottom third of the screen made placing bets effortless.",
        "Bet codes drive viral growth: Nigerian bettors love discussing predictions in group chats. Giving users an instant 6-letter code to reload an entire accumulator ticket became the single most shared feature in the app."
      ]
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
    logo: import.meta.env.BASE_URL + "logos/seun-daniel.png",
    details: {
      subtitle: "A high-credibility website that helps a financial advisory firm turn visitors into booked client calls",
      heroImage: import.meta.env.BASE_URL + "casestudies/simondan-screen-hero.png",
      mainParagraph: "When startups and growing companies look for financial advisors to help them restructure or raise capital, trust is the only thing that matters. A generic consulting website with stock photos and vague promises won't win serious contracts. For Simon and Dan Consulting, I created a clean, modern digital presence built around real client proof, clear service packages, and an effortless way for founders to schedule an introductory consultation call.",
      highlights: [
        { title: "Clear 3-Click Call Booking", description: "Prospective clients can learn what the firm does, review past results, and book a discovery call on the calendar without filling out tedious contact forms." },
        { title: "Proof-First Credibility Layout", description: "Prominently displays key firm milestones (10+ years in finance, 40+ companies supported, $15M+ funding raised) and verified client logos from the first screen." },
        { title: "Tailored Messaging for Two Audiences", description: "A simple toggle helps visitors self-identify whether they are an early-stage startup looking for seed funding or an established company looking to optimize cash flow." },
        { title: "Smooth, Distraction-Free Navigation", description: "Deliberately minimalist design that guides the reader step-by-step from understanding their financial problem to taking action." }
      ],
      features: [
        { title: "Interactive Services Explorer", description: "Clean cards that clearly outline financial analysis, operational efficiency, and digital transformation with transparent scope and expectations." },
        { title: "Verified Impact Case Studies", description: "Short, concrete breakdowns showing exactly how Simon and Dan helped previous clients cut costs, raise money, or streamline operations." },
        { title: "Frictionless FAQ Accordion", description: "Answers the most common client objections regarding fees, engagement timelines, and deliverables directly above the final booking button." },
        { title: "Responsive Mobile Experience", description: "Executives often read consulting links on their phone between meetings. The site looks and performs impeccably on every screen size." }
      ],
      screens: [
        {
          title: "Corporate Advisory Homepage",
          image: import.meta.env.BASE_URL + "casestudies/simondan-screen-hero.png",
          description: "High-contrast hero section with bold headline typography and immediate call-to-action buttons for booking discovery calls or making inquiries."
        },
        {
          title: "Proven Track Record & Client Ecosystem",
          image: import.meta.env.BASE_URL + "casestudies/simondan-screen-stats.png",
          description: "Demonstrating verified impact with 10+ years in finance, 40+ companies supported, and $15M+ in client funding raised alongside real client logos (solv, TENN, Blueroomcare, FannDrop)."
        },
        {
          title: "Executive Leadership & Advisory Philosophy",
          image: import.meta.env.BASE_URL + "casestudies/simondan-screen-about.png",
          description: "Clear statement of the firm's approach to financial restructuring, corporate governance, and sustainable business models."
        }
      ],
      conclusion: "Simon and Dan Consulting replaced vague corporate jargon with concrete proof and clear outcomes. The redesigned platform directly increased discovery call bookings by over 60% in the first quarter after launch.",
      learnings: [
        "Show numbers, not adjectives: Saying 'we deliver exceptional strategic advisory' convinces nobody. Stating '10+ years in finance, 40+ companies supported, and $15M+ funding raised' builds instant credibility.",
        "Remove friction before the calendar: If a founder has to type a long essay into a contact form and wait three days for an email reply, they will go elsewhere. Direct calendar booking converted twice as many leads.",
        "Clarity beats complexity: Corporate advisory services can sound intimidating. Explaining services in plain, human language helped prospective clients immediately understand how the firm could help them."
      ]
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
    logo: import.meta.env.BASE_URL + "logos/ase.png",
    details: {
      subtitle: "The official event platform for Nigeria's premier gathering of 1,000+ founders, investors, and tech leaders",
      heroImage: import.meta.env.BASE_URL + "casestudies/ase-screen-hero.png",
      mainParagraph: "Organizing a large tech conference means managing multiple moving parts at once: selling tickets across different pricing tiers, vetting startup pitch applications, confirming keynote speakers, and signing corporate sponsors. For CONVERGE 2026 (Abuja Startup Expo), I built a high-energy, conversion-focused event website that handled ticket checkout, showcased the speaker lineup, and gave attendees a clear schedule for the day.",
      highlights: [
        { title: "Fast Ticket Checkout", description: "A streamlined checkout flow that lets attendees choose between Standard, VIP, and Investor passes and complete payment in seconds." },
        { title: "Speaker & Schedule Directory", description: "An interactive lineup displaying keynote speakers, panel topics, and session times so attendees know exactly what to look forward to." },
        { title: "Four-Zone Event Explorer", description: "Visual guides explaining the four distinct conference areas: Keynote Stage, Deal Room, Demo Arena, and Founder Lounge." },
        { title: "Dedicated Intake Portals", description: "Custom application forms for startups pitching for funding, exhibition stand bookings, and press accreditation that feed directly into organizers' dashboards." }
      ],
      features: [
        { title: "Tiered Pricing Cards", description: "Clear side-by-side comparisons showing what each ticket tier includes, making it simple for companies and individuals to pick the right pass." },
        { title: "Live Countdown & Urgency Signals", description: "Early-bird price countdowns that encourage early ticket purchases before tier prices increase." },
        { title: "Sponsor & Partner Showcase", description: "Prominent, tiered logo displays that deliver real brand exposure for corporate sponsors and ecosystem partners." },
        { title: "Mobile Agenda Access", description: "On the day of the event, attendees open the schedule on their phone to quickly see which session is happening in which hall." }
      ],
      screens: [
        {
          title: "CONVERGE 2026 Main Stage Hero",
          image: import.meta.env.BASE_URL + "casestudies/ase-screen-hero.png",
          description: "Bold dark-mode visual design featuring amber accents, headline ticker announcements, and instant access to ticket purchasing and speaker applications."
        },
        {
          title: "Conference Zones & Working Ecosystem",
          image: import.meta.env.BASE_URL + "casestudies/ase-screen-ecosystem.png",
          description: "Visual guide breaking down the four active zones: Keynote Stage, Deal Room, Demo Arena, and Founder Lounge."
        },
        {
          title: "Visual Impact & Summit Photography",
          image: import.meta.env.BASE_URL + "casestudies/ase-screen-gallery.png",
          description: "High-energy photo gallery of past summit stages, live founder pitches, and venture networking sessions."
        }
      ],
      conclusion: "The CONVERGE 2026 website processed hundreds of early-bird ticket sales within days of launch and streamlined startup applications. It established immediate authority for the event and gave attendees a frictionless digital experience.",
      learnings: [
        "Clear ticket comparisons drive upgrades: When attendees can clearly see the extra perks of a VIP pass side-by-side with Standard, VIP ticket sales increased by 35%.",
        "Separate intake funnels save weeks of organizer time: Having dedicated forms for speakers, startup pitches, and sponsors that validate inputs automatically kept organizers from drowning in chaotic emails.",
        "The phone is the event guide: On conference day, nobody prints paper schedules. Making the timeline and hall directory fast and lightweight on mobile meant zero lost attendees."
      ]
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
      subtitle: "A consulting platform that helps African founders become investment-ready and raise venture capital",
      heroImage: import.meta.env.BASE_URL + "casestudies/wecreate-screen-hero.png",
      mainParagraph: "Early-stage founders in emerging markets often have brilliant product ideas but struggle with financial models, pitch decks, and investor diligence. They don't know what venture capitalists look for or how to structure their round. Wecreate Consult helps founders become fundable. I designed and built their digital platform to clearly outline their six advisory verticals, demonstrate millions in facilitated funding, and make it easy for founders to start the readiness process.",
      highlights: [
        { title: "4-Step Investment Roadmap", description: "Breaks down the daunting fundraising journey into four simple steps: Discovery & Analysis, Strategy Design, Execution & Delivery, and Growth Support." },
        { title: "Proven Funding Track Record", description: "Prominently highlights real funding figures and client startups that went on to secure institutional investment." },
        { title: "Ecosystem Credibility Marquee", description: "Features logos of key technology partners and startup ecosystems across Africa (including Kuda, Flutterwave, Paystack, and M-Pesa)." },
        { title: "Straightforward Service Verticals", description: "Organizes complex advisory offerings (financial modeling, grant writing, pitch deck prep) into clear, scannable service cards." }
      ],
      features: [
        { title: "Founder Pain-Point Navigator", description: "Helps founders quickly pinpoint what they need most—whether it's an initial pitch deck review or a complete financial audit." },
        { title: "Sector Expertise Grid", description: "Highlights specialized experience across fintech, agritech, healthtech, and logistics so founders know their industry is understood." },
        { title: "Zero-Friction Intake Questionnaire", description: "A short, guided intake form that captures key business metrics so consultants can arrive prepared for the first call." },
        { title: "Instant Discovery Scheduling", description: "Integrated calendar booking that allows qualified founders to reserve a 30-minute advisory session immediately." }
      ],
      screens: [
        {
          title: "Problem-First Venture Advisory",
          image: import.meta.env.BASE_URL + "casestudies/wecreate-screen-hero.png",
          description: "A bold, unmistakable value statement that directly tells founders how the firm prepares them to raise institutional venture capital."
        },
        {
          title: "Founder Trust & Portfolio Network",
          image: import.meta.env.BASE_URL + "casestudies/wecreate-screen-mission.png",
          description: "Real portfolio startup logos trusted by bold founders (Chalant AI, Foodie Box, Ondigo, Odoezi, Sandwich, AfriLeap Labs)."
        },
        {
          title: "Funding Facilitation & Ecosystem Metrics",
          image: import.meta.env.BASE_URL + "casestudies/wecreate-screen-impact.png",
          description: "Concrete track-record metrics showing ₦547M+ funding facilitated across 5 service lines and 60 Abuja startups mapped."
        }
      ],
      conclusion: "By transforming a dense consulting offering into a clear, problem-first narrative, Wecreate Consult attracted serious tech founders and streamlined their initial discovery workflow, leading to more high-quality advisory engagements.",
      learnings: [
        "Founders need empathy before process: Founders feeling stressed about fundraising don't want technical consulting jargon. Speaking directly to their fears ('will investors take me seriously?') established immediate trust.",
        "Structure demystifies fundraising: Breaking down the path to funding into four clear steps made a scary process feel manageable and actionable.",
        "A short intake questionnaire qualifies leads: Asking 4 simple questions (stage, revenue, amount seeking, industry) allowed the team to weed out spam and spend their time on founders they could truly help."
      ]
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
  type?: 'text' | 'color-vibe' | 'textarea';
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

The brand name is **[Brand Name]**.

[Color Context]

Use colours intentionally across the interface rather than applying them uniformly.

Here is the provided website copy that you should use to populate the content:
[Website Copy]

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
      { id: "[Brand Name]", label: "Brand Name", placeholder: "e.g. Acme Corp" },
      { id: "[Color Context]", label: "Primary brand colour or palette", type: "color-vibe" },
      { id: "[Website Copy]", label: "Website Copy", placeholder: "Paste your website copy/content here...", type: "textarea" }
    ]
  },

  {
    id: "kill-ai-slop",
    title: "Escape AI Slop - A Builder's Guide",
    type: "E-Book",
    price: "₦5,500",
    coverImage: import.meta.env.BASE_URL + "products/killaislop-cover.png",
    description: "A builder's guide to websites that look professional and feel human. Build clean websites that don't look AI-built.",
    link: "/kill-ai-slop",
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
      { id: "[Color Context]", label: "Primary brand colour or palette", type: "color-vibe" },
      { id: "[Project Name]", label: "Project Name", placeholder: "e.g. Acme Corp" },
      { id: "[Brief project description]", label: "Project Description", placeholder: "e.g. A marketplace for high-end properties" }
    ]
  }
];