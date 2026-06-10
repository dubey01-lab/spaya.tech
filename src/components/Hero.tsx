import { motion } from 'motion/react';
import { Bot, LineChart, Code2, Cpu, ArrowRight } from 'lucide-react';
import { whatsappLink } from '../lib/storage';

export default function Hero() {
  const stats = [
    { label: 'Projects', value: '100+' },
    { label: 'AI Chatbots', value: '50+' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Delivery', value: '48 Hrs' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full glass-panel border border-[#6366f1]/30"
          >
            <span className="text-sm font-medium text-gradient">Powering Local Businesses With AI</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Transform Your Business <br className="hidden md:block" />
            <span className="text-gradient">With AI Automation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-400 font-sans mb-10 max-w-2xl mx-auto"
          >
            From intelligent chatbots to high-converting websites and lead generation systems. Experience the future of local business growth in Varanasi, Prayagraj, Lucknow & Kanpur.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Get Free Demo <ArrowRight size={18} />
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 font-semibold hover:bg-[#10b981]/20 transition-colors flex items-center justify-center gap-2">
              WhatsApp Now
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#00d9ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-3xl font-display font-bold text-white mb-1 relative z-10">{stat.value}</span>
                <span className="text-sm font-sans text-gray-400 relative z-10">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* 3D Floating Elements Simulation */}
      <div className="absolute top-[20%] left-[10%] opacity-20 animate-float" style={{ animationDelay: '0s' }}>
        <Bot size={64} className="text-[#6366f1]" />
      </div>
      <div className="absolute top-[30%] right-[15%] opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <LineChart size={48} className="text-[#00d9ff]" />
      </div>
      <div className="absolute bottom-[20%] left-[20%] opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Code2 size={56} className="text-[#ec4899]" />
      </div>
      <div className="absolute bottom-[30%] right-[10%] opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
        <Cpu size={60} className="text-[#10b981]" />
      </div>
    </section>
  );
}
