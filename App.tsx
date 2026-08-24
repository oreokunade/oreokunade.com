import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import CaseStudy from './pages/CaseStudy';
import EscapeAISlop from './pages/EscapeAISlop';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';

const App = () => {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change or to hash element
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/escape-ai-slop" element={<ErrorBoundary><EscapeAISlop /></ErrorBoundary>} />
        <Route path="/work/:id" element={<ErrorBoundary><CaseStudy /></ErrorBoundary>} />
      </Routes>
    </>
  );
};

export default App;