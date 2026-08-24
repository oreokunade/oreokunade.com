import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const yorubaNames = ["Oluwaseun", "Adeola", "Olamide", "Bolaji", "Tolulope", "Femi", "Yemi", "Ayodele", "Bukola"];
const swStates = ["Oyo", "Ogun", "Osun", "Ondo", "Ekiti"];

const igboNames = ["Chukwudi", "Ngozi", "Emeka", "Chidinma", "Obinna", "Amaka", "Kelechi", "Chinedu", "Nnamdi"];
const eastStates = ["Enugu", "Anambra", "Imo", "Abia", "Ebonyi", "Rivers"];

const hausaNames = ["Ibrahim", "Fatima", "Aminu", "Zainab", "Abubakar", "Aisha", "Musa", "Yusuf", "Halima"];
const northStates = ["Kano", "Kaduna", "Katsina", "Sokoto", "Borno", "Plateau", "Bauchi"];

const allNames = [...yorubaNames, ...igboNames, ...hausaNames];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generatePurchase = () => {
  const regions = ["SW", "EAST", "NORTH", "LAGOS"];
  const selectedRegion = getRandomItem(regions);

  let name = "";
  let state = "";

  if (selectedRegion === "SW") {
    name = getRandomItem(yorubaNames);
    state = getRandomItem(swStates);
  } else if (selectedRegion === "EAST") {
    name = getRandomItem(igboNames);
    state = getRandomItem(eastStates);
  } else if (selectedRegion === "NORTH") {
    name = getRandomItem(hausaNames);
    state = getRandomItem(northStates);
  } else {
    // Lagos can be anyone
    name = getRandomItem(allNames);
    state = "Lagos";
  }

  return { name, state };
};

const PurchaseToast = () => {
  const [purchase, setPurchase] = useState<{ name: string; state: string } | null>(null);

  useEffect(() => {
    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      setPurchase(generatePurchase());
    }, 3000);

    // Continuous loop
    const interval = setInterval(() => {
      setPurchase(null); // hide current
      
      setTimeout(() => {
        setPurchase(generatePurchase());
      }, 500); // 500ms delay before showing next

    }, 8000); // Show a new one every 8 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-24 right-4 md:right-8 z-50 pointer-events-none">
      <AnimatePresence>
        {purchase && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-xl p-4 flex items-center gap-4 max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#ff4306]/10 flex flex-shrink-0 items-center justify-center">
              <svg className="w-5 h-5 text-[#ff4306]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-neutral-900 dark:text-neutral-100">
                <span className="font-semibold">{purchase.name}</span> from {purchase.state}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                just purchased Escape AI Slop
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseToast;
