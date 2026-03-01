import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Layout,
  Calendar,
  MousePointer2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  Globe,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Banner {
  id: number;
  title: string;
  placement: 'Hero' | 'Sidebar' | 'Popup' | 'Footer' | 'Category Top';
  status: 'Active' | 'Scheduled' | 'Expired' | 'Draft';
  clicks: number;
  ctr: string;
  startDate: string;
  endDate: string;
  image: string;
}

const mockBanners: Banner[] = [
  { id: 1, title: 'Summer Collection 2024', placement: 'Hero', status: 'Active', clicks: 12450, ctr: '4.2%', startDate: 'May 01, 2024', endDate: 'Aug 31, 2024', image: 'https://picsum.photos/seed/banner1/800/400' },
  { id: 2, title: 'VIP Early Access', placement: 'Popup', status: 'Active', clicks: 3200, ctr: '12.5%', startDate: 'May 15, 2024', endDate: 'May 25, 2024', image: 'https://picsum.photos/seed/banner2/400/400' },
  { id: 3, title: 'Winter Clearance Sale', placement: 'Hero', status: 'Expired', clicks: 45800, ctr: '3.8%', startDate: 'Jan 01, 2024', endDate: 'Feb 28, 2024', image: 'https://picsum.photos/seed/banner3/800/400' },
  { id: 4, title: 'New Accessories Drop', placement: 'Sidebar', status: 'Scheduled', clicks: 0, ctr: '0%', startDate: 'Jun 01, 2024', endDate: 'Jun 30, 2024', image: 'https://picsum.photos/seed/banner4/300/600' },
  { id: 5, title: 'Free Shipping Promo', placement: 'Footer', status: 'Active', clicks: 8900, ctr: '1.2%', startDate: 'Mar 01, 2024', endDate: 'Ongoing', image: 'https://picsum.photos/seed/banner5/1200/200' },
];

const AdminBanners: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Banners</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockBanners.length} Total
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage storefront promotions and visual content</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Create Banner
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search banners by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Placement: All</option>
            <option>Hero</option>
            <option>Sidebar</option>
            <option>Popup</option>
            <option>Footer</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Banners Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Preview</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Banner Title</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Placement</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Schedule</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Performance</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockBanners.map((banner, idx) => (
                <motion.tr 
                  key={banner.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                  </td>
                  <td className="p-6">
                    <div className="w-24 h-12 bg-black/40 border border-admin-gold/10 overflow-hidden">
                      <img src={banner.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors">{banner.title}</p>
                    <p className="text-[9px] opacity-30 uppercase tracking-widest mt-1">ID: BNR-{banner.id}00</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Layout size={12} className="text-admin-gold/40" />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{banner.placement}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] opacity-60 uppercase tracking-widest">{banner.startDate}</span>
                      <span className="text-[10px] opacity-30 uppercase tracking-widest mt-1">to {banner.endDate}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      banner.status === 'Active' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      banner.status === 'Scheduled' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {banner.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold">{banner.clicks.toLocaleString()}</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-30">Clicks</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-admin-gold">{banner.ctr}</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-30">CTR</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Edit">
                        <Edit size={16} />
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 12 banners</p>
          <div className="flex items-center gap-3">
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {[1, 2].map(p => (
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

      {/* Create Banner Slide-over */}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">Create Banner</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Design a new promotional visual</p>
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
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Banner Details</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Internal Title</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. Summer Sale Hero 2024" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Placement</label>
                        <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                          <option>Hero Section</option>
                          <option>Sidebar Widget</option>
                          <option>Exit Intent Popup</option>
                          <option>Footer Bar</option>
                          <option>Category Top</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Target URL</label>
                        <div className="relative">
                          <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
                          <input type="text" className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="https://zelori.com/collections/..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Media */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ImageIcon size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Banner Creative</h4>
                  </div>
                  <div className="border-2 border-dashed border-admin-gold/10 p-16 text-center hover:border-admin-gold/40 transition-all cursor-pointer group bg-black/10">
                    <div className="w-16 h-16 rounded-full bg-admin-gold/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Plus size={32} className="text-admin-gold/40 group-hover:text-admin-gold transition-colors" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-admin-gold/60">Upload banner image</p>
                    <p className="text-[8px] opacity-20 mt-2 uppercase tracking-widest">Recommended: 1920x800 for Hero</p>
                  </div>
                </section>

                {/* Section 3: Scheduling */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Calendar size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Display Schedule</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Start Date & Time</label>
                      <input type="datetime-local" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">End Date & Time</label>
                      <input type="datetime-local" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                  </div>
                </section>

                {/* Section 4: Conditions */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Globe size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Display Conditions</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                      <div className="space-y-1">
                        <p className="text-xs font-bold">Show only to logged-in users</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-30">Target existing customers only</p>
                      </div>
                      <button className="w-12 h-6 bg-black/40 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                      <div className="space-y-1">
                        <p className="text-xs font-bold">Show only on specific categories</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-30">Contextual targeting</p>
                      </div>
                      <button className="w-12 h-6 bg-admin-gold rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-admin-bg rounded-full" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => setIsAddPanelOpen(false)}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Discard
                </button>
                <button className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  Publish Banner
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBanners;
