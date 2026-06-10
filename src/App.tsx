import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import FirstVisitLogin from './components/FirstVisitLogin';
import Hero from './components/Hero';
import Services from './components/Services';
import DemoCenter from './components/DemoCenter';
import Portfolio from './components/Portfolio';
import SocialProof from './components/SocialProof';
import PricingContact from './components/PricingContact';
import AdminDashboard from './components/AdminDashboard';
import { storage } from './lib/storage';

export default function App() {
  const [showFirstVisit, setShowFirstVisit] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Analytics & First Visit Check
    const hasVisited = storage.hasVisited();
    if (!hasVisited) {
      setShowFirstVisit(true);
    } else {
      // Increment only on repeated visits for simplicity, or manage properly
      storage.incrementVisitor();
    }

    // Admin shortcut Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdmin(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-[#6366f1] selection:text-white font-sans">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#00d9ff] flex items-center justify-center font-display font-bold text-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">S</div>
            <span className="text-xl font-display font-bold tracking-tight">Spaya</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
             <a href="#services" className="hover:text-white transition-colors">Services</a>
             <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
             <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
             <a href="#proof" className="hover:text-white transition-colors">Results</a>
          </div>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-semibold transition-all">Get Quote</a>
        </div>
      </nav>

      <main className="pt-20">
        <Hero />
        <Services />
        <DemoCenter />
        <Portfolio />
        <SocialProof />
        <PricingContact />
      </main>

      <footer className="bg-black/50 border-t border-white/10 py-12 text-center">
         <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6366f1] to-[#00d9ff] flex items-center justify-center font-display font-bold text-xs">S</div>
              <span className="font-display font-bold">Spaya Technologies</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">Powering Local Businesses With AI</p>
            <p className="text-gray-600 text-xs">Â© {new Date().getFullYear()} Spaya Technologies. All rights reserved.</p>
         </div>
      </footer>

      {/* Modals & Overlays */}
      {showFirstVisit && <FirstVisitLogin onComplete={() => setShowFirstVisit(false)} />}
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
