import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X,
  User,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
  Shield,
  Ban,
  History,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Customer {
  id: number;
  name: string;
  email: string;
  role: 'Customer' | 'VIP' | 'Admin' | 'Editor';
  status: 'Active' | 'Suspended' | 'Inactive';
  totalSpend: number;
  ordersCount: number;
  lastActive: string;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'Julianne Moore', email: 'j.moore@example.com', role: 'VIP', status: 'Active', totalSpend: 12450.00, ordersCount: 12, lastActive: '2 hours ago' },
  { id: 2, name: 'Alexander Wang', email: 'wang.a@example.com', role: 'Customer', status: 'Active', totalSpend: 450.00, ordersCount: 1, lastActive: '1 day ago' },
  { id: 3, name: 'Elena Gilbert', email: 'elena.g@mystic.com', role: 'Customer', status: 'Inactive', totalSpend: 890.00, ordersCount: 2, lastActive: '3 weeks ago' },
  { id: 4, name: 'Marcus Aurelius', email: 'marcus@rome.gov', role: 'VIP', status: 'Active', totalSpend: 32000.00, ordersCount: 45, lastActive: 'Just now' },
  { id: 5, name: 'Sophia Loren', email: 'sophia@cinema.it', role: 'Customer', status: 'Suspended', totalSpend: 150.00, ordersCount: 1, lastActive: '2 months ago' },
  { id: 6, name: 'David Gandy', email: 'gandy.d@models.uk', role: 'VIP', status: 'Active', totalSpend: 7800.00, ordersCount: 8, lastActive: '5 hours ago' },
  { id: 7, name: 'Naomi Campbell', email: 'naomi@runway.com', role: 'VIP', status: 'Active', totalSpend: 21000.00, ordersCount: 15, lastActive: '12 hours ago' },
  { id: 8, name: 'Tom Ford', email: 'tom@ford.com', role: 'Admin', status: 'Active', totalSpend: 0.00, ordersCount: 0, lastActive: 'Active now' },
];

const AdminUsers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Customers</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockCustomers.length} Total
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage your clientele and access levels</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all group">
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Role: All</option>
            <option>VIP</option>
            <option>Customer</option>
            <option>Admin</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Inactive</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Customer</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Email</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Role</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Total Spend</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Orders</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Last Active</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockCustomers.map((customer, idx) => (
                <motion.tr 
                  key={customer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => openProfile(customer)}>
                      <div className="w-10 h-10 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold font-bold border border-admin-gold/20 group-hover:border-admin-gold transition-colors">
                        {customer.name.charAt(0)}
                      </div>
                      <p className="text-sm font-bold group-hover:text-admin-gold transition-colors">{customer.name}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-40">{customer.email}</span>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      customer.role === 'VIP' ? "bg-admin-gold/10 border-admin-gold/30 text-admin-gold" :
                      customer.role === 'Admin' ? "bg-admin-info/10 border-admin-info/30 text-admin-info" :
                      "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {customer.role}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        customer.status === 'Active' ? "bg-admin-success" :
                        customer.status === 'Suspended' ? "bg-admin-danger" : "bg-admin-ivory/20"
                      )} />
                      <span className="text-xs">{customer.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold">${customer.totalSpend.toLocaleString()}</td>
                  <td className="p-6 text-xs opacity-60">{customer.ordersCount}</td>
                  <td className="p-6 text-[10px] uppercase tracking-widest opacity-40">{customer.lastActive}</td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openProfile(customer)} className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="View Profile">
                        <User size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
                        <MoreVertical size={16} />
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-8 of 1,240 customers</p>
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

      {/* Customer Profile Slide-over */}
      <AnimatePresence>
        {isProfileOpen && selectedCustomer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
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
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold text-3xl font-bold border-2 border-admin-gold/20 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">{selectedCustomer.name}</h3>
                      <span className="px-2 py-0.5 bg-admin-gold/10 text-admin-gold text-[8px] font-bold uppercase tracking-widest border border-admin-gold/20">
                        {selectedCustomer.role}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Customer ID: ZEL-USR-{selectedCustomer.id}00</p>
                  </div>
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Total Spend</p>
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-admin-gold" />
                      <p className="text-lg font-bold">${selectedCustomer.totalSpend.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Total Orders</p>
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={14} className="text-admin-gold" />
                      <p className="text-lg font-bold">{selectedCustomer.ordersCount}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Status</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-admin-success" />
                      <p className="text-lg font-bold">{selectedCustomer.status}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Mail size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Contact Details</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Email Address</p>
                      <p className="text-sm">{selectedCustomer.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Phone Number</p>
                      <p className="text-sm">+1 (555) 012-3456</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Joined Date</p>
                      <p className="text-sm">January 12, 2023</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Last Active</p>
                      <p className="text-sm">{selectedCustomer.lastActive}</p>
                    </div>
                  </div>
                </section>

                {/* Recent Activity */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Activity size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Recent Activity</h4>
                  </div>
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4 p-4 bg-black/20 border border-admin-gold/5">
                        <div className="w-8 h-8 rounded-full bg-admin-gold/5 flex items-center justify-center shrink-0">
                          <ShoppingBag size={14} className="text-admin-gold/40" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Placed an order <span className="text-admin-gold">#ORD-8821</span></p>
                          <p className="text-[9px] opacity-30 mt-1 uppercase tracking-widest">2 hours ago — $1,240.00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Security & Access */}
                <section className="space-y-6 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Shield size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Security & Access Control</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 border border-admin-gold/20 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/5 transition-all">
                      <Edit size={14} /> Edit Profile
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-admin-danger/20 text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:bg-admin-danger/5 transition-all">
                      <Ban size={14} /> Suspend Account
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-admin-gold/20 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/5 transition-all">
                      <History size={14} /> View Full Logs
                    </button>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Close
                </button>
                <button className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
