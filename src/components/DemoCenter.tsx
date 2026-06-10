import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Bike, HeartHandshake, UtensilsCrossed, ChevronRight, Bot } from 'lucide-react';
import DemoChatbot from './DemoChatbot';

const BOTS = [
  {
    id: 'hospital',
    title: 'Hospital Support Bot',
    icon: <Stethoscope size={28} />,
    color: 'from-[#0ea5e9] to-[#3b82f6]', // Blue
    desc: 'Handles appointments, doctor queries, OPD timings & emergency help.',
    initialMessage: 'Welcome to City Care Hospital. How can I assist you with your health today?',
    options: ['Doctor Directory', 'Book Appointment', 'OPD Timings', 'Emergency Help', 'Health Packages', 'Callback Request']
  },
  {
    id: 'bike',
    title: 'Showroom Assistant',
    icon: <Bike size={28} />,
    color: 'from-[#ef4444] to-[#f97316]', // Red/Orange
    desc: 'Showcases bikes, calculates EMI, and books test rides.',
    initialMessage: 'Welcome to Premium Motors. Looking for your dream ride?',
    options: ['Available Bikes', 'EMI Calculator', 'Test Ride Booking', 'Service Booking', 'Exchange Valuation']
  },
  {
    id: 'marriage',
    title: 'Venue Concierge',
    icon: <HeartHandshake size={28} />,
    color: 'from-[#ec4899] to-[#d946ef]', // Pink
    desc: 'Manages hall availability, packages, and venue tours.',
    initialMessage: 'Welcome to Royal Grandeur. Planning your perfect day?',
    options: ['Date Availability', 'Decoration Packages', 'Venue Tour Booking', 'Catering Packages', 'Price Estimation']
  },
  {
    id: 'restaurant',
    title: 'Dine-In Manager',
    icon: <UtensilsCrossed size={28} />,
    color: 'from-[#10b981] to-[#14b8a6]', // Emerald
    desc: 'Takes table bookings, bulk orders, and shows the menu.',
    initialMessage: 'Welcome to The Spice Route. Hungry for something delicious?',
    options: ['Table Booking', 'Menu', 'Party Booking', 'Delivery', 'Reviews']
  }
];

export default function DemoCenter() {
  const [activeBot, setActiveBot] = useState<string | null>(null);

  const activeBotData = BOTS.find(b => b.id === activeBot);

  return (
    <section className="py-24 relative" id="demo">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#6366f1]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10"
          >
            <span className="text-sm font-medium text-[#ec4899]">Live Experience Center</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Interact With <span className="text-gradient">The Future</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Test our industry-specific AI Chatbot templates. Fully functional and ready to be deployed for your business.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl mx-auto h-[600px]">
          {/* Bot Selection List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {BOTS.map((bot) => (
              <button
                key={bot.id}
                onClick={() => setActiveBot(bot.id)}
                className={`text-left p-6 rounded-2xl glass-panel transition-all flex items-center justify-between group
                  ${activeBot === bot.id ? `ring-2 ring-white/50 bg-gradient-to-r ${bot.color} opacity-90` : 'hover:border-white/30'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg
                    ${activeBot === bot.id ? 'bg-white text-black' : `bg-gradient-to-br ${bot.color} text-white`}`}>
                    {bot.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeBot === bot.id ? 'text-white' : 'text-gray-200'}`}>{bot.title}</h3>
                    <p className={`text-xs mt-1 ${activeBot === bot.id ? 'text-white/80' : 'text-gray-500'}`}>{bot.id.charAt(0).toUpperCase() + bot.id.slice(1)} Template</p>
                  </div>
                </div>
                <ChevronRight className={`transition-transform ${activeBot === bot.id ? 'text-white translate-x-1' : 'text-gray-500 group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>

          {/* Active Bot Area */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-full relative">
            <AnimatePresence mode="wait">
              {activeBotData ? (
                <motion.div
                  key={activeBotData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-2xl p-1 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl"
                >
                  <DemoChatbot 
                    type={activeBotData.id}
                    title={activeBotData.title}
                    initialMessage={activeBotData.initialMessage}
                    options={activeBotData.options}
                    color={activeBotData.color}
                    onClose={() => setActiveBot(null)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full glass-panel rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse-glow">
                    <Bot size={48} className="text-[#6366f1]" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Select a Demo</h3>
                  <p className="text-gray-400 max-w-sm">Choose an industry specific template from the left to experience our AI chatbots in action.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
