import { motion } from 'motion/react';
import { Bot, Globe, MapPin, Share2, Target, Cpu } from 'lucide-react';
import { whatsappLink } from '../lib/storage';

const services = [
  {
    icon: <Bot size={32} />,
    title: 'AI Chatbots',
    description: 'Fully automated customer support and lead generation agents working 24/7.',
    features: ['Appointment Booking', 'Automated FAQs', 'Lead Capture'],
    color: 'from-[#6366f1] to-[#a855f7]'
  },
  {
    icon: <Globe size={32} />,
    title: 'Website Development',
    description: 'Ultra-premium, high-converting websites optimized for local businesses.',
    features: ['Custom Design', 'SEO Optimized', 'Mobile First'],
    color: 'from-[#00d9ff] to-[#3b82f6]'
  },
  {
    icon: <MapPin size={32} />,
    title: 'Google Business Profile',
    description: 'Dominate local searches and capture foot traffic in your city.',
    features: ['Profile Setup', 'Review Management', 'Local SEO'],
    color: 'from-[#10b981] to-[#047857]'
  },
  {
    icon: <Share2 size={32} />,
    title: 'Social Media Marketing',
    description: 'Engaging content and strategic campaigns to build your brand.',
    features: ['Content Strategy', 'Ad Management', 'Growth tracking'],
    color: 'from-[#f59e0b] to-[#ea580c]'
  },
  {
    icon: <Target size={32} />,
    title: 'Lead Generation Systems',
    description: 'Predictable patient and client acquisition funnels.',
    features: ['Paid Ads', 'Funnel Design', 'Conversion Tracking'],
    color: 'from-[#ec4899] to-[#e11d48]'
  },
  {
    icon: <Cpu size={32} />,
    title: 'AI Automation',
    description: 'Streamline operations with smart workflows and integrations.',
    features: ['CRM Integration', 'Email Automation', 'SMS Reminders'],
    color: 'from-[#8b5cf6] to-[#6366f1]'
  }
];

export default function Services() {
  return (
    <section className="py-24 relative z-10" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our <span className="text-gradient">Arsenal</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive digital solutions engineered for scale and dominance in the local market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative h-full perspective-1000"
            >
              <div className="glass-panel p-8 rounded-2xl h-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-[#6366f1]/30">
                <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold font-display mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 text-sm">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white group-hover:text-gradient transition-colors"
                >
                  Learn More <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}
