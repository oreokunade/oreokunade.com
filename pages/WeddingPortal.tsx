import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Copy,
  Check,
  Heart,
  Calendar,
  Sparkles,
  Upload,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Music,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Palette,
  AlertCircle,
  Loader2,
  Gift,
  Send,
  Globe,
  Monitor,
  Smartphone
} from 'lucide-react';

interface UploadItem {
  id: string;
  file: File;
  previewUrl: string;
  category: 'hero' | 'story' | 'gallery';
  name: string;
  size: number;
}

interface WeddingFormData {
  // 1. The Couple & Custom Domain (First Names only)
  brideFirstName: string;
  brideNickname: string;
  groomFirstName: string;
  groomNickname: string;
  email: string;
  phone: string;
  hashtag: string;
  domainName: string;
  domainType: '.online' | '.com' | 'custom';

  // 2. Schedule & Venues
  eventScheduleType: 'single' | 'separate';
  weddingDate: string;
  traditionalDate: string;
  traditionalVenue: string;
  traditionalAddress: string;
  traditionalTime: string;
  traditionalDressCode: string;
  colorPalette: string;
  paletteNotes: string;
  dressCode: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyTime: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionTime: string;
  afterPartyVenue: string;
  afterPartyAddress: string;
  afterPartyTime: string;
  afterPartyNotes: string;
  scheduleNotes: string;

  // Event Segments Toggles for Single Day
  singleHasTraditional: boolean;
  singleHasCeremony: boolean;
  singleHasReception: boolean;
  singleHasAfterParty: boolean;

  // Event Segments Toggles for Separate Day
  separateHasTraditional: boolean;
  separateHasCeremony: boolean;
  separateHasReception: boolean;
  separateHasAfterParty: boolean;

  // 3. Our Love Story
  howWeMet: string;
  theProposal: string;
  milestones: string;
  coupleQuote: string;

  // 4. Registry & RSVP & Music
  rsvpDeadline: string;
  rsvpRules: string;
  bankDetails: string;
  registryLinks: string;
  backgroundSong: string;
  designStyle: string;
  driveFolderLink: string;
  additionalNotes: string;
}

const INITIAL_FORM_DATA: WeddingFormData = {
  brideFirstName: '',
  brideNickname: '',
  groomFirstName: '',
  groomNickname: '',
  email: '',
  phone: '',
  hashtag: '',
  domainName: '',
  domainType: '.online',
  driveFolderLink: '',

  eventScheduleType: 'single',
  weddingDate: '',
  traditionalDate: '',
  traditionalVenue: '',
  traditionalAddress: '',
  traditionalTime: '',
  traditionalDressCode: '',
  colorPalette: 'Emerald & Champagne Gold',
  paletteNotes: '#0B4F3A, #D4AF37, #FAF7F2',
  dressCode: 'Black Tie / Modern Luxury Traditional',
  ceremonyVenue: '',
  ceremonyAddress: '',
  ceremonyTime: '10:00 AM',
  receptionVenue: '',
  receptionAddress: '',
  receptionTime: '2:00 PM',
  afterPartyVenue: '',
  afterPartyAddress: '',
  afterPartyTime: '7:30 PM',
  afterPartyNotes: '',
  scheduleNotes: '',

  singleHasTraditional: false,
  singleHasCeremony: true,
  singleHasReception: true,
  singleHasAfterParty: false,

  separateHasTraditional: true,
  separateHasCeremony: true,
  separateHasReception: true,
  separateHasAfterParty: false,

  howWeMet: '',
  theProposal: '',
  milestones: '',
  coupleQuote: '',

  rsvpDeadline: '',
  rsvpRules: 'Adults only reception. Plus-ones strictly by invitation.',
  bankDetails: '',
  registryLinks: '',
  backgroundSong: '',
  designStyle: 'Romantic Modern Luxury',
  additionalNotes: ''
};

interface PalettePreset {
  name: string;
  hexes: string[];
  bg: string;
  textColor: string;
  accentColor: string;
  subtextColor: string;
  buttonBg: string;
  buttonText: string;
}

const SUGGESTED_PALETTES: PalettePreset[] = [
  {
    name: 'Emerald & Champagne Gold',
    hexes: ['#0B4F3A', '#D4AF37', '#FAF7F2'],
    bg: '#0A382A',
    textColor: '#FAF7F2',
    accentColor: '#D4AF37',
    subtextColor: '#C9D6CE',
    buttonBg: '#D4AF37',
    buttonText: '#06261C'
  },
  {
    name: 'Royal Navy & Rose Gold',
    hexes: ['#0F2042', '#B76E79', '#F8F9FA'],
    bg: '#0B1730',
    textColor: '#F8F9FA',
    accentColor: '#B76E79',
    subtextColor: '#BAC7DB',
    buttonBg: '#B76E79',
    buttonText: '#FFFFFF'
  },
  {
    name: 'Terracotta & Sage Minimal',
    hexes: ['#C86D51', '#8A9A86', '#F5EBE6'],
    bg: '#251E1C',
    textColor: '#F5EBE6',
    accentColor: '#C86D51',
    subtextColor: '#9DB399',
    buttonBg: '#C86D51',
    buttonText: '#FFFFFF'
  },
  {
    name: 'Burgundy & Soft Pearl',
    hexes: ['#6B1D2F', '#E8D8C8', '#1F1F1F'],
    bg: '#3B0E18',
    textColor: '#FAF7F2',
    accentColor: '#E8D8C8',
    subtextColor: '#D9B4BC',
    buttonBg: '#E8D8C8',
    buttonText: '#3B0E18'
  },
  {
    name: 'Classic Ivory & Noir',
    hexes: ['#121212', '#E5E0D8', '#997950'],
    bg: '#141414',
    textColor: '#E5E0D8',
    accentColor: '#C5A880',
    subtextColor: '#9E9E9E',
    buttonBg: '#E5E0D8',
    buttonText: '#121212'
  }
];

const MOCK_HERO_PHOTOS = [
  {
    id: 'sunset',
    label: 'Sunset Portrait',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'studio',
    label: 'Studio Romance',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'luxe',
    label: 'Luxe Celebration',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'classic',
    label: 'Classic Black-Tie',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop'
  }
];

const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxN-_Yg3t0pebr0k6AQ4VAP44dmgVvlTrfxyARClARuwlwbU3ImB9mWHi-rXP_tgYOx2Q/exec';
const STORAGE_KEY = 'wedding_portal_draft_v1';


export const generateWeddingAiPrompt = (data: WeddingFormData, domain: string): string => {
  const p1 = data.brideFirstName || data.partner1Name || 'Partner 1';
  const p2 = data.groomFirstName || data.partner2Name || 'Partner 2';
  const couple = `${p1} & ${p2}`;

  const scheduleLines: string[] = [];
  if (data.eventScheduleType === 'separate') {
    scheduleLines.push(`- Schedule Format: Separate Day Events (Traditional & Main Wedding)`);
    if (data.separateHasTraditional) {
      scheduleLines.push(`- Day 1 (Traditional Wedding): ${data.traditionalDate || 'TBD'}`);
      scheduleLines.push(`  Venue: ${data.traditionalVenue || 'TBD'} at ${data.traditionalTime || 'TBD'}`);
      if (data.traditionalAddress) scheduleLines.push(`  Address / Location: ${data.traditionalAddress}`);
      if (data.traditionalDressCode) scheduleLines.push(`  Attire / Aso-Ebi: ${data.traditionalDressCode}`);
    }
    scheduleLines.push(`- Day 2 (Main Wedding): ${data.weddingDate || 'TBD'}`);
    if (data.colorPalette) scheduleLines.push(`  Colour of the Day: ${data.colorPalette}${data.paletteNotes ? ` (Notes: ${data.paletteNotes})` : ''}`);
    if (data.dressCode) scheduleLines.push(`  Dress Code: ${data.dressCode}`);
    if (data.separateHasCeremony) {
      scheduleLines.push(`  Ceremony: ${data.ceremonyVenue || 'TBD'} at ${data.ceremonyTime || 'TBD'}${data.ceremonyAddress ? ` (${data.ceremonyAddress})` : ''}`);
    }
    if (data.separateHasReception) {
      scheduleLines.push(`  Reception: ${data.receptionVenue || 'TBD'} at ${data.receptionTime || 'TBD'}${data.receptionAddress ? ` (${data.receptionAddress})` : ''}`);
    }
    if (data.separateHasAfterParty) {
      scheduleLines.push(`  After-Party: ${data.afterPartyVenue || 'TBD'} at ${data.afterPartyTime || 'TBD'}${data.afterPartyAddress ? ` (${data.afterPartyAddress})` : ''}`);
      if (data.afterPartyNotes) scheduleLines.push(`  After-Party Notes: ${data.afterPartyNotes}`);
    }
  } else {
    scheduleLines.push(`- Schedule Format: Single Day Event`);
    scheduleLines.push(`- Main Wedding Date: ${data.weddingDate || 'TBD'}`);
    if (data.colorPalette) scheduleLines.push(`- Colour of the Day: ${data.colorPalette}${data.paletteNotes ? ` (Notes: ${data.paletteNotes})` : ''}`);
    if (data.dressCode) scheduleLines.push(`- Dress Code: ${data.dressCode}`);
    if (data.singleHasTraditional) {
      scheduleLines.push(`- Traditional Wedding: ${data.traditionalVenue || 'TBD'} at ${data.traditionalTime || 'Morning'}${data.traditionalAddress ? ` (${data.traditionalAddress})` : ''}`);
    }
    if (data.singleHasCeremony) {
      scheduleLines.push(`- Ceremony: ${data.ceremonyVenue || 'TBD'} at ${data.ceremonyTime || 'TBD'}${data.ceremonyAddress ? ` (${data.ceremonyAddress})` : ''}`);
    }
    if (data.singleHasReception) {
      scheduleLines.push(`- Reception: ${data.receptionVenue || 'TBD'} at ${data.receptionTime || 'TBD'}${data.receptionAddress ? ` (${data.receptionAddress})` : ''}`);
    }
    if (data.singleHasAfterParty) {
      scheduleLines.push(`- After-Party: ${data.afterPartyVenue || 'TBD'} at ${data.afterPartyTime || 'TBD'}${data.afterPartyAddress ? ` (${data.afterPartyAddress})` : ''}`);
      if (data.afterPartyNotes) scheduleLines.push(`- After-Party Notes: ${data.afterPartyNotes}`);
    }
  }

  return `You are an expert full-stack developer and luxury UI/UX designer. Build a complete, responsive, modern luxury wedding website for ${couple} using React, Tailwind CSS, and Framer Motion based on the following verified client specifications:

==============================================
1. THE COUPLE & WEBSITE IDENTITY
==============================================
- Couple: ${couple}
- Bride / Partner 1: ${data.brideFirstName || data.partner1Name || 'Bride'}${data.brideNickname ? ` (Nickname: ${data.brideNickname})` : ''}
- Groom / Partner 2: ${data.groomFirstName || data.partner2Name || 'Groom'}${data.groomNickname ? ` (Nickname: ${data.groomNickname})` : ''}
- Official Wedding Hashtag: ${data.hashtag || 'None'}
- Custom Domain: https://${domain}
- Primary Email: ${data.email || 'N/A'}
- WhatsApp / Phone: ${data.phone || 'N/A'}

==============================================
2. EVENT SCHEDULE & VENUES
==============================================
${scheduleLines.join('\n')}

==============================================
3. LOVE STORY & GUEST QUOTE
==============================================
- Guest Welcome Quote: "${data.coupleQuote || ''}"
- How We Met: "${data.howWeMet || ''}"
- The Proposal: "${data.theProposal || ''}"
- Key Milestones: "${data.milestones || ''}"

==============================================
4. GUEST ATTENDANCE & REGISTRY
==============================================
- RSVP Deadline: ${data.rsvpDeadline || 'TBD'}
- RSVP Guidelines / Policy: "${data.rsvpRules || 'Kindly RSVP by the deadline'}"
- Bank Transfer / Cash Registry: ${data.bankDetails || 'N/A'}
- External Registry Links: ${data.registryLinks || 'N/A'}

==============================================
5. AUDIO, ASSETS & SPECIAL REQUESTS
==============================================
- Signature Background Song: ${data.backgroundSong || 'Not specified'}
- Photographer Cloud / Google Drive Album: ${data.driveFolderLink || 'None provided'}
- Additional Custom Requests: "${data.additionalNotes || 'None'}"

==============================================
KEY DESIGN & FUNCTIONAL REQUIREMENTS:
==============================================
1. Luxury Hero Section: High-fashion typography, countdown timer to the wedding date, and wedding hashtag.
2. Event Itinerary: Clear cards for each event with venue addresses, times, and dress code indications.
3. Interactive Love Story: Beautiful timeline highlighting their journey from first meeting to engagement.
4. RSVP Form / Modal: Seamless attendance confirmation adhering to the RSVP rules and deadline.
5. Gift Registry: 1-click copy-to-clipboard for bank details and links to external wishlists.
6. Ambient Music Player: Floating or fixed player playing "${data.backgroundSong || 'romantic background instrumental'}" with toggle controls.
7. Mobile-First Luxury: Seamless responsiveness for iOS and Android devices with smooth, polished Framer Motion transitions.`;
};

const WeddingPortal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WeddingFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_FORM_DATA, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load draft from localStorage', e);
    }
    return INITIAL_FORM_DATA;
  });

  const [files, setFiles] = useState<UploadItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [progressStatusText, setProgressStatusText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-save form draft to localStorage on any input change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      // Ignore private browsing or quota limits
    }
  }, [formData]);

  const handleClearDraft = () => {
    if (window.confirm("Are you sure you want to clear your saved draft and reset the form?")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setFormData(INITIAL_FORM_DATA);
      setFiles([]);
      setCurrentStep(1);
    }
  };

  // Preview Device & Mock Photo State
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedMockPhotoIndex, setSelectedMockPhotoIndex] = useState<number>(0);
  const [expandedPalette, setExpandedPalette] = useState<string | null>(null);

  // Input file references
  const heroInputRef = useRef<HTMLInputElement>(null);
  const storyInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDomainNameChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, domainName: clean }));
  };

  const handleFileSelect = (category: 'hero' | 'story' | 'gallery', selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newItems: UploadItem[] = [];
    Array.from(selectedFiles).forEach(file => {
      const isImage = file.type.startsWith('image/');
      const previewUrl = isImage ? URL.createObjectURL(file) : '';

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl,
        category,
        name: file.name,
        size: file.size
      });
    });

    if (category === 'hero') {
      setFiles(prev => [...prev.filter(f => f.category !== 'hero'), ...newItems.slice(0, 1)]);
    } else {
      setFiles(prev => [...prev, ...newItems]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const item = prev.find(f => f.id === id);
      if (item && item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Names logic: Nickname takes precedence if provided, otherwise First Name
  const brideDisplay = useMemo(() => {
    return formData.brideNickname.trim() || formData.brideFirstName.trim() || 'Bride';
  }, [formData.brideNickname, formData.brideFirstName]);

  const groomDisplay = useMemo(() => {
    return formData.groomNickname.trim() || formData.groomFirstName.trim() || 'Groom';
  }, [formData.groomNickname, formData.groomFirstName]);

  // Current active palette preset for live hero preview
  const currentPalettePreset = useMemo(() => {
    const found = SUGGESTED_PALETTES.find(p => p.name === formData.colorPalette);
    if (found) return found;
    // Custom fallback
    return {
      name: formData.colorPalette || 'Custom Palette',
      hexes: ['#121212', '#D4AF37', '#FAF7F2'],
      bg: '#141414',
      textColor: '#FAF7F2',
      accentColor: '#D4AF37',
      subtextColor: '#C9D6CE',
      buttonBg: '#D4AF37',
      buttonText: '#121212'
    };
  }, [formData.colorPalette]);

  // Active hero background image
  const activeHeroPhotoUrl = useMemo(() => {
    const uploadedHero = files.find(f => f.category === 'hero');
    if (selectedMockPhotoIndex === -1 && uploadedHero) {
      return uploadedHero.previewUrl;
    }
    const idx = selectedMockPhotoIndex >= 0 ? selectedMockPhotoIndex : 0;
    return MOCK_HERO_PHOTOS[idx]?.url || MOCK_HERO_PHOTOS[0].url;
  }, [files, selectedMockPhotoIndex]);

  // Submission handler
  const handleSubmitAll = async () => {
    if (!formData.brideFirstName.trim()) {
      setErrorMsg("Please enter the Bride's First Name (in Step 1) before submitting.");
      return;
    }
    if (!formData.groomFirstName.trim()) {
      setErrorMsg("Please enter the Groom's First Name (in Step 1) before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSubmissionProgress(5);
    setProgressStatusText('Initializing your project onboarding...');

    try {
      const initPayload = {
        action: 'init',
        partner1Name: brideDisplay,
        partner2Name: groomDisplay,
        brideFirstName: formData.brideFirstName,
        brideNickname: formData.brideNickname,
        groomFirstName: formData.groomFirstName,
        groomNickname: formData.groomNickname,
        weddingDate: formData.weddingDate,
        email: formData.email || '',
        phone: formData.phone || '',
        hashtag: formData.hashtag,
        domainName: formData.domainName,
        domainType: formData.domainType === '.online' ? '.online (Included)' : formData.domainType === '.com' ? '.com (+₦15,000 Add-on)' : 'Custom domain'
      };

      const initRes = await fetch(DEFAULT_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(initPayload)
      });

      const initData = await initRes.json();
      if (initData.status !== 'success') {
        throw new Error(initData.message || 'Failed to initialize project records.');
      }

      const { folderId, subfolders, rowIndex, clientTabName } = initData;
      setSubmissionProgress(25);

      // Upload Photos
      const totalFiles = files.length;
      if (totalFiles > 0) {
        for (let i = 0; i < totalFiles; i++) {
          const item = files[i];
          const targetFolderId =
            item.category === 'hero' ? subfolders.hero :
            item.category === 'story' ? subfolders.story :
            subfolders.gallery;

          setProgressStatusText(`Uploading photo ${i + 1} of ${totalFiles}...`);
          const base64Data = await fileToBase64(item.file);

          await fetch(DEFAULT_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'uploadFile',
              folderId: targetFolderId,
              filename: item.name,
              mimeType: item.file.type || 'image/jpeg',
              base64Data
            })
          });

          const fileProgress = 25 + Math.round(((i + 1) / totalFiles) * 60);
          setSubmissionProgress(fileProgress);
        }
      }

      setProgressStatusText('Finalizing creative brief and project dashboard...');
      setSubmissionProgress(90);

      await fetch(DEFAULT_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'finalize',
          folderId,
          rowIndex,
          clientTabName,
          details: {
            ...formData,
            partner1Name: brideDisplay,
            partner2Name: groomDisplay,
            partner1Nickname: formData.brideNickname,
            partner2Nickname: formData.groomNickname,
            domainType: '.online (Included)',
            computedDomain: computedDomainPreview,
            driveFolderLink: formData.driveFolderLink || '',
            aiPrompt: aiPromptText
          }
        })
      });

      setSubmissionProgress(100);
      setProgressStatusText('Submitted successfully!');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 500);

    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMsg(err.message || 'An error occurred during upload. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const heroPhotos = files.filter(f => f.category === 'hero');
  const storyPhotos = files.filter(f => f.category === 'story');
  const galleryPhotos = files.filter(f => f.category === 'gallery');

  const computedDomainPreview = `${formData.domainName || 'couple'}.online`;

  const aiPromptText = useMemo(() => {
    return generateWeddingAiPrompt(formData, computedDomainPreview);
  }, [formData, computedDomainPreview]);

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative pt-24 pb-20 px-4 md:px-8 transition-colors duration-300">
      
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Top bar with back button and draft indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to oreokunade.com</span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Draft saved
            </span>
            <button
              type="button"
              onClick={handleClearDraft}
              className="text-neutral-400 hover:text-rose-500 transition-colors underline decoration-dotted"
              title="Reset saved form inputs"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wide uppercase mb-4">
            <Heart size={13} className="fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white" />
            <span>Wedding Website Onboarding Portal</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
            Let's Craft Your Dream Wedding Website
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Fill in your wedding details, love story, and upload your high-resolution photos to help us craft your custom website.
          </p>
        </div>

        {/* SUCCESS STATE */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 text-center shadow-xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mx-auto mb-6 text-neutral-900 dark:text-white shadow-inner">
              <CheckCircle2 size={42} />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
              We've Received Your Wedding Details!
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Congratulations <span className="font-semibold text-neutral-900 dark:text-white">{brideDisplay} & {groomDisplay}</span>!
              All your wedding information, chosen domain, and {files.length} photos have been received. We are ready to begin crafting your wedding website.
            </p>

            {/* Next Steps Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase mb-1 font-semibold">Step 01</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Audio & Wireframes</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">We source "{formData.backgroundSong || 'your song'}" and assemble initial visual wireframes.</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase mb-1 font-semibold">Step 02</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Interactive Staging</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">You'll receive a private staging link to preview animations and test RSVP forms.</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                <div className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase mb-1 font-semibold">Step 03</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Domain & Launch</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Configuring {computedDomainPreview} and taking your custom website live!</div>
              </div>
            </div>

                        {/* AI Prompt Box on Success Screen */}
            <div className="p-5 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 text-left space-y-3 max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wider text-neutral-200">
                    AI Website Builder Prompt
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(aiPromptText);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 text-xs font-bold transition-all shrink-0 self-start sm:self-center"
                >
                  {copiedPrompt ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy AI Prompt'}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-400">
                Copy and paste this prompt directly into an AI coding assistant (like Antigravity, Claude, or Cursor) to build the custom wedding website with all provided information.
              </p>
              <textarea
                readOnly
                rows={6}
                value={aiPromptText}
                className="w-full p-3 rounded-xl bg-black/60 border border-neutral-800 text-neutral-300 font-mono text-[11px] leading-relaxed resize-y focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm shadow-sm"
              >
                Return to Portfolio
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFiles([]);
                  setFormData(INITIAL_FORM_DATA);
                }}
                className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium transition-colors text-sm"
              >
                Submit Another Form
              </button>
            </div>
          </motion.div>
        ) : (
          /* MULTI-STEP FORM WORKFLOW */
          <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-lg backdrop-blur-xl">

            {/* Stepper Header: Free Navigation without blocking */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2 scrollbar-none gap-2">
                {[
                  { num: 1, label: 'The Couple & Domain' },
                  { num: 2, label: 'Schedule & Venues' },
                  { num: 3, label: 'Our Story' },
                  { num: 4, label: 'Registry & Music' },
                  { num: 5, label: 'Photo Uploads' },
                  { num: 6, label: 'Review & Submit' }
                ].map(step => (
                  <button
                    key={step.num}
                    onClick={() => {
                      if (!isSubmitting) {
                        setErrorMsg(null);
                        setCurrentStep(step.num);
                      }
                    }}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                      currentStep === step.num
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md font-semibold'
                        : currentStep > step.num
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      currentStep === step.num
                        ? 'bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white'
                        : currentStep > step.num
                        ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {currentStep > step.num ? '✓' : step.num}
                    </span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                ))}
              </div>

              {/* Progress Line */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-neutral-900 dark:bg-white h-full"
                  initial={false}
                  animate={{ width: `${(currentStep / 6) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* ERROR ALERT */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-600 dark:text-rose-300 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
                <div className="flex-1">
                  <div className="font-semibold text-rose-700 dark:text-rose-200">Required Before Submitting</div>
                  <div className="text-xs text-rose-600/90 dark:text-rose-300/90 mt-0.5">{errorMsg}</div>
                </div>
                {currentStep === 6 && (
                  <button
                    onClick={() => {
                      setErrorMsg(null);
                      setCurrentStep(1);
                    }}
                    className="text-xs underline font-semibold text-rose-700 dark:text-rose-200 hover:text-rose-900"
                  >
                    Go to Step 1
                  </button>
                )}
              </div>
            )}

            {/* FORM STEPS */}
            <AnimatePresence mode="wait">
              {/* STEP 1: The Couple & Custom Domain (First Names only) */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Heart size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 1: The Couple & Domain Choice
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Provide first names and optional nicknames (used on your website hero and headlines).
                    </p>
                  </div>

                  {/* SECTION 1: COUPLE'S NAMES & HASHTAG */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Heart size={16} className="text-neutral-700 dark:text-neutral-300" />
                      <span>Couple's Names & Identity</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Enter first names and optional preferred nicknames for headings and hero displays.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Bride's First Name *
                      </label>
                      <input
                        type="text"
                        name="brideFirstName"
                        value={formData.brideFirstName}
                        onChange={handleChange}
                        placeholder="e.g. Adetola"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Bride's Nickname (Optional)
                      </label>
                      <input
                        type="text"
                        name="brideNickname"
                        value={formData.brideNickname}
                        onChange={handleChange}
                        placeholder="e.g. Tola (used on website if filled)"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Groom's First Name *
                      </label>
                      <input
                        type="text"
                        name="groomFirstName"
                        value={formData.groomFirstName}
                        onChange={handleChange}
                        placeholder="e.g. Babatunde"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Groom's Nickname (Optional)
                      </label>
                      <input
                        type="text"
                        name="groomNickname"
                        value={formData.groomNickname}
                        onChange={handleChange}
                        placeholder="e.g. Tunde (used on website if filled)"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Official Wedding Hashtag
                      </label>
                      <input
                        type="text"
                        name="hashtag"
                        value={formData.hashtag}
                        onChange={handleChange}
                        placeholder="e.g. #TheTolaTundeAffair2026"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* SECTION 2: WEDDING WEBSITE DOMAIN (.online only) */}
                    <div className="md:col-span-2 p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">Your Wedding Website Domain</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono">
                          Included Free (.online)
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        Your custom wedding website is published on your dedicated <strong className="text-neutral-900 dark:text-white font-semibold">.online</strong> address, included 100% free with your package.
                      </p>

                      {/* Domain Input Field */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                          Desired Domain Name
                        </label>
                        <div className="flex items-center rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 overflow-hidden focus-within:border-neutral-900 dark:focus-within:border-white transition-colors">
                          <span className="pl-4 pr-1 text-xs text-neutral-400 select-none font-mono">https://</span>
                          <input
                            type="text"
                            value={formData.domainName}
                            onChange={e => handleDomainNameChange(e.target.value)}
                            placeholder="tolatunde26"
                            className="flex-1 py-3 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none text-sm font-mono"
                          />
                          <span className="pr-4 pl-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 select-none">
                            .online
                          </span>
                        </div>

                        {formData.domainName && (
                          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                            <Sparkles size={12} className="text-neutral-600 dark:text-neutral-400" />
                            <span>Preview: <strong className="text-neutral-900 dark:text-white">https://{computedDomainPreview}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Schedule, Venues & LIVE COLOR PALETTE HERO PREVIEW */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Calendar size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 2: Dates, Venues & Colour Schemes
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Configure your schedule structure, venue addresses, and choose your live website design aesthetic.
                    </p>
                  </div>

                  {/* SECTION 1: THEME & LIVE PALETTE PREVIEW */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Palette size={16} className="text-neutral-700 dark:text-neutral-300" />
                      <span>Website Theme & Live Palette Preview</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Select an aesthetic colour scheme below to preview your live mobile and desktop design instantly.
                    </p>
                  </div>

                  {/* QUICK COLOR PALETTE SELECTION */}
                  <div className="p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Palette size={14} className="text-neutral-700 dark:text-neutral-300" />
                      Aesthetic Colour Schemes (Click to apply & preview)
                    </label>
                    {/* MOBILE VIEW PALETTES: EXPANDABLE ACCORDIONS */}
                    <div className="space-y-3 mb-5 md:hidden">
                      {SUGGESTED_PALETTES.map(p => {
                        const isExpanded = expandedPalette === p.name;
                        const isSelected = formData.colorPalette === p.name;

                        return (
                          <div
                            key={p.name}
                            className={`rounded-2xl border transition-all overflow-hidden ${
                              isSelected
                                ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 shadow-sm'
                                : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 hover:border-neutral-300'
                            }`}
                          >
                            {/* Palette Header Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  colorPalette: p.name,
                                  paletteNotes: p.hexes.join(', ')
                                }));
                                setExpandedPalette(prev => (prev === p.name ? null : p.name));
                              }}
                              className="w-full p-4 flex items-center justify-between text-left"
                            >
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{p.name}</span>
                                  {isSelected && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-neutral-500">
                                  {isExpanded ? 'Tap to contract example ▲' : 'Tap to expand & preview example ▼'}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 shrink-0">
                                  {p.hexes.map(hex => (
                                    <span
                                      key={hex}
                                      className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                                      style={{ backgroundColor: hex }}
                                    />
                                  ))}
                                </div>
                                <div className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </div>
                              </div>
                            </button>

                            {/* EXPANDED EXAMPLE PREVIEW (Animated Accordion) */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="border-t border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50/90 dark:bg-neutral-950/90"
                                >
                                  {/* Mock photo selector pills */}
                                  <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-[11px] font-semibold text-neutral-500 shrink-0">Photo:</span>
                                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                                      {MOCK_HERO_PHOTOS.map((photo, pIdx) => (
                                        <button
                                          key={photo.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMockPhotoIndex(pIdx);
                                          }}
                                          className={`px-2 py-1 rounded-full text-[10px] font-medium border shrink-0 transition-all ${
                                            selectedMockPhotoIndex === pIdx
                                              ? 'border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold'
                                              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                                          }`}
                                        >
                                          {photo.label.split(' ')[0]}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Mobile phone mockup preview */}
                                  <div className="w-full max-w-[310px] mx-auto rounded-[36px] border-[6px] border-neutral-800 dark:border-neutral-700 shadow-2xl overflow-hidden bg-neutral-900 mb-3">
                                    {/* Phone status bar */}
                                    <div className="px-5 pt-2.5 pb-1 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                                      <span>9:41</span>
                                      <div className="w-16 h-3 bg-black rounded-full" />
                                      <span>5G</span>
                                    </div>

                                    {/* Mockup Hero Frame */}
                                    <div className="relative min-h-[370px] flex flex-col items-center justify-between text-center p-5 overflow-hidden">
                                      {/* Background Photo */}
                                      <div
                                        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                                        style={{ backgroundImage: `url("${activeHeroPhotoUrl}")` }}
                                      />
                                      {/* Gradient Overlay using this palette's bg color */}
                                      <div
                                        className="absolute inset-0 transition-colors duration-500"
                                        style={{
                                          background: `linear-gradient(180deg, ${p.bg}B3 0%, ${p.bg}F0 100%)`
                                        }}
                                      />

                                      {/* Domain Bar */}
                                      <div className="relative z-10 w-full flex items-center justify-between text-[10px] pb-1.5 border-b border-white/10 text-neutral-300 font-mono">
                                        <span className="truncate max-w-[130px]">{computedDomainPreview}</span>
                                        <span>MENU ☰</span>
                                      </div>

                                      {/* Hero Content */}
                                      <div className="relative z-10 w-full my-auto flex flex-col items-center py-4">
                                        {/* Monogram / Hashtag */}
                                        <div
                                          style={{
                                            borderColor: p.accentColor + '50',
                                            color: p.accentColor,
                                            backgroundColor: p.bg + '80'
                                          }}
                                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] uppercase tracking-wider mb-3 font-mono font-medium backdrop-blur-xs"
                                        >
                                          <span>✦</span>
                                          <span className="truncate max-w-[170px]">{formData.hashtag || 'The Wedding'}</span>
                                          <span>✦</span>
                                        </div>

                                        {/* Couple Names */}
                                        <h4
                                          style={{ color: p.textColor }}
                                          className="text-3xl font-serif font-normal tracking-tight mb-2 drop-shadow-xs"
                                        >
                                          {brideDisplay} &amp; {groomDisplay}
                                        </h4>

                                        {/* Date & Venue */}
                                        <p
                                          style={{ color: p.subtextColor }}
                                          className="text-[11px] tracking-wider uppercase mb-5 font-sans font-medium"
                                        >
                                          {formData.weddingDate ? new Date(formData.weddingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'December 18, 2026'}
                                          {formData.ceremonyVenue ? ` • ${formData.ceremonyVenue}` : ' • Lagos, Nigeria'}
                                        </p>

                                        {/* Action buttons */}
                                        <div className="flex flex-col gap-2 w-full max-w-[190px]">
                                          <div
                                            style={{
                                              backgroundColor: p.buttonBg,
                                              color: p.buttonText
                                            }}
                                            className="w-full py-2 rounded-full text-[11px] font-bold shadow-md text-center"
                                          >
                                            RSVP to Attend
                                          </div>
                                          <div
                                            style={{
                                              borderColor: p.accentColor + '70',
                                              color: p.textColor,
                                              backgroundColor: 'rgba(0,0,0,0.2)'
                                            }}
                                            className="w-full py-1.5 rounded-full text-[10px] font-medium border backdrop-blur-xs text-center"
                                          >
                                            Our Love Story
                                          </div>
                                        </div>
                                      </div>

                                      {/* Home bar */}
                                      <div className="relative z-10 w-20 h-1 bg-white/40 rounded-full mx-auto mt-2" />
                                    </div>
                                  </div>

                                  {/* Bottom bar inside expanded accordion */}
                                  <div className="flex items-center justify-between pt-1">
                                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                      <CheckCircle2 size={13} />
                                      <span>{p.name}</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedPalette(null);
                                      }}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-200/80 dark:bg-neutral-800 transition-colors"
                                    >
                                      <ChevronUp size={14} />
                                      <span>Contract Example</span>
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {/* DESKTOP VIEW PALETTES GRID */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                      {SUGGESTED_PALETTES.map(p => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              colorPalette: p.name,
                              paletteNotes: p.hexes.join(', ')
                            }));
                          }}
                          className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                            formData.colorPalette === p.name
                              ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-800 shadow-sm'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/60 dark:bg-neutral-900/40'
                          }`}
                        >
                          <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</span>
                          <div className="flex gap-1.5 shrink-0 ml-2">
                            {p.hexes.map(hex => (
                              <span
                                key={hex}
                                className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* LIVE HERO SECTION MOCKUP / PREVIEW (Desktop view) */}
                    <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800 hidden md:block">
                      
                      {/* Controls Header: View Toggle & Photo Switcher */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                            <Sparkles size={14} className="text-neutral-700 dark:text-neutral-300" />
                            Live Website Hero Preview
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            See your names &amp; palette on real wedding photography
                          </span>
                        </div>

                        {/* Device Switcher (Desktop / Mobile) */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setPreviewDevice('desktop')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              previewDevice === 'desktop'
                                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                            }`}
                          >
                            <Monitor size={13} />
                            <span>Desktop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewDevice('mobile')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              previewDevice === 'mobile'
                                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                            }`}
                          >
                            <Smartphone size={13} />
                            <span>Mobile</span>
                          </button>
                        </div>
                      </div>

                      {/* Mock Photos Selector */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                        <span className="text-[11px] font-medium text-neutral-500 shrink-0">Mock Photo:</span>
                        {MOCK_HERO_PHOTOS.map((photo, idx) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => setSelectedMockPhotoIndex(idx)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all shrink-0 border ${
                              selectedMockPhotoIndex === idx
                                ? 'border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                                : 'border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                            }`}
                          >
                            {photo.label}
                          </button>
                        ))}
                        {files.some(f => f.category === 'hero') && (
                          <button
                            type="button"
                            onClick={() => setSelectedMockPhotoIndex(-1)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all shrink-0 border ${
                              selectedMockPhotoIndex === -1
                                ? 'border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                                : 'border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            📷 Your Uploaded Photo
                          </button>
                        )}
                      </div>

                      {/* DESKTOP PREVIEW FRAME */}
                      {previewDevice === 'desktop' && (
                        <div className="rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-xl transition-all">
                          {/* Desktop Browser Bar */}
                          <div className="px-4 py-2.5 bg-neutral-200/90 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block opacity-80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block opacity-80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block opacity-80" />
                              <span className="ml-3 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/80 dark:bg-neutral-800">
                                <span>🔒</span>
                                <span>https://{computedDomainPreview}</span>
                              </span>
                            </div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 hidden sm:inline">
                              Desktop View
                            </span>
                          </div>

                          {/* Desktop Hero Body with Background Image & Palette Tint */}
                          <div className="relative min-h-[420px] md:min-h-[460px] flex flex-col items-center justify-center text-center p-8 md:p-14 overflow-hidden">
                            {/* Background Photo */}
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
                              style={{ backgroundImage: `url("${activeHeroPhotoUrl}")` }}
                            />
                            {/* Palette Gradient Tint Overlay */}
                            <div
                              className="absolute inset-0 transition-colors duration-500"
                              style={{
                                background: `linear-gradient(180deg, ${currentPalettePreset.bg}B3 0%, ${currentPalettePreset.bg}E6 100%)`
                              }}
                            />

                            {/* Content Aligned Vertically & Horizontally */}
                            <motion.div
                              key={`${currentPalettePreset.name}-${selectedMockPhotoIndex}-desktop`}
                              initial={{ opacity: 0.8, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
                            >
                              {/* Top Monogram / Badge */}
                              <div
                                style={{
                                  borderColor: currentPalettePreset.accentColor + '50',
                                  color: currentPalettePreset.accentColor,
                                  backgroundColor: currentPalettePreset.bg + '80'
                                }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] uppercase tracking-widest mb-5 font-mono font-medium backdrop-blur-xs"
                              >
                                <span>✦</span>
                                <span>{formData.hashtag || 'The Wedding Celebration'}</span>
                                <span>✦</span>
                              </div>

                              {/* Couple Names */}
                              <h3
                                style={{ color: currentPalettePreset.textColor }}
                                className="text-4xl md:text-6xl font-serif font-normal tracking-tight mb-4 drop-shadow-xs"
                              >
                                {brideDisplay} &amp; {groomDisplay}
                              </h3>

                              {/* Wedding Date / Venue */}
                              <p
                                style={{ color: currentPalettePreset.subtextColor }}
                                className="text-xs md:text-sm tracking-widest uppercase mb-8 font-sans font-medium"
                              >
                                {formData.weddingDate ? new Date(formData.weddingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'December 18, 2026'}
                                {formData.ceremonyVenue ? ` • ${formData.ceremonyVenue}` : ' • Lagos, Nigeria'}
                              </p>

                              {/* Action Buttons */}
                              <div className="flex items-center justify-center gap-3">
                                <div
                                  style={{
                                    backgroundColor: currentPalettePreset.buttonBg,
                                    color: currentPalettePreset.buttonText
                                  }}
                                  className="px-6 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                  RSVP to Attend
                                </div>
                                <div
                                  style={{
                                    borderColor: currentPalettePreset.accentColor + '70',
                                    color: currentPalettePreset.textColor,
                                    backgroundColor: 'rgba(0,0,0,0.2)'
                                  }}
                                  className="px-6 py-2.5 rounded-full text-xs font-medium border backdrop-blur-xs cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                  Our Love Story
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      )}

                      {/* MOBILE PREVIEW FRAME */}
                      {previewDevice === 'mobile' && (
                        <div className="w-full max-w-[340px] mx-auto rounded-[42px] border-[7px] border-neutral-800 dark:border-neutral-700 shadow-2xl overflow-hidden bg-neutral-900 transition-all">
                          {/* Mobile Dynamic Island / Status Bar */}
                          <div className="px-5 pt-3 pb-2 bg-neutral-950 flex items-center justify-between text-[11px] text-neutral-400 font-medium select-none">
                            <span>9:41</span>
                            {/* Dynamic Island Pill */}
                            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-neutral-900" />
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <span>5G</span>
                              <span className="w-3.5 h-2 rounded-xs border border-neutral-400 inline-block p-0.5"><span className="w-full h-full bg-neutral-400 block rounded-xs" /></span>
                            </div>
                          </div>

                          {/* Mobile Hero Body */}
                          <div className="relative min-h-[460px] flex flex-col items-center justify-between text-center p-6 pb-8 overflow-hidden">
                            {/* Background Photo */}
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
                              style={{ backgroundImage: `url("${activeHeroPhotoUrl}")` }}
                            />
                            {/* Palette Gradient Tint Overlay */}
                            <div
                              className="absolute inset-0 transition-colors duration-500"
                              style={{
                                background: `linear-gradient(180deg, ${currentPalettePreset.bg}B3 0%, ${currentPalettePreset.bg}F0 100%)`
                              }}
                            />

                            {/* Mobile Top Small Header */}
                            <div className="relative z-10 w-full flex items-center justify-between text-[10px] pb-2 border-b border-white/10 text-neutral-300">
                              <span className="font-mono truncate max-w-[140px]">{computedDomainPreview}</span>
                              <span className="font-mono">MENU ☰</span>
                            </div>

                            {/* Mobile Centered Content */}
                            <motion.div
                              key={`${currentPalettePreset.name}-${selectedMockPhotoIndex}-mobile`}
                              initial={{ opacity: 0.8, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10 w-full my-auto flex flex-col items-center"
                            >
                              {/* Top Badge */}
                              <div
                                style={{
                                  borderColor: currentPalettePreset.accentColor + '50',
                                  color: currentPalettePreset.accentColor,
                                  backgroundColor: currentPalettePreset.bg + '80'
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider mb-4 font-mono font-medium backdrop-blur-xs"
                              >
                                <span>✦</span>
                                <span className="truncate max-w-[200px]">{formData.hashtag || 'The Wedding'}</span>
                                <span>✦</span>
                              </div>

                              {/* Names */}
                              <h3
                                style={{ color: currentPalettePreset.textColor }}
                                className="text-3xl font-serif font-normal tracking-tight mb-2.5 leading-tight"
                              >
                                {brideDisplay} <br />
                                <span className="text-2xl font-sans italic opacity-80">&amp;</span> <br />
                                {groomDisplay}
                              </h3>

                              {/* Date */}
                              <p
                                style={{ color: currentPalettePreset.subtextColor }}
                                className="text-[11px] tracking-wider uppercase mb-6 font-sans font-medium"
                              >
                                {formData.weddingDate ? new Date(formData.weddingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Dec 18, 2026'}
                                {formData.ceremonyVenue ? ` • ${formData.ceremonyVenue}` : ''}
                              </p>

                              {/* Mobile Stacked Buttons */}
                              <div className="w-full flex flex-col gap-2">
                                <div
                                  style={{
                                    backgroundColor: currentPalettePreset.buttonBg,
                                    color: currentPalettePreset.buttonText
                                  }}
                                  className="w-full py-2.5 rounded-full text-xs font-bold shadow-md text-center"
                                >
                                  RSVP to Attend
                                </div>
                                <div
                                  style={{
                                    borderColor: currentPalettePreset.accentColor + '60',
                                    color: currentPalettePreset.textColor,
                                    backgroundColor: 'rgba(0,0,0,0.2)'
                                  }}
                                  className="w-full py-2 rounded-full text-xs font-medium border text-center backdrop-blur-xs"
                                >
                                  Our Story
                                </div>
                              </div>
                            </motion.div>

                            {/* Mobile Bottom Home Bar Indicator */}
                            <div className="relative z-10 w-24 h-1 bg-white/40 rounded-full mx-auto mt-2" />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* SECTION 2: SCHEDULE FORMAT STRUCTURE */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 pt-2">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Calendar size={16} className="text-neutral-700 dark:text-neutral-300" />
                      <span>Event Schedule Format</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Choose whether your wedding festivities happen all on a Single Main Day or across Separate Days.
                    </p>
                  </div>

                  {/* SCHEDULE TYPE TOGGLE: Main Event vs Separate Day Event */}
                  <div className="p-1.5 rounded-2xl bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 grid grid-cols-2 gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, eventScheduleType: 'single' }))}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        formData.eventScheduleType === 'single'
                          ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Calendar size={15} />
                      <span>Main Event (Single Day)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, eventScheduleType: 'separate' }))}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center ${
                        formData.eventScheduleType === 'separate'
                          ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Sparkles size={15} />
                      <span>Separate Day Event</span>
                    </button>
                  </div>

                  {formData.eventScheduleType === 'single' ? (
                    /* 1. SINGLE DAY CELEBRATION */
                    <div className="space-y-6">
                      {/* SECTION 3A: MAIN DATE & THEME DETAILS */}
                      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <Calendar size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span>Main Wedding Date & Theme Details</span>
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Specify your celebration date, guest attire guidelines, and color of the day.
                        </p>
                      </div>

                      {/* Top Date & Palette */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            Main Wedding Date *
                          </label>
                          <input
                            type="date"
                            name="weddingDate"
                            value={formData.weddingDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            Overall Dress Code
                          </label>
                          <input
                            type="text"
                            name="dressCode"
                            value={formData.dressCode}
                            onChange={handleChange}
                            placeholder="e.g. Black Tie Formal"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                            Colour of the Day (Optional)
                          </label>
                          <input
                            type="text"
                            name="colorPalette"
                            value={formData.colorPalette}
                            onChange={handleChange}
                            placeholder="e.g. Sage Green & Gold, Champagne & Wine"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                          />
                        </div>
                      </div>

                      {/* SECTION 4A: ORDER OF EVENTS */}
                      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <Calendar size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span>Order of Events (Custom Day Flow)</span>
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Toggle on or off any events that apply to your wedding day.
                        </p>
                      </div>

                      {/* EVENT 1: TRADITIONAL WEDDING / ENGAGEMENT (SINGLE DAY) */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        formData.singleHasTraditional
                          ? 'bg-neutral-100/60 dark:bg-neutral-950/80 border-neutral-300 dark:border-neutral-700'
                          : 'bg-neutral-100/30 dark:bg-neutral-950/30 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span>1. Traditional Wedding / Engagement</span>
                                {formData.singleHasTraditional ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                    Included
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                    Toggled Off
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-500">Traditional rites / engagement ceremony on the same day</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, singleHasTraditional: !prev.singleHasTraditional }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              formData.singleHasTraditional ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                formData.singleHasTraditional ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {formData.singleHasTraditional ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Ceremony Time
                              </label>
                              <input
                                type="text"
                                name="traditionalTime"
                                value={formData.traditionalTime}
                                onChange={handleChange}
                                placeholder="e.g. 8:30 AM"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Venue Name
                              </label>
                              <input
                                type="text"
                                name="traditionalVenue"
                                value={formData.traditionalVenue}
                                onChange={handleChange}
                                placeholder="e.g. Landmark Grand Hall A / Bride's Residence"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Attire / Aso-Ebi Colors (Optional)
                              </label>
                              <input
                                type="text"
                                name="traditionalDressCode"
                                value={formData.traditionalDressCode}
                                onChange={handleChange}
                                placeholder="e.g. Champagne Gold & Wine Aso-Ebi"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Venue Address
                              </label>
                              <input
                                type="text"
                                name="traditionalAddress"
                                value={formData.traditionalAddress}
                                onChange={handleChange}
                                placeholder="e.g. Plot 5 Water Corporation Dr, Oniru, Victoria Island"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-neutral-400 italic pt-1">
                            Traditional ceremony is toggled off. Tap the switch to include if holding traditional rites on the same day.
                          </div>
                        )}
                      </div>

                      {/* EVENT 2: CHURCH / CEREMONY */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        formData.singleHasCeremony
                          ? 'bg-neutral-100/60 dark:bg-neutral-950/80 border-neutral-300 dark:border-neutral-700'
                          : 'bg-neutral-100/30 dark:bg-neutral-950/30 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span>2. Church / Solemnization Ceremony</span>
                                {formData.singleHasCeremony ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                    Included
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                    Toggled Off
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-500">Religious or civil wedding solemnization</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, singleHasCeremony: !prev.singleHasCeremony }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              formData.singleHasCeremony ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                formData.singleHasCeremony ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {formData.singleHasCeremony ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Ceremony Venue Name
                              </label>
                              <input
                                type="text"
                                name="ceremonyVenue"
                                value={formData.ceremonyVenue}
                                onChange={handleChange}
                                placeholder="e.g. Church of the Nativity, Victoria Island"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Ceremony Time
                              </label>
                              <input
                                type="text"
                                name="ceremonyTime"
                                value={formData.ceremonyTime}
                                onChange={handleChange}
                                placeholder="e.g. 11:00 AM"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Ceremony Physical Address
                              </label>
                              <input
                                type="text"
                                name="ceremonyAddress"
                                value={formData.ceremonyAddress}
                                onChange={handleChange}
                                placeholder="e.g. 14 Bishop Oluwole St, Victoria Island, Lagos"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-neutral-400 italic pt-1">
                            Church / solemnization is toggled off. Tap the switch to include.
                          </div>
                        )}
                      </div>

                      {/* EVENT 3: WEDDING RECEPTION */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        formData.singleHasReception
                          ? 'bg-neutral-100/60 dark:bg-neutral-950/80 border-neutral-300 dark:border-neutral-700'
                          : 'bg-neutral-100/30 dark:bg-neutral-950/30 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span>3. Wedding Reception</span>
                                {formData.singleHasReception ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                    Included
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                    Toggled Off
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-500">Banquet, dining, speeches and celebrations</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, singleHasReception: !prev.singleHasReception }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              formData.singleHasReception ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                formData.singleHasReception ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {formData.singleHasReception ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Reception Venue Name
                              </label>
                              <input
                                type="text"
                                name="receptionVenue"
                                value={formData.receptionVenue}
                                onChange={handleChange}
                                placeholder="e.g. Landmark Event Centre, Hall 1"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Reception Time
                              </label>
                              <input
                                type="text"
                                name="receptionTime"
                                value={formData.receptionTime}
                                onChange={handleChange}
                                placeholder="e.g. 2:00 PM"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Reception Venue Address
                              </label>
                              <input
                                type="text"
                                name="receptionAddress"
                                value={formData.receptionAddress}
                                onChange={handleChange}
                                placeholder="e.g. Landmark Centre, Plot 2&3 Water Corporation Dr, Oniru"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-neutral-400 italic pt-1">
                            Reception is toggled off. Tap the switch to include.
                          </div>
                        )}
                      </div>

                      {/* EVENT 4: AFTER-PARTY */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        formData.singleHasAfterParty
                          ? 'bg-neutral-100/60 dark:bg-neutral-950/80 border-neutral-300 dark:border-neutral-700'
                          : 'bg-neutral-100/30 dark:bg-neutral-950/30 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span>4. After-Party / Late Night Celebration</span>
                                {formData.singleHasAfterParty ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                    Included
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                    Toggled Off
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-500">Late night dancing, DJ sets, casual lounge vibes</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, singleHasAfterParty: !prev.singleHasAfterParty }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              formData.singleHasAfterParty ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                formData.singleHasAfterParty ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {formData.singleHasAfterParty ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                After-Party Venue Name
                              </label>
                              <input
                                type="text"
                                name="afterPartyVenue"
                                value={formData.afterPartyVenue}
                                onChange={handleChange}
                                placeholder="e.g. Landmark After-Dark Lounge / Club Oasis"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                After-Party Time
                              </label>
                              <input
                                type="text"
                                name="afterPartyTime"
                                value={formData.afterPartyTime}
                                onChange={handleChange}
                                placeholder="e.g. 7:30 PM till late"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                After-Party Venue Address
                              </label>
                              <input
                                type="text"
                                name="afterPartyAddress"
                                value={formData.afterPartyAddress}
                                onChange={handleChange}
                                placeholder="e.g. Landmark Centre, Oniru / Victoria Island"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                After-Party Notes (Dress change / Access rules)
                              </label>
                              <input
                                type="text"
                                name="afterPartyNotes"
                                value={formData.afterPartyNotes}
                                onChange={handleChange}
                                placeholder="e.g. Casual chic attire / Wristbands required"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-neutral-400 italic pt-1">
                            No after-party scheduled. Tap the switch to include an after-party on your wedding website.
                          </div>
                        )}
                      </div>


                    </div>
                  ) : (
                    /* 2. SEPARATE DAY EVENTS */
                    <div className="space-y-6">
                      {/* DAY 1: TRADITIONAL / ENGAGEMENT WEDDING */}
                      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                        formData.separateHasTraditional
                          ? 'bg-neutral-100/60 dark:bg-neutral-950/80 border-neutral-300 dark:border-neutral-700'
                          : 'bg-neutral-100/30 dark:bg-neutral-950/30 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                      }`}>
                        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">Day 1</span>
                              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Traditional / Engagement Wedding</h3>
                                {formData.separateHasTraditional ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                    Included
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                    Toggled Off
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-neutral-500 block mt-0.5">Cultural celebration & introduction</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, separateHasTraditional: !prev.separateHasTraditional }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              formData.separateHasTraditional ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                formData.separateHasTraditional ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {formData.separateHasTraditional ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Wedding Date *
                              </label>
                              <input
                                type="date"
                                name="traditionalDate"
                                value={formData.traditionalDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Event Time
                              </label>
                              <input
                                type="text"
                                name="traditionalTime"
                                value={formData.traditionalTime}
                                onChange={handleChange}
                                placeholder="e.g. 11:00 AM"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Venue Name
                              </label>
                              <input
                                type="text"
                                name="traditionalVenue"
                                value={formData.traditionalVenue}
                                onChange={handleChange}
                                placeholder="e.g. The Dorchester Events Centre"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Attire / Aso-Ebi Colors (Optional)
                              </label>
                              <input
                                type="text"
                                name="traditionalDressCode"
                                value={formData.traditionalDressCode}
                                onChange={handleChange}
                                placeholder="e.g. Emerald Green & Champagne Aso-Ebi / Agbada"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                                Traditional Venue Address
                              </label>
                              <input
                                type="text"
                                name="traditionalAddress"
                                value={formData.traditionalAddress}
                                onChange={handleChange}
                                placeholder="e.g. Plot 5 Water Corporation Road, Oniru, Victoria Island"
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-neutral-400 italic pt-3">
                            Traditional event day is toggled off. Tap the switch to include.
                          </div>
                        )}
                      </div>

                      {/* DAY 2: MAIN / WHITE / CHURCH WEDDING */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 space-y-5">
                        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">Day 2</span>
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">Main / White Wedding & Festivities</h3>
                          <p className="text-xs text-neutral-500 mt-0.5">Details for your church solemnization, grand reception, and after-party.</p>
                        </div>

                        {/* Top Date, Attire & Palette */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                              Main Wedding Date *
                            </label>
                            <input
                              type="date"
                              name="weddingDate"
                              value={formData.weddingDate}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                              White Wedding Dress Code
                            </label>
                            <input
                              type="text"
                              name="dressCode"
                              value={formData.dressCode}
                              onChange={handleChange}
                              placeholder="e.g. Black Tie Formal"
                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                              Colour of the Day (Optional)
                            </label>
                            <input
                              type="text"
                              name="colorPalette"
                              value={formData.colorPalette}
                              onChange={handleChange}
                              placeholder="e.g. Classic Ivory & Noir, Sage Green & Gold"
                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                            />
                          </div>
                        </div>

                        <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider pt-2">
                          Day 2 Events (Toggle on/off whichever apply)
                        </div>

                        {/* DAY 2: CHURCH / CEREMONY */}
                        <div className={`p-4 rounded-xl border transition-all ${
                          formData.separateHasCeremony
                            ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'
                            : 'bg-neutral-100/40 dark:bg-neutral-900/40 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Heart size={15} className="text-neutral-700 dark:text-neutral-300" />
                              <span className="text-xs font-bold text-neutral-900 dark:text-white">Church / Solemnization Ceremony</span>
                              {formData.separateHasCeremony ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                  Included
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                  Toggled Off
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, separateHasCeremony: !prev.separateHasCeremony }))}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                formData.separateHasCeremony ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                  formData.separateHasCeremony ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {formData.separateHasCeremony ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Ceremony Venue Name</label>
                                <input
                                  type="text"
                                  name="ceremonyVenue"
                                  value={formData.ceremonyVenue}
                                  onChange={handleChange}
                                  placeholder="e.g. Church of the Nativity"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Ceremony Time</label>
                                <input
                                  type="text"
                                  name="ceremonyTime"
                                  value={formData.ceremonyTime}
                                  onChange={handleChange}
                                  placeholder="e.g. 10:00 AM"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Ceremony Physical Address</label>
                                <input
                                  type="text"
                                  name="ceremonyAddress"
                                  value={formData.ceremonyAddress}
                                  onChange={handleChange}
                                  placeholder="e.g. 14 Bishop Oluwole St, Victoria Island"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-[11px] text-neutral-400 italic">Ceremony toggled off.</div>
                          )}
                        </div>

                        {/* DAY 2: RECEPTION */}
                        <div className={`p-4 rounded-xl border transition-all ${
                          formData.separateHasReception
                            ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'
                            : 'bg-neutral-100/40 dark:bg-neutral-900/40 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Gift size={15} className="text-neutral-700 dark:text-neutral-300" />
                              <span className="text-xs font-bold text-neutral-900 dark:text-white">Wedding Reception</span>
                              {formData.separateHasReception ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                  Included
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                  Toggled Off
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, separateHasReception: !prev.separateHasReception }))}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                formData.separateHasReception ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                  formData.separateHasReception ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {formData.separateHasReception ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Reception Venue Name</label>
                                <input
                                  type="text"
                                  name="receptionVenue"
                                  value={formData.receptionVenue}
                                  onChange={handleChange}
                                  placeholder="e.g. Landmark Event Centre"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Reception Time</label>
                                <input
                                  type="text"
                                  name="receptionTime"
                                  value={formData.receptionTime}
                                  onChange={handleChange}
                                  placeholder="e.g. 2:00 PM"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">Reception Venue Address</label>
                                <input
                                  type="text"
                                  name="receptionAddress"
                                  value={formData.receptionAddress}
                                  onChange={handleChange}
                                  placeholder="e.g. Landmark Centre, Plot 2&3 Water Corporation Dr, Oniru"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-[11px] text-neutral-400 italic">Reception toggled off.</div>
                          )}
                        </div>

                        {/* DAY 2: AFTER-PARTY */}
                        <div className={`p-4 rounded-xl border transition-all ${
                          formData.separateHasAfterParty
                            ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'
                            : 'bg-neutral-100/40 dark:bg-neutral-900/40 border-dashed border-neutral-300 dark:border-neutral-800 opacity-80'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Music size={15} className="text-neutral-700 dark:text-neutral-300" />
                              <span className="text-xs font-bold text-neutral-900 dark:text-white">After-Party Celebration</span>
                              {formData.separateHasAfterParty ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                                  Included
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                                  Toggled Off
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, separateHasAfterParty: !prev.separateHasAfterParty }))}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                formData.separateHasAfterParty ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                  formData.separateHasAfterParty ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {formData.separateHasAfterParty ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">After-Party Venue Name</label>
                                <input
                                  type="text"
                                  name="afterPartyVenue"
                                  value={formData.afterPartyVenue}
                                  onChange={handleChange}
                                  placeholder="e.g. Landmark After-Dark Lounge"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">After-Party Time</label>
                                <input
                                  type="text"
                                  name="afterPartyTime"
                                  value={formData.afterPartyTime}
                                  onChange={handleChange}
                                  placeholder="e.g. 7:30 PM till late"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">After-Party Venue Address</label>
                                <input
                                  type="text"
                                  name="afterPartyAddress"
                                  value={formData.afterPartyAddress}
                                  onChange={handleChange}
                                  placeholder="e.g. Landmark Centre, Oniru, Victoria Island"
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-[11px] text-neutral-400 italic">No after-party scheduled. Tap switch to include.</div>
                          )}
                        </div>
                      </div>


                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: Our Love Story */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Sparkles size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 3: Your Love Story & Memorable Moments
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Share the moments that brought you two together. Your guests love reading your story!
                    </p>
                  </div>

                  {/* SECTION: OUR LOVE STORY & JOURNEY */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-neutral-700 dark:text-neutral-300" />
                      <span>Our Love Story & Journey</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Share the milestones and memories that celebrate your journey together.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        "How We Met" Story
                      </label>
                      <textarea
                        name="howWeMet"
                        rows={4}
                        value={formData.howWeMet}
                        onChange={handleChange}
                        placeholder="Where did you two first cross paths? Who made the first move? Share your story in your own voice..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        "The Proposal" Story
                      </label>
                      <textarea
                        name="theProposal"
                        rows={4}
                        value={formData.theProposal}
                        onChange={handleChange}
                        placeholder="How did the question get popped? Was it a surprise, an intimate getaway, or a dinner surrounded by family?"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Relationship Milestones & Dates (Optional)
                      </label>
                      <textarea
                        name="milestones"
                        rows={3}
                        value={formData.milestones}
                        onChange={handleChange}
                        placeholder="e.g. October 2021: First coffee date in Lagos | August 2023: First holiday in Zanzibar | December 2025: He put a ring on it!"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        A Welcome Quote / Note to Your Guests
                      </label>
                      <input
                        type="text"
                        name="coupleQuote"
                        value={formData.coupleQuote}
                        onChange={handleChange}
                        placeholder="e.g. 'We cannot wait to celebrate the beginning of our forever with the people who mean the most to us.'"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Registry, RSVPs & Music */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Gift size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 4: RSVPs, Gift Registry & Music Choice
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Configure your guest preferences, cash registry, and your signature background song.
                    </p>
                  </div>

                  {/* SECTION 1: RSVPS & GUIDELINES */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Gift size={16} className="text-neutral-700 dark:text-neutral-300" />
                      <span>Guest Attendance & RSVP Guidelines</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Set your guest RSVP confirmation deadline and attendance rules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        RSVP Deadline Date
                      </label>
                      <input
                        type="date"
                        name="rsvpDeadline"
                        value={formData.rsvpDeadline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        RSVP Policies / Guest Instructions
                      </label>
                      <input
                        type="text"
                        name="rsvpRules"
                        value={formData.rsvpRules}
                        onChange={handleChange}
                        placeholder="e.g. Strictly by invitation. Adults only event. Plus-ones must be registered."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* SECTION 2: REGISTRY & GIFTS */}
                    <div className="md:col-span-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 pt-2">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Gift size={16} className="text-neutral-700 dark:text-neutral-300" />
                        <span>Gift Registry & Bank Details</span>
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Optional cash gift account for guests who wish to bless the couple.
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Cash Gift / Bank Account Details (Optional)
                      </label>
                      <textarea
                        name="bankDetails"
                        rows={3}
                        value={formData.bankDetails}
                        onChange={handleChange}
                        placeholder="e.g. Bank: GTBank | Account Number: 0123456789 | Account Name: Adetola & Babatunde (For our honeymoon fund)"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>

                    {/* SECTION 3: ATMOSPHERE & BACKGROUND MUSIC */}
                    <div className="md:col-span-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 pt-2">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Music size={16} className="text-neutral-700 dark:text-neutral-300" />
                        <span>Atmosphere & Signature Background Music</span>
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Your signature song plays softly when guests open your wedding website.
                      </p>
                    </div>

                    {/* Background Music Field */}
                    <div className="md:col-span-2 p-4 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Music size={16} className="text-neutral-700 dark:text-neutral-300" />
                        <label className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wider">
                          Background Song Choice (Title & Artist)
                        </label>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mb-2">
                        No audio file upload needed! Simply tell us your favorite song and artist — we source, license, and master high-fidelity audio directly into your website.
                      </p>
                      <input
                        type="text"
                        name="backgroundSong"
                        value={formData.backgroundSong}
                        onChange={handleChange}
                        placeholder="e.g. 'Orente' by Adekunle Gold OR 'Until I Found You' by Stephen Sanchez"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Additional Notes / Special Requests (Optional)
                      </label>
                      <textarea
                        name="additionalNotes"
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="e.g. countdown timer, interactive RSVP table arrangement, hotel accommodation suggestions"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Visual Assets & Photo Uploads */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-8"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Upload size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 5: High-Resolution Photo Uploads
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Upload your high-res photos for your website layout and gallery.
                    </p>
                  </div>

                  {/* 1. Hero Cover Image */}
                  <div className="p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <ImageIcon size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span>Hero Cover Photo (Main Portrait)</span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          The main portrait that introduces your website at the very top.
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {heroPhotos.length}/1 Selected
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={heroInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleFileSelect('hero', e.target.files)}
                    />

                    {heroPhotos.length === 0 ? (
                      <div
                        onClick={() => heroInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-neutral-500 rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center mx-auto mb-3 text-neutral-500 dark:text-neutral-400 group-hover:scale-110 transition-all shadow-xs">
                          <Upload size={20} />
                        </div>
                        <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                          Click to select your main Hero photo
                        </div>
                        <div className="text-xs text-neutral-500">
                          High resolution portrait or landscape (PNG, JPG, HEIC, WebP)
                        </div>
                      </div>
                    ) : (
                      <div className="relative group rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 max-w-sm">
                        <img
                          src={heroPhotos[0].previewUrl}
                          alt="Hero Preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3 bg-white/90 dark:bg-neutral-900/90 flex items-center justify-between text-xs">
                          <span className="truncate max-w-[200px] text-neutral-800 dark:text-neutral-200 font-medium">{heroPhotos[0].name}</span>
                          <span className="text-neutral-500 font-mono">
                            {(heroPhotos[0].size / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(heroPhotos[0].id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 2. Our Story Photos */}
                  <div className="p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <Heart size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span>Our Story Photos (1 to 4 Photos)</span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Photos that illustrate your journey together, proposal, or dating years.
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {storyPhotos.length} Selected
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={storyInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleFileSelect('story', e.target.files)}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {storyPhotos.map(item => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                          <img src={item.previewUrl} alt={item.name} className="w-full h-28 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeFile(item.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors"
                          >
                            <X size={12} />
                          </button>
                          <div className="p-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 truncate font-mono">
                            {(item.size / (1024 * 1024)).toFixed(1)} MB
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => storyInputRef.current?.click()}
                        className="h-28 border border-dashed border-neutral-300 dark:border-neutral-800 hover:border-neutral-500 rounded-xl flex flex-col items-center justify-center p-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-white/40 dark:bg-neutral-900/30"
                      >
                        <Upload size={18} className="mb-1" />
                        <span className="text-[11px] font-semibold">+ Add Photos</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Gallery Photos */}
                  <div className="p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <ImageIcon size={16} className="text-neutral-700 dark:text-neutral-300" />
                          <span>Gallery Collection (5 to 15+ Photos)</span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Pre-wedding photoshoot, candid romance, travel memories, and family shoots.
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {galleryPhotos.length} Selected
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={galleryInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleFileSelect('gallery', e.target.files)}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-3">
                      {galleryPhotos.map(item => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                          <img src={item.previewUrl} alt={item.name} className="w-full h-24 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeFile(item.id)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="h-24 border border-dashed border-neutral-300 dark:border-neutral-800 hover:border-neutral-500 rounded-xl flex flex-col items-center justify-center p-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors bg-white/40 dark:bg-neutral-900/30"
                      >
                        <Upload size={16} className="mb-1" />
                        <span className="text-[10px] font-semibold">+ Add Images</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. OPTIONAL PHOTOGRAPHER CLOUD DRIVE / DROPBOX LINK */}
                  <div className="p-6 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-neutral-700 dark:text-neutral-300" />
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">
                          Photographer's Google Drive / Cloud Album (Optional)
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono">
                        Direct 4K Photos
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                      Prefer not to upload photos individually from your phone? Paste your photographer's Google Drive, Dropbox, or iCloud link below — we will extract and curate the highest resolution images directly.
                    </p>
                    <input
                      type="url"
                      name="driveFolderLink"
                      value={formData.driveFolderLink}
                      onChange={handleChange}
                      placeholder="e.g. https://drive.google.com/drive/folders/... or https://www.dropbox.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm font-mono"
                    />
                    <div className="mt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
                      <span>💡</span>
                      <span>Please ensure link sharing permissions are set to <strong>"Anyone with the link can view"</strong>.</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Review & Submit */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-neutral-700 dark:text-neutral-300" />
                      Step 6: Review Summary & Submit
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Review all entered information before submitting your wedding website details.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">The Couple & Domain</div>
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {brideDisplay} & {groomDisplay}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">Hashtag: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.hashtag || 'None'}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400 font-mono">
                        Domain: <span className="text-neutral-900 dark:text-white font-bold">{computedDomainPreview}</span> (Included Free)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">
                        {formData.eventScheduleType === 'single' ? 'Dates & Venues (Single Day)' : 'Dates & Venues (Separate Events)'}
                      </div>

                      {formData.eventScheduleType === 'single' ? (
                        <div className="space-y-1.5">
                          <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {formData.weddingDate ? new Date(formData.weddingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date set'}
                          </div>
                          <div className="text-neutral-600 dark:text-neutral-400">
                            Palette: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.colorPalette}</span>
                            {formData.dressCode && <> • Attire: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.dressCode}</span></>}
                          </div>
                          
                          {formData.singleHasTraditional && (
                            <div className="pt-1 text-[11px]">
                              <span className="font-semibold text-neutral-900 dark:text-white">Traditional:</span> {formData.traditionalVenue || 'TBD'} ({formData.traditionalTime || 'Morning'})
                            </div>
                          )}
                          {formData.singleHasCeremony && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-neutral-900 dark:text-white">Ceremony:</span> {formData.ceremonyVenue || 'TBD'} ({formData.ceremonyTime})
                            </div>
                          )}
                          {formData.singleHasReception && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-neutral-900 dark:text-white">Reception:</span> {formData.receptionVenue || 'TBD'} ({formData.receptionTime})
                            </div>
                          )}
                          {formData.singleHasAfterParty && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-neutral-900 dark:text-white">After-Party:</span> {formData.afterPartyVenue || 'TBD'} ({formData.afterPartyTime || 'Night'})
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {formData.separateHasTraditional && (
                            <div className="space-y-0.5">
                              <div className="text-neutral-900 dark:text-white font-semibold text-[11px]">
                                Day 1 (Traditional): {formData.traditionalDate ? new Date(formData.traditionalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                              </div>
                              <div className="text-neutral-600 dark:text-neutral-400 pl-2 text-[11px]">
                                Venue: {formData.traditionalVenue || 'TBD'} ({formData.traditionalTime || 'TBD'})
                              </div>
                            </div>
                          )}
                          <div className="space-y-0.5 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                            <div className="text-neutral-900 dark:text-white font-semibold text-[11px]">
                              Day 2 (Main Wedding): {formData.weddingDate ? new Date(formData.weddingDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                            </div>
                            {formData.separateHasCeremony && (
                              <div className="text-neutral-600 dark:text-neutral-400 pl-2 text-[11px]">
                                Ceremony: {formData.ceremonyVenue || 'TBD'} ({formData.ceremonyTime})
                              </div>
                            )}
                            {formData.separateHasReception && (
                              <div className="text-neutral-600 dark:text-neutral-400 pl-2 text-[11px]">
                                Reception: {formData.receptionVenue || 'TBD'} ({formData.receptionTime})
                              </div>
                            )}
                            {formData.separateHasAfterParty && (
                              <div className="text-neutral-600 dark:text-neutral-400 pl-2 text-[11px]">
                                After-Party: {formData.afterPartyVenue || 'TBD'} ({formData.afterPartyTime || 'Night'})
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">The Story & Music</div>
                      <div className="text-neutral-700 dark:text-neutral-300 italic line-clamp-2">
                        "{formData.howWeMet || 'Story to be provided'}"
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">Song Choice: <span className="text-neutral-900 dark:text-white font-medium">{formData.backgroundSong || 'None specified'}</span></div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Photos ({files.length} Total)</div>
                      <div className="space-y-1 text-neutral-700 dark:text-neutral-300">
                        <div>• Hero Cover: {heroPhotos.length ? '1 Photo attached' : 'None attached'}</div>
                        <div>• Story Photos: {storyPhotos.length} Photos</div>
                        <div>• Gallery Collection: {galleryPhotos.length} Photos</div>
                      </div>
                      <div className="pt-2 text-neutral-500 font-mono text-[10px]">
                        Total photo size: {(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(1)} MB
                      </div>
                      {formData.driveFolderLink && (
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono truncate pt-1">
                          Cloud Drive: {formData.driveFolderLink}
                        </div>
                      )}
                    </div>
                  </div>

                                    {/* AI WEBSITE BUILDER PROMPT FIELD */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-amber-400 shrink-0" />
                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-neutral-200">
                            AI Website Builder Prompt (Auto-Generated)
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            Pre-configured prompt with all submitted wedding details, ready to build the site.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(aiPromptText);
                          setCopiedPrompt(true);
                          setTimeout(() => setCopiedPrompt(false), 2500);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 text-xs font-bold transition-all shrink-0 self-start sm:self-center shadow-sm"
                      >
                        {copiedPrompt ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={6}
                      value={aiPromptText}
                      className="w-full p-3.5 rounded-xl bg-black/60 border border-neutral-800 text-neutral-300 font-mono text-[11px] leading-relaxed resize-y focus:outline-none focus:border-neutral-700"
                    />
                  </div>

                  {/* UPLOADING PROGRESS OVERLAY / BAR */}
                  {isSubmitting && (
                    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 space-y-4 shadow-md">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-medium">
                          <Loader2 size={16} className="animate-spin text-neutral-900 dark:text-white" />
                          <span>{progressStatusText}</span>
                        </div>
                        <span className="font-mono text-neutral-900 dark:text-white font-bold">{submissionProgress}%</span>
                      </div>

                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-neutral-900 dark:bg-white h-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${submissionProgress}%` }}
                          transition={{ ease: 'easeOut', duration: 0.2 }}
                        />
                      </div>

                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                        <span>Uploading high-resolution assets...</span>
                        <span>Please keep this window open</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION BUTTONS: Smooth free progression */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 sm:gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setCurrentStep(prev => prev - 1);
                  }}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={15} />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setCurrentStep(prev => prev + 1);
                  }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs font-bold whitespace-nowrap shrink-0 transition-all shadow-md hover:scale-105"
                >
                  <span>Continue</span>
                  <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin shrink-0" />
                      <span>Submitting ({submissionProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="shrink-0" />
                      <span>Submit Wedding Details</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* TRUST & BRANDING BADGE */}
        <div className="mt-12 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div>Built by Ore Okunade</div>
          <span className="hidden sm:inline">•</span>
          <div>Dedicated Client Support</div>
        </div>

      </div>

    </div>
  );
};

export default WeddingPortal;
