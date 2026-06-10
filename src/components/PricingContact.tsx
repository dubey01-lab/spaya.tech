import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Phone, MapPin, QrCode, X } from 'lucide-react';
import { storage, companyPhone, whatsappLink } from '../lib/storage';

const plans = [
  {
    name: 'Starter',
    price: 'â¹4,999',
    period: '/mo',
    desc: 'Perfect for small local businesses.',
    color: 'from-gray-500 to-gray-400',
    features: ['Custom 3-Page Website', 'Basic SEO Setup', 'Google Business Setup', 'Contact Form', 'Email Support']
  },
  {
    name: 'Growth',
    price: 'â¹14,999',
    period: '/mo',
    desc: 'For businesses ready to scale.',
    color: 'from-[#6366f1] to-[#00d9ff]',
    popular: true,
    features: ['Premium 10-Page Website', 'Advanced SEO & Analytics', 'AI Lead Gen Chatbot', 'Social Media Integration', 'Priority WhatsApp Support']
  },
  {
    name: 'Premium',
    price: 'Custom',
    period: '',
    desc: 'Full-scale marketing & automation.',
    color: 'from-[#ec4899] to-[#8b5cf6]',
    features: ['Custom Web App / Portal', 'Advanced Custom AI Agents', 'Full Paid Ads Management', 'CRM Integrations', '24/7 Dedicated Manager']
  }
];

export default function PricingContact() {
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    storage.saveLead({ ...formData, source: 'Contact Form' });
    
    // Simulate EmailJS
    console.log("simulating emailjs send to sivanshdubey69@gmail.com", formData);
    await new Promise(r => setTimeout(r, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', business: '', message: '' });
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pricing */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment <span className="text-gradient">Plans</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Transparent pricing. Exponential ROI.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel rounded-3xl p-8 relative flex flex-col ${plan.popular ? 'border-[#6366f1]/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] transform md:-translate-y-4' : 'border-white/10'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#6366f1] to-[#00d9ff] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#10b981]" />
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowQR(true)}
                  className={`w-full py-4 rounded-xl font-bold bg-gradient-to-r ${plan.color} text-white hover:opacity-90 transition-opacity`}
                >
                  Choose {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="flex flex-col lg:flex-row gap-12 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-xl">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Start Your <span className="text-gradient">Transformation</span></h2>
              <p className="text-gray-400 mb-8">Dominate your local market. Reach out to us today to get started.</p>
              
              <div className="space-y-6">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#10b981]/50 group-hover:text-[#10b981]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp / Call</p>
                    <p className="font-medium">+91 {companyPhone}</p>
                  </div>
                </a>
                <a href="mailto:sivanshdubey69@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6366f1]/50 group-hover:text-[#6366f1]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">sivanshdubey69@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Areas</p>
                    <p className="font-medium">Varanasi, Prayagraj, Lucknow, Kanpur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#10b981] to-[#047857] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <Check size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Received</h3>
                  <p className="text-gray-400">Our team will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="text" placeholder="Your Name" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input required type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input required type="text" placeholder="Business Name / Type" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} />
                  </div>
                  <textarea required placeholder="How can we help?" rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    {isSubmitting ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : 'Request Free Consultation'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a1a] border border-white/10 p-8 rounded-3xl max-w-sm w-full relative text-center"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#10b981] to-[#047857] rounded-full flex items-center justify-center mb-6">
                <QrCode size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Scan & Pay</h3>
              <p className="text-gray-400 text-sm mb-6">Scan with any UPI app to proceed with your subscription.</p>
              
              <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-6">
                {/* Simulated QR Code using a generic placeholder */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=spaya@upi&pn=SpayaTechnologies" alt="UPI QR" className="w-full h-full opacity-50" />
              </div>

              <a href={whatsappLink} target="_blank" rel="noreferrer" className="block w-full py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#1ebe5d] transition-colors mb-3">
                Send Payment Screenshot on WhatsApp
              </a>
              <p className="text-xs text-gray-500">100% Secure Payment handled by UPI.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
