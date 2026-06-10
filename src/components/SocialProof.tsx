import { motion } from 'motion/react';
import { TrendingUp, Users, CheckCircle2, Star, Play } from 'lucide-react';
import { whatsappLink } from '../lib/storage';

export default function SocialProof() {
  const reviews = [
     { name: 'Dr. Rajesh Khanna', role: 'Hospital Owner', text: 'Spaya transformed our patient intake. The AI chatbot handles 70% of our OPD queries automatically.', rating: 5, bg: 'from-blue-500/20 to-transparent' },
     { name: 'Vikram Singh', role: 'Restaurant Manager', text: 'Box bookings increased by 40% since Spaya deployed our new smart website. Absolutely phenomenal ROl.', rating: 5, bg: 'from-emerald-500/20 to-transparent' },
     { name: 'Aman Patel', role: 'Showroom Director', text: 'Test ride bookings are through the roof. Their Lead Generation systems actually work.', rating: 5, bg: 'from-red-500/20 to-transparent' },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="proof">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Before / After */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The <span className="text-gradient">Spaya Effect</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real numbers from real local businesses.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1 w-full glass-panel p-8 rounded-3xl border-gray-600/30 text-center"
             >
                <h3 className="text-xl text-gray-400 font-medium mb-4">Before Spaya</h3>
                <div className="text-5xl font-display font-bold text-gray-500 mb-2">5</div>
                <p className="text-gray-500">Leads Daily</p>
             </motion.div>
             
             <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366f1] to-[#00d9ff] flex items-center justify-center shrink-0 z-10 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                <TrendingUp className="text-white" />
             </div>
             
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1 w-full glass-panel p-8 rounded-3xl border-[#10b981]/30 bg-gradient-to-t from-[#10b981]/10 to-transparent text-center relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <TrendingUp size={100} className="text-[#10b981]" />
                </div>
                <h3 className="text-xl text-white font-medium mb-4">After Spaya</h3>
                <div className="text-5xl font-display font-bold text-[#10b981] mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">25+</div>
                <p className="text-[#10b981]/80 font-medium">Leads Daily</p>
             </motion.div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Client <span className="text-gradient">Testimonials</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={`glass-panel p-8 rounded-3xl bg-gradient-to-br ${review.bg} relative group hover:-translate-y-2 transition-transform duration-300`}
             >
                {/* Fake Video Play Button overlay for flair */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                   <Play size={16} className="text-white ml-1" />
                </div>
                <div className="flex gap-1 mb-6">
                   {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" className="text-[#f59e0b]" />)}
                </div>
                <p className="text-gray-300 mb-8 italic">"{review.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/20 flex items-center justify-center font-bold text-lg">
                      {review.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <p className="text-xs text-gradient">{review.role}</p>
                   </div>
                </div>
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
