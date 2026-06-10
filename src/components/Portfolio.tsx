import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { whatsappLink } from '../lib/storage';

const projects = [
  {
    title: 'City Care Hospital',
    type: 'Healthcare Platform',
    color: 'from-blue-500 to-cyan-400',
    mockupUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['Patient Portal', 'React', 'AI Appointment']
  },
  {
    title: 'Premium Motors',
    type: 'Automotive Showroom',
    color: 'from-red-500 to-orange-400',
    mockupUrl: 'https://images.unsplash.com/photo-1558661557-0b1a03e1a681?q=80&w=2070&auto=format&fit=crop',
    tags: ['Virtual Tour', 'EMI Calc', 'Next.js']
  },
  {
    title: 'Royal Grandeur',
    type: 'Event Venue',
    color: 'from-pink-500 to-purple-400',
    mockupUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
    tags: ['3D Mapping', 'Booking Flow', 'Tailwind']
  },
  {
    title: 'The Spice Route',
    type: 'Fine Dining',
    color: 'from-emerald-500 to-teal-400',
    mockupUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
    tags: ['Live Menu', 'Table Booking', 'Payment Gateway']
  }
];

export default function Portfolio() {
  return (
    <section className="py-24 relative" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our <span className="text-gradient">Masterpieces</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Premium websites crafted with precision, designed to convert visitors into loyal clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl glass-panel aspect-video"
            >
              <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110">
                  <ExternalLink size={24} />
                </a>
                <p className="text-white mt-4 font-medium tracking-widest text-sm uppercase transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">View Project</p>
              </div>
              
              <div className="absolute inset-0 z-0">
                <img src={project.mockupUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent`} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${project.color} text-white text-xs font-bold rounded-full mb-3`}>
                  {project.type}
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex py-4 px-8 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#00d9ff] text-white font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow">
                Start Your Project
             </a>
        </div>
      </div>
    </section>
  );
}
