import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  X,
  Tag,
  Layers,
  Palette,
  Maximize2,
  Box,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Attribute {
  id: number;
  name: string;
  type: 'Tag' | 'Size' | 'Color' | 'Material';
  usage: number;
  status: 'Active' | 'Inactive';
  values?: string[];
}

const mockAttributes: Attribute[] = [
  { id: 1, name: 'Summer 2024', type: 'Tag', usage: 124, status: 'Active' },
  { id: 2, name: 'Standard Sizes', type: 'Size', usage: 450, status: 'Active', values: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 3, name: 'Obsidian Black', type: 'Color', usage: 89, status: 'Active', values: ['#080808'] },
  { id: 4, name: 'Italian Silk', type: 'Material', usage: 56, status: 'Active' },
  { id: 5, name: 'Limited Edition', type: 'Tag', usage: 12, status: 'Active' },
  { id: 6, name: 'Midnight Velvet', type: 'Material', usage: 34, status: 'Active' },
];

const AdminTags: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Tags & Attributes</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockAttributes.length} Defined
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Define product variations and organizational tags</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Create New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Type: All</option>
            <option>Tag</option>
            <option>Size</option>
            <option>Color</option>
            <option>Material</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Attributes Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Attribute Name</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Type</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Values</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Usage Count</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockAttributes.map((attr, idx) => (
                <motion.tr 
                  key={attr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-admin-gold/5 border border-admin-gold/10 text-admin-gold">
                        {attr.type === 'Tag' ? <Tag size={14} /> :
                         attr.type === 'Size' ? <Maximize2 size={14} /> :
                         attr.type === 'Color' ? <Palette size={14} /> : <Box size={14} />}
                      </div>
                      <span className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors">{attr.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{attr.type}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {attr.values ? attr.values.map(v => (
                        <span key={v} className="px-2 py-0.5 bg-black/20 border border-admin-gold/10 text-[8px] font-bold uppercase tracking-widest text-admin-gold/60">
                          {v}
                        </span>
                      )) : <span className="text-[10px] opacity-20 italic">N/A</span>}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold">{attr.usage} Products</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-admin-success" />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{attr.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all">
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-6 of 42 attributes</p>
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

      {/* Create Attribute Slide-over */}
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-[600px] bg-admin-sidebar border-l border-admin-gold/20 z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-10 border-b border-admin-gold/10 flex items-center justify-between bg-black/20">
                <div>
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">New Attribute</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Define a new product property</p>
                </div>
                <button onClick={() => setIsAddPanelOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Settings size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Basic Configuration</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Attribute Name</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. Primary Material" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Attribute Type</label>
                      <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                        <option>Tag</option>
                        <option>Size</option>
                        <option>Color</option>
                        <option>Material</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Layers size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Values & Options</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Defined Values</label>
                      <div className="flex flex-wrap gap-2">
                        {['Silk', 'Velvet', 'Cashmere'].map(v => (
                          <div key={v} className="flex items-center gap-2 px-3 py-2 bg-admin-gold/10 border border-admin-gold/20 text-[10px] font-bold uppercase tracking-widest text-admin-gold">
                            {v} <X size={12} className="cursor-pointer hover:text-white" />
                          </div>
                        ))}
                        <button className="px-3 py-2 border border-dashed border-admin-gold/20 text-[10px] font-bold uppercase tracking-widest text-admin-gold/40 hover:border-admin-gold hover:text-admin-gold transition-all">
                          + Add Value
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <CheckCircle2 size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Visibility</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                      <div className="space-y-1">
                        <p className="text-xs font-bold">Show in storefront filters</p>
                        <p className="text-[8px] uppercase tracking-widest opacity-30">Allow customers to filter products by this attribute</p>
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
                  Save Attribute
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTags;
