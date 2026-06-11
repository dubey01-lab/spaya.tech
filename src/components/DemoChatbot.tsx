import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, X } from 'lucide-react';
import { storage } from '../lib/storage';
import { sendEmail } from '../lib/email';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  isForm?: boolean;
  formType?: string;
}

interface ChatbotProps {
  type: string;
  title: string;
  initialMessage: string;
  options: string[];
  color: string;
  onClose: () => void;
}

export default function DemoChatbot({ type, title, initialMessage, options, color, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: initialMessage, options }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', extra: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, opts?: string[], formType?: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        type: 'bot',
        text,
        options: opts,
        isForm: !!formType,
        formType
      }]);
    }, 600);
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => prev.map(m => ({ ...m, options: undefined }))); // Remove old options
    setMessages(prev => [...prev, { id: crypto.randomUUID(), type: 'user', text: option }]);

    // Logic based on chatbot type and option selected
    if (option.includes('Book') || option.includes('Schedule') || option.includes('Consultation') || option.includes('Tour')) {
      addBotMessage(`Excellent. To proceed with ${option.toLowerCase()}, I just need a few details.`, undefined, 'booking');
    } else if (option === 'Doctor Directory') {
      addBotMessage("Here are our top specialists:\n• Dr Rajesh Sharma (General)\n• Dr Priya Singh (Ortho)\n• Dr Amit Gupta (Pediatrics)\n• Dr Neha Verma (Gyne)\n• Dr Arjun Mishra (Cardio)", ['Book Appointment', 'Back to Menu']);
    } else if (option === 'Available Bikes') {
      addBotMessage("We have the latest models including:\n• Sports Series (R15, MT-15)\n• Commuter (FZ, Fascino)\n• Premium (R3)", ['Test Ride Booking', 'EMI Calculator']);
    } else {
      addBotMessage(`I can help you with ${option}. Our team is ready to assist. Would you like to book a session?`, ['Yes, Book Now', 'No, maybe later']);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendEmail({
        source: `Chatbot Request: ${type} - ${formType}`,
        name: formData.name,
        email: 'Not provided',
        phone: formData.phone,
        business: type,
        city: 'Not provided',
        message: `Chatbot lead captured: ${formData.extra || 'N/A'}`
      });

      // Save to local storage representing a sent lead only on success
      storage.saveChatRequest({
        botType: type,
        userName: formData.name,
        userPhone: formData.phone,
        requestType: formType,
        details: formData.extra || 'N/A'
      });

      setMessages(prev => prev.map(m => m.isForm ? { ...m, isForm: false, text: m.text + ' (Details Submitted)' } : m));
      addBotMessage(`Thank you, ${formData.name}! Your request has been received. Our team will contact you shortly at ${formData.phone}.`, ['Back to Menu']);
      setFormData({ name: '', phone: '', extra: '' });
    } catch (err) {
      console.error('Failed to send email:', err);
      // We don't remove the form if it fails, or we can just send an error message from the bot
      addBotMessage(`Sorry, there was an error sending your request. Please try again or contact us directly.`, ['Back to Menu']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: crypto.randomUUID(), type: 'user', text: input }]);
    setInput('');
    addBotMessage("I am a demo bot. Please select one of the predefined options to explore my capabilities.", options);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a1a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Header */}
      <div className={`p-4 bg-gradient-to-r ${color} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white leading-tight">{title}</h3>
            <span className="text-xs text-white/70 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" /> Online
            </span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white p-1">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a1a] custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 ${msg.type === 'user' ? `bg-gradient-to-br ${color} text-white rounded-tr-sm` : 'glass-panel text-gray-200 rounded-tl-sm'}`}>
              <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
              
              {msg.options && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.options.map((opt, i) => (
                     <button 
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className={`text-xs border border-${color.split(' ')[1].replace('to-', '')} text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors`}
                        style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                     >
                        {opt}
                     </button>
                  ))}
                </div>
              )}

              {msg.isForm && (
                <form onSubmit={(e) => handleFormSubmit(e, msg.formType!)} className="mt-3 space-y-2">
                  <input required type="text" placeholder="Name" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="tel" placeholder="Phone" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r ${color} text-white font-medium py-2 rounded text-xs flex justify-center items-center h-8`}>
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={`p-2 rounded-xl bg-gradient-to-r ${color} text-white hover:opacity-90`}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
