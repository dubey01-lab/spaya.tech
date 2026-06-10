import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Users, MessagesSquare, FormInput, Download, Search, Trash2 } from 'lucide-react';
import { storage } from '../lib/storage';
import { Lead, ChatRequest, Analytics } from '../types';

interface Props {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: Props) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({ visitors: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'chat'>('leads');

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setLeads(storage.getLeads());
    setChatRequests(storage.getChatRequests());
    setAnalytics(storage.getAnalytics());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'spayaadmin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin password. Try "spayaadmin".');
    }
  };

  const clearAll = () => {
    if(confirm('Are you sure you want to delete all local data?')) {
      storage.clearAll();
      loadData();
    }
  };

  const downloadCSV = () => {
    // Basic CSV generator
    let csvContent = "data:text/csv;charset=utf-8,";
    
    csvContent += "=== GENERAL LEADS ===\r\n";
    csvContent += "Type,Date,Name,Phone,Email,City,Business/Message\r\n";
    leads.forEach(l => {
      csvContent += `Lead,${l.date},${l.name},${l.phone},${l.email || ''},${l.city || ''},${l.businessType || l.source}\r\n`;
    });

    csvContent += "\r\n=== CHATBOT CAPTURES ===\r\n";
    csvContent += "BotType,Date,Name,Phone,RequestType,Details\r\n";
    chatRequests.forEach(c => {
      csvContent += `${c.botType},${c.date},${c.userName},${c.userPhone},${c.requestType},${c.details}\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spaya_business_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl w-full max-w-sm relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
          <h2 className="text-2xl font-bold font-display text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-[#6366f1]"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-[#6366f1] text-white font-bold py-3 rounded-xl">Login</button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-4">(Hint: "spayaadmin")</p>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone.includes(searchQuery));
  const filteredChats = chatRequests.filter(c => c.userName?.toLowerCase().includes(searchQuery.toLowerCase()) || c.userPhone?.includes(searchQuery));

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a1a] overflow-hidden flex flex-col font-sans">
      <div className="flex border-b border-white/10 h-16 items-center px-6 justify-between shrink-0 bg-white/5">
        <h1 className="text-xl font-display font-bold"><span className="text-gradient">Spaya</span> Command Center</h1>
        <div className="flex items-center gap-4">
          <button onClick={downloadCSV} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg"><Download size={16} /> Export CSV</button>
          <button onClick={clearAll} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 bg-red-400/10 px-3 py-1.5 rounded-lg"><Trash2 size={16} /> Clear DB</button>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
          <div className="glass-panel p-4 rounded-xl border border-[#6366f1]/30">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-[#6366f1]" size={20} />
              <h3 className="text-gray-400 text-sm">Total Visitors</h3>
            </div>
            <p className="text-3xl font-display font-bold">{analytics.visitors}</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-[#10b981]/30">
            <div className="flex items-center gap-3 mb-2">
              <FormInput className="text-[#10b981]" size={20} />
              <h3 className="text-gray-400 text-sm">Lead Form Submissions</h3>
            </div>
            <p className="text-3xl font-display font-bold">{leads.length}</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-[#ec4899]/30">
            <div className="flex items-center gap-3 mb-2">
              <MessagesSquare className="text-[#ec4899]" size={20} />
              <h3 className="text-gray-400 text-sm">Chatbot Leads</h3>
            </div>
            <p className="text-3xl font-display font-bold">{chatRequests.length}</p>
          </div>
        </div>

        {/* Data View */}
        <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
          <div className="flex border-b border-white/10 shrink-0 bg-white/5 p-2">
            <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'leads' ? 'bg-[#6366f1] text-white' : 'text-gray-400 hover:text-white'}`}>Contact Leads</button>
            <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2 ${activeTab === 'chat' ? 'bg-[#ec4899] text-white' : 'text-gray-400 hover:text-white'}`}>Chatbot Captures</button>
            <div className="ml-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black/30 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-[#6366f1]"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {activeTab === 'leads' ? (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Email / City</th>
                    <th className="pb-3 font-medium">Details</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {filteredLeads.map((l, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3"><span className="bg-[#6366f1]/20 text-[#6366f1] px-2 py-0.5 rounded text-xs">{l.source}</span></td>
                      <td className="py-3 font-medium">{l.name}</td>
                      <td className="py-3">{l.phone}</td>
                      <td className="py-3 text-gray-400">{l.email || '-'}<br/>{l.city || '-'}</td>
                      <td className="py-3 max-w-[200px] truncate" title={l.businessType || ''}>{l.businessType || '-'}</td>
                      <td className="py-3 text-xs text-gray-500">{new Date(l.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm">
               <thead>
                 <tr className="text-gray-400 border-b border-white/10">
                   <th className="pb-3 font-medium">Bot</th>
                   <th className="pb-3 font-medium">Name</th>
                   <th className="pb-3 font-medium">Phone</th>
                   <th className="pb-3 font-medium">Request Type</th>
                   <th className="pb-3 font-medium">Date</th>
                 </tr>
               </thead>
               <tbody className="text-gray-200">
                 {filteredChats.map((c, i) => (
                   <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                     <td className="py-3"><span className="bg-[#ec4899]/20 text-[#ec4899] px-2 py-0.5 rounded text-xs uppercase">{c.botType}</span></td>
                     <td className="py-3 font-medium">{c.userName || 'Anonymous'}</td>
                     <td className="py-3">{c.userPhone || '-'}</td>
                     <td className="py-3"><span className="border border-white/20 px-2 py-0.5 rounded text-xs">{c.requestType}</span></td>
                     <td className="py-3 text-xs text-gray-500">{new Date(c.date).toLocaleString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
