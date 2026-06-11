import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../lib/storage';
import { sendEmail } from '../lib/email';

interface Props {
  onComplete: () => void;
}

export default function FirstVisitLogin({ onComplete }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await sendEmail({
        source: 'First Visit Panel Registration',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        business: formData.businessType,
        message: 'New user registered via First Visit Panel.'
      });
      
      // Save locally only on success
      storage.saveLead({
        ...formData,
        source: 'First Visit Panel'
      });
      storage.setVisited();

      setIsSubmitting(false);
      onComplete();
    } catch (e) {
      console.error('Failed to send email:', e);
      setErrorMsg('Failed to complete registration. Please check your configuration or try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Water flow effect behind */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-[#00d9ff22] via-[#6366f111] to-[#ec489922] animate-blob" />
      </div>

      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 25 }}
        className="glass-panel relative w-full max-w-md p-8 rounded-3xl overflow-hidden border border-white/10"
      >
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome to <span className="text-gradient">Spaya</span></h2>
          <p className="text-gray-400 font-sans text-sm">Powering Local Businesses With AI. Claim your free demo account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {errorMsg && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-xl text-center">{errorMsg}</div>}
          <div>
            <input 
              required
              type="text" 
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <input 
              required
              type="email" 
              placeholder="Work Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <input 
              required
              type="tel" 
              placeholder="WhatsApp Number"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              required
              type="text" 
              placeholder="City (e.g. Varanasi)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
            />
            <input 
              required
              type="text" 
              placeholder="Business Type"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all"
              value={formData.businessType}
              onChange={e => setFormData({ ...formData, businessType: e.target.value })}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-gradient-to-r from-[#6366f1] to-[#00d9ff] hover:from-[#4f46e5] hover:to-[#00b4d8] text-white font-medium py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Enter Spaya Experience'
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
