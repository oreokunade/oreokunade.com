import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
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
  Palette,
  AlertCircle,
  Loader2,
  Gift,
  Send,
  Globe
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
  // 1. The Couple & Custom Domain
  brideFullName: string;
  brideFirstName: string;
  groomFullName: string;
  groomFirstName: string;
  email: string;
  phone: string;
  hashtag: string;
  domainName: string;
  domainType: '.online' | '.com' | 'custom';

  // 2. Schedule & Venues
  weddingDate: string;
  traditionalDate: string;
  colorPalette: string;
  paletteNotes: string;
  dressCode: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyTime: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionTime: string;
  scheduleNotes: string;

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
  additionalNotes: string;
}

const INITIAL_FORM_DATA: WeddingFormData = {
  brideFullName: '',
  brideFirstName: '',
  groomFullName: '',
  groomFirstName: '',
  email: '',
  phone: '',
  hashtag: '',
  domainName: '',
  domainType: '.online',

  weddingDate: '',
  traditionalDate: '',
  colorPalette: 'Emerald Green & Champagne Gold',
  paletteNotes: '#0B4F3A, #F3E5AB, #FFFFFF',
  dressCode: 'Black Tie / Modern Luxury Traditional',
  ceremonyVenue: '',
  ceremonyAddress: '',
  ceremonyTime: '10:00 AM',
  receptionVenue: '',
  receptionAddress: '',
  receptionTime: '2:00 PM',
  scheduleNotes: '',

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

const SUGGESTED_PALETTES = [
  { name: 'Emerald & Champagne Gold', hexes: ['#0B4F3A', '#D4AF37', '#FAF7F2'] },
  { name: 'Royal Navy & Rose Gold', hexes: ['#0F2042', '#B76E79', '#F8F9FA'] },
  { name: 'Terracotta & Sage Minimal', hexes: ['#C86D51', '#8A9A86', '#F5EBE6'] },
  { name: 'Burgundy & Soft Pearl', hexes: ['#6B1D2F', '#E8D8C8', '#1F1F1F'] },
  { name: 'Classic Ivory & Noir', hexes: ['#121212', '#E5E0D8', '#997950'] }
];

const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxN-_Yg3t0pebr0k6AQ4VAP44dmgVvlTrfxyARClARuwlwbU3ImB9mWHi-rXP_tgYOx2Q/exec';

const WeddingPortal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WeddingFormData>(INITIAL_FORM_DATA);
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [progressStatusText, setProgressStatusText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  // Submission handler
  const handleSubmitAll = async () => {
    // Only on final submit, check required fields
    if (!formData.brideFirstName && !formData.brideFullName) {
      setErrorMsg("Please enter the Bride's Name (in Step 1) before submitting.");
      return;
    }
    if (!formData.groomFirstName && !formData.groomFullName) {
      setErrorMsg("Please enter the Groom's Name (in Step 1) before submitting.");
      return;
    }
    if (!formData.email) {
      setErrorMsg("Please provide your primary email address (in Step 1) before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSubmissionProgress(5);
    setProgressStatusText('Initializing your project onboarding...');

    try {
      const brideName = formData.brideFirstName || formData.brideFullName;
      const groomName = formData.groomFirstName || formData.groomFullName;

      const initPayload = {
        action: 'init',
        partner1Name: brideName,
        partner2Name: groomName,
        brideFullName: formData.brideFullName,
        brideFirstName: formData.brideFirstName,
        groomFullName: formData.groomFullName,
        groomFirstName: formData.groomFirstName,
        weddingDate: formData.weddingDate,
        email: formData.email,
        phone: formData.phone,
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
            partner1Name: brideName,
            partner2Name: groomName,
            partner1Nickname: formData.brideFirstName,
            partner2Nickname: formData.groomFirstName,
            domainType: formData.domainType === '.online' ? '.online (Included)' : formData.domainType === '.com' ? '.com (+₦15,000 Add-on)' : 'Custom domain'
          }
        })
      });

      setSubmissionProgress(100);
      setProgressStatusText('Submitted successfully!');
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

  const computedDomainPreview =
    formData.domainType === 'custom'
      ? (formData.domainName || 'yourcustomdomain.com')
      : `${formData.domainName || 'couple'}${formData.domainType}`;

  const brideDisplay = formData.brideFirstName || formData.brideFullName || "Bride";
  const groomDisplay = formData.groomFirstName || formData.groomFullName || "Groom";

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative pt-24 pb-20 px-4 md:px-8 transition-colors duration-300">
      
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to oreokunade.com</span>
          </Link>
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
              {/* STEP 1: The Couple & Custom Domain */}
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
                      Names as you want them displayed, contact details, and your website domain selection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Bride's Full Name
                      </label>
                      <input
                        type="text"
                        name="brideFullName"
                        value={formData.brideFullName}
                        onChange={handleChange}
                        placeholder="e.g. Adetola Grace Adeleke"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Bride's First Name / Nickname
                      </label>
                      <input
                        type="text"
                        name="brideFirstName"
                        value={formData.brideFirstName}
                        onChange={handleChange}
                        placeholder="e.g. Tola"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Groom's Full Name
                      </label>
                      <input
                        type="text"
                        name="groomFullName"
                        value={formData.groomFullName}
                        onChange={handleChange}
                        placeholder="e.g. Babatunde Michael Ogunlesi"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Groom's First Name / Nickname
                      </label>
                      <input
                        type="text"
                        name="groomFirstName"
                        value={formData.groomFirstName}
                        onChange={handleChange}
                        placeholder="e.g. Tunde"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Primary Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. tolaandbabatunde@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 812 345 6789"
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

                    {/* CUSTOM DOMAIN SELECTOR */}
                    <div className="md:col-span-2 p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe size={16} className="text-neutral-700 dark:text-neutral-300" />
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">Your Wedding Website Domain</span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        Choose how guests will visit your website. A <strong className="text-neutral-900 dark:text-white font-semibold">.online</strong> domain is 100% included in your package. A <strong className="text-neutral-900 dark:text-white font-semibold">.com</strong> domain is billed separately.
                      </p>

                      {/* Domain Type Selection Radio Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div
                          onClick={() => setFormData(prev => ({ ...prev, domainType: '.online' }))}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.domainType === '.online'
                              ? 'border-neutral-900 dark:border-white bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-neutral-900 dark:text-white font-mono">.online</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                              Included Free
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Included with your build package
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData(prev => ({ ...prev, domainType: '.com' }))}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.domainType === '.com'
                              ? 'border-neutral-900 dark:border-white bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-neutral-900 dark:text-white font-mono">.com</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium">
                              +₦15,000 / $15
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Premium international extension
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData(prev => ({ ...prev, domainType: 'custom' }))}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.domainType === 'custom'
                              ? 'border-neutral-900 dark:border-white bg-neutral-200/60 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-neutral-900 dark:text-white">Own Domain</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                              BYO Domain
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            You already bought a domain
                          </div>
                        </div>
                      </div>

                      {/* Domain Input Field */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                          {formData.domainType === 'custom' ? 'Your Existing Domain Name' : 'Desired Domain Name (e.g. tolatunde26)'}
                        </label>
                        <div className="flex items-center rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 overflow-hidden focus-within:border-neutral-900 dark:focus-within:border-white transition-colors">
                          <span className="pl-4 pr-1 text-xs text-neutral-400 select-none">https://</span>
                          <input
                            type="text"
                            value={formData.domainName}
                            onChange={e => handleDomainNameChange(e.target.value)}
                            placeholder={formData.domainType === 'custom' ? 'ourtolalove.ng' : 'tolatunde26'}
                            className="flex-1 py-3 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none text-sm font-mono"
                          />
                          {formData.domainType !== 'custom' && (
                            <span className="pr-4 pl-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 select-none">
                              {formData.domainType}
                            </span>
                          )}
                        </div>

                        {formData.domainName && (
                          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                            <Sparkles size={12} className="text-neutral-600 dark:text-neutral-400" />
                            <span>Preview: <strong className="text-neutral-900 dark:text-white">https://{computedDomainPreview}</strong></span>
                            {formData.domainType === '.com' && (
                              <span className="text-neutral-500 text-[11px] ml-2 font-sans">(₦15,000 separate domain billing)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Schedule & Venues */}
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
                      Step 2: Dates, Venues & Aesthetic
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Event timelines, venue directions, color schemes, and dress codes for your guests.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Main Wedding Date
                      </label>
                      <input
                        type="date"
                        name="weddingDate"
                        value={formData.weddingDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Traditional Wedding Date (If separate day)
                      </label>
                      <input
                        type="date"
                        name="traditionalDate"
                        value={formData.traditionalDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* Color Palette Presets */}
                    <div className="md:col-span-2 p-4 rounded-2xl bg-neutral-100/60 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Palette size={14} className="text-neutral-700 dark:text-neutral-300" />
                        Quick Color Palette Suggestions (Click to apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                            className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                              formData.colorPalette === p.name
                                ? 'border-neutral-900 dark:border-white bg-neutral-200/50 dark:bg-neutral-800'
                                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/40'
                            }`}
                          >
                            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{p.name}</span>
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
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Your Custom Color Palette
                      </label>
                      <input
                        type="text"
                        name="colorPalette"
                        value={formData.colorPalette}
                        onChange={handleChange}
                        placeholder="e.g. Sage Green, Terracotta & Warm Gold"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Dress Code / Attire
                      </label>
                      <input
                        type="text"
                        name="dressCode"
                        value={formData.dressCode}
                        onChange={handleChange}
                        placeholder="e.g. Black Tie Formal / Traditional Elegance"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* Ceremony details */}
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
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
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
                        placeholder="e.g. 10:00 AM"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Ceremony Physical Address & Google Maps Link
                      </label>
                      <input
                        type="text"
                        name="ceremonyAddress"
                        value={formData.ceremonyAddress}
                        onChange={handleChange}
                        placeholder="e.g. 14 Bishop Oluwole St, Victoria Island, Lagos (https://maps.app.goo.gl/...)"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* Reception details */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Reception Venue Name
                      </label>
                      <input
                        type="text"
                        name="receptionVenue"
                        value={formData.receptionVenue}
                        onChange={handleChange}
                        placeholder="e.g. Landmark Event Centre, Water Corporation Road"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
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
                        placeholder="e.g. 1:30 PM"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Reception Address & Maps Link
                      </label>
                      <input
                        type="text"
                        name="receptionAddress"
                        value={formData.receptionAddress}
                        onChange={handleChange}
                        placeholder="e.g. Landmark Centre, Plot 2&3 Water Corporation Dr, Oniru, Victoria Island"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Schedule Highlights / Day Timeline (Optional)
                      </label>
                      <textarea
                        name="scheduleNotes"
                        rows={3}
                        value={formData.scheduleNotes}
                        onChange={handleChange}
                        placeholder="e.g. 10:00 AM - Church Ceremony, 1:00 PM - Cocktail Hour, 2:30 PM - Grand Entrance, 6:30 PM - After Party"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-y text-sm"
                      />
                    </div>
                  </div>
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

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        External Gift Registry Links (Amazon, Honeyfund, etc.)
                      </label>
                      <input
                        type="text"
                        name="registryLinks"
                        value={formData.registryLinks}
                        onChange={handleChange}
                        placeholder="e.g. https://www.amazon.com/baby-reg/... or https://withjoy.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      />
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

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Website Design Aesthetic
                      </label>
                      <select
                        name="designStyle"
                        value={formData.designStyle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-sm"
                      >
                        <option value="Romantic Modern Luxury">Romantic Modern Luxury (Warm, editorial, serif typography)</option>
                        <option value="Editorial Minimalist">Editorial Minimalist (Sleek, black & white, magazine style)</option>
                        <option value="Afro-Cultural Luxe">Afro-Cultural Luxe (Vibrant rich tones, traditional majesty)</option>
                        <option value="Classic European Elegance">Classic European Elegance (Delicate, floral, timeless)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                        Additional Notes / Special Requests
                      </label>
                      <textarea
                        name="additionalNotes"
                        rows={2}
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
                      <div className="text-neutral-600 dark:text-neutral-400">Email: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.email || 'N/A'}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Phone: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.phone || 'N/A'}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Hashtag: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.hashtag || 'None'}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400 font-mono">
                        Domain: <span className="text-neutral-900 dark:text-white font-bold">{computedDomainPreview}</span> ({formData.domainType === '.online' ? 'Included' : formData.domainType === '.com' ? '+₦15k Add-on' : 'Custom'})
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Dates & Venues</div>
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {formData.weddingDate || 'No date set'}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">Palette: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.colorPalette}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Dress Code: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.dressCode}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Ceremony: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.ceremonyVenue || 'TBD'} ({formData.ceremonyTime})</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Reception: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.receptionVenue || 'TBD'} ({formData.receptionTime})</span></div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">The Story & Music</div>
                      <div className="text-neutral-700 dark:text-neutral-300 italic line-clamp-2">
                        "{formData.howWeMet || 'Story to be provided'}"
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">Song Choice: <span className="text-neutral-900 dark:text-white font-medium">{formData.backgroundSong || 'None specified'}</span></div>
                      <div className="text-neutral-600 dark:text-neutral-400">Design Aesthetic: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{formData.designStyle}</span></div>
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
                    </div>
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
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setCurrentStep(prev => prev - 1);
                  }}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => {
                    // Always allow proceeding to the next step without blocking!
                    setErrorMsg(null);
                    setCurrentStep(prev => prev + 1);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs font-bold transition-all shadow-md hover:scale-105"
                >
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-sm font-bold transition-all shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting ({submissionProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
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
