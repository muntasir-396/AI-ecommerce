import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  X,
  Mail,
  Users,
  Send,
  BarChart3,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Settings,
  MousePointer2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Campaign {
  id: number;
  subject: string;
  recipients: number;
  sentDate: string;
  openRate: string;
  clickRate: string;
  status: 'Sent' | 'Draft' | 'Scheduled';
}

const mockCampaigns: Campaign[] = [
  { id: 1, subject: 'Summer Collection Early Access', recipients: 12450, sentDate: 'May 15, 2024', openRate: '42.5%', clickRate: '12.4%', status: 'Sent' },
  { id: 2, subject: 'Exclusive VIP Rewards Program', recipients: 850, sentDate: 'May 18, 2024', openRate: '85.2%', clickRate: '34.1%', status: 'Sent' },
  { id: 3, subject: 'New Arrivals: Obsidian Series', recipients: 15200, sentDate: 'Jun 01, 2024', openRate: '0%', clickRate: '0%', status: 'Scheduled' },
  { id: 4, subject: 'Your Cart is Waiting...', recipients: 450, sentDate: '-', openRate: '0%', clickRate: '0%', status: 'Draft' },
  { id: 5, subject: 'Holiday Gift Guide 2024', recipients: 25000, sentDate: 'Dec 01, 2023', openRate: '38.1%', clickRate: '8.2%', status: 'Sent' },
];

const AdminNewsletters: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Newsletters</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              12,450 Subscribers
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Engage your audience with curated luxury content</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search campaigns by subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Sent</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Campaign Subject</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Recipients</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Sent Date</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Open Rate</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Click Rate</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockCampaigns.map((campaign, idx) => (
                <motion.tr 
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-admin-gold/5 border border-admin-gold/10 text-admin-gold">
                        <Mail size={14} />
                      </div>
                      <span className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors">{campaign.subject}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-60">{campaign.recipients.toLocaleString()}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{campaign.sentDate}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Eye size={12} className="text-admin-gold/40" />
                      <span className="text-xs font-bold">{campaign.openRate}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <MousePointer2 size={12} className="text-admin-gold/40" />
                      <span className="text-xs font-bold">{campaign.clickRate}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      campaign.status === 'Sent' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      campaign.status === 'Scheduled' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="View Report">
                        <BarChart3 size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-admin-gold/10 flex items-center justify-between bg-black/10">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 48 campaigns</p>
          <div className="flex items-center gap-3">
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map(p => (
                <button key={p} className={cn(
                  "w-10 h-10 text-[10px] font-bold border transition-all",
                  p === 1 ? "bg-admin-gold text-admin-bg border-admin-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]" : "border-admin-gold/10 text-admin-gold/40 hover:border-admin-gold hover:text-admin-gold"
                )}>
                  {p}
                </button>
              ))}
            </div>
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Campaign Slide-over */}
      <AnimatePresence>
        {isAddPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddPanelOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[720px] bg-admin-sidebar border-l border-admin-gold/20 z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-10 border-b border-admin-gold/10 flex items-center justify-between bg-black/20">
                <div>
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">New Campaign</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Design a new luxury communication</p>
                </div>
                <button onClick={() => setIsAddPanelOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-16 custom-scrollbar">
                {/* Section 1: Basic Info */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Settings size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Campaign Details</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email Subject Line</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. Discover the Obsidian Series" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Preview Text</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="A short summary for the inbox preview..." />
                    </div>
                  </div>
                </section>

                {/* Section 2: Audience */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Users size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Target Audience</h4>
                  </div>
                  <div className="space-y-4">
                    {['All Subscribers', 'VIP Customers Only', 'New Subscribers (Last 30 Days)', 'Specific Segment'].map(option => (
                      <div key={option} className="flex items-center gap-3">
                        <input type="radio" name="audience" id={option} className="accent-admin-gold" defaultChecked={option === 'All Subscribers'} />
                        <label htmlFor={option} className="text-xs">{option}</label>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: Content Editor Placeholder */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Edit size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Email Content</h4>
                  </div>
                  <div className="border-2 border-dashed border-admin-gold/10 p-20 text-center bg-black/10 group hover:border-admin-gold/40 transition-all cursor-pointer">
                    <Plus size={32} className="text-admin-gold/20 mx-auto mb-4 group-hover:text-admin-gold transition-colors" />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-admin-gold/60">Launch Visual Email Builder</p>
                  </div>
                </section>

                {/* Section 4: Scheduling */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Clock size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Send Schedule</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Send Date</label>
                      <input type="date" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Send Time</label>
                      <input type="time" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => setIsAddPanelOpen(false)}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Save as Draft
                </button>
                <button className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  <Send size={14} className="inline mr-2" /> Schedule Campaign
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNewsletters;
