import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Tag,
  Calendar,
  Users,
  ShoppingBag,
  Percent,
  DollarSign,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Discount {
  id: number;
  code: string;
  type: 'Percentage' | 'Fixed Amount' | 'BOGO' | 'Free Shipping';
  value: string;
  usage: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  startDate: string;
  endDate: string;
}

const mockDiscounts: Discount[] = [
  { id: 1, code: 'ZELORI20', type: 'Percentage', value: '20%', usage: '1,240 / ∞', status: 'Active', startDate: 'May 01, 2024', endDate: 'Dec 31, 2024' },
  { id: 2, code: 'WELCOME100', type: 'Fixed Amount', value: '$100.00', usage: '450 / 1,000', status: 'Active', startDate: 'Jan 01, 2024', endDate: 'Ongoing' },
  { id: 3, code: 'SUMMER_BOGO', type: 'BOGO', value: 'Buy 1 Get 1', usage: '89 / 500', status: 'Scheduled', startDate: 'Jun 01, 2024', endDate: 'Aug 31, 2024' },
  { id: 4, code: 'FREESHIP_VIP', type: 'Free Shipping', value: 'Free', usage: '210 / ∞', status: 'Active', startDate: 'Mar 15, 2024', endDate: 'Ongoing' },
  { id: 5, code: 'FLASH50', type: 'Percentage', value: '50%', usage: '500 / 500', status: 'Expired', startDate: 'May 10, 2024', endDate: 'May 11, 2024' },
];

const AdminDiscounts: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Discounts</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockDiscounts.length} Active Codes
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Configure promotional offers and coupons</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Create Discount
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by discount code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Type: All</option>
            <option>Percentage</option>
            <option>Fixed Amount</option>
            <option>BOGO</option>
            <option>Free Shipping</option>
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

      {/* Discounts Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Discount Code</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Type</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Value</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Usage</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Validity</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockDiscounts.map((discount, idx) => (
                <motion.tr 
                  key={discount.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-admin-gold/5 border border-admin-gold/10 text-admin-gold">
                        <Tag size={14} />
                      </div>
                      <span className="text-sm font-bold tracking-widest font-mono">{discount.code}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-60">{discount.type}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold text-admin-gold">{discount.value}</span>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{discount.usage}</p>
                      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-admin-gold" style={{ width: discount.status === 'Expired' ? '100%' : '40%' }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      discount.status === 'Active' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      discount.status === 'Scheduled' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-admin-danger/5 border-admin-danger/20 text-admin-danger"
                    )}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] opacity-60 uppercase tracking-widest">{discount.startDate}</span>
                      <span className="text-[10px] opacity-30 uppercase tracking-widest mt-1">to {discount.endDate}</span>
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 24 discount codes</p>
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

      {/* Create Discount Slide-over */}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">Create Discount</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Configure a new promotional offer</p>
                </div>
                <button onClick={() => setIsAddPanelOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-16 custom-scrollbar">
                {/* Section 1: Code & Type */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Tag size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Discount Configuration</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Discount Code</label>
                        <button className="text-[8px] uppercase tracking-widest font-bold text-admin-gold hover:underline flex items-center gap-1">
                          <RefreshCw size={10} /> Generate Random
                        </button>
                      </div>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm font-mono tracking-widest focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. SUMMER2024" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Discount Type</label>
                        <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                          <option>Percentage</option>
                          <option>Fixed Amount</option>
                          <option>BOGO</option>
                          <option>Free Shipping</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Discount Value</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40 text-xs">%</span>
                          <input type="number" className="w-full bg-black/20 border border-admin-gold/10 pl-8 pr-4 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Requirements */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ShoppingBag size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Requirements & Limits</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Minimum Requirements</label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="req" id="none" className="accent-admin-gold" defaultChecked />
                          <label htmlFor="none" className="text-xs">None</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="req" id="min_spend" className="accent-admin-gold" />
                          <label htmlFor="min_spend" className="text-xs">Minimum purchase amount ($)</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="req" id="min_qty" className="accent-admin-gold" />
                          <label htmlFor="min_qty" className="text-xs">Minimum quantity of items</label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Usage Limit (Total)</label>
                        <input type="number" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="∞" />
                      </div>
                      <div className="space-y-2 flex items-center gap-3 pt-6">
                        <input type="checkbox" id="one_per" className="accent-admin-gold w-4 h-4" />
                        <label htmlFor="one_per" className="text-xs opacity-60">Limit to one use per customer</label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Eligibility */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Users size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Customer Eligibility</h4>
                  </div>
                  <div className="space-y-4">
                    {['Everyone', 'Specific Customer Segments', 'Specific Customers'].map(option => (
                      <div key={option} className="flex items-center gap-3">
                        <input type="radio" name="eligibility" id={option} className="accent-admin-gold" defaultChecked={option === 'Everyone'} />
                        <label htmlFor={option} className="text-xs">{option}</label>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 4: Active Dates */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Calendar size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Active Dates</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Start Date</label>
                      <input type="date" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">End Date (Optional)</label>
                      <input type="date" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
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
                  Create Discount
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDiscounts;
