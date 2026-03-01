import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  X,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Key,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Support';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  twoFactor: boolean;
}

const mockAdmins: AdminAccount[] = [
  { id: 1, name: 'Admin Tom', email: 'tom@zelori.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago', twoFactor: true },
  { id: 2, name: 'Editor Sarah', email: 'sarah@zelori.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago', twoFactor: true },
  { id: 3, name: 'Support Mike', email: 'mike@zelori.com', role: 'Support', status: 'Inactive', lastLogin: '1 day ago', twoFactor: false },
  { id: 4, name: 'Admin Jane', email: 'jane@zelori.com', role: 'Super Admin', status: 'Active', lastLogin: '10 mins ago', twoFactor: true },
];

const AdminAccounts: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Admin Accounts</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              <ShieldCheck size={10} /> {mockAdmins.length} Active Operators
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage administrative access and permissions</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Add Operator
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search operators by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Role: All</option>
            <option>Super Admin</option>
            <option>Editor</option>
            <option>Support</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Operator</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Role</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">2FA Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Last Login</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockAdmins.map((admin, idx) => (
                <motion.tr 
                  key={admin.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-admin-gold/10 border border-admin-gold/20 flex items-center justify-center text-admin-gold text-xs font-bold">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors">{admin.name}</p>
                        <p className="text-[10px] opacity-40">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-admin-gold/40" />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{admin.role}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Smartphone size={12} className={cn("transition-colors", admin.twoFactor ? "text-admin-success" : "text-admin-danger opacity-40")} />
                      <span className={cn(
                        "text-[9px] uppercase tracking-widest font-bold",
                        admin.twoFactor ? "text-admin-success" : "text-admin-danger opacity-40"
                      )}>
                        {admin.twoFactor ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-admin-gold/20" />
                      <span className="text-[10px] font-mono opacity-40">{admin.lastLogin}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        admin.status === 'Active' ? "bg-admin-success" : "bg-admin-danger"
                      )} />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{admin.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Edit Permissions">
                        <Key size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Edit Profile">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all" title="Revoke Access">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Admin Slide-over */}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">Add Operator</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Onboard a new administrative member</p>
                </div>
                <button onClick={() => setIsAddPanelOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                {/* Profile Info */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <User size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Operator Profile</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Full Name</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. Christian Dior" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email Address</label>
                      <input type="email" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="christian@zelori.com" />
                    </div>
                  </div>
                </section>

                {/* Role & Permissions */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ShieldCheck size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Role & Permissions</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Administrative Role</label>
                      <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                        <option>Super Admin (Full Access)</option>
                        <option>Editor (Content & Catalog)</option>
                        <option>Support (Orders & Customers)</option>
                        <option>Analyst (Reports Only)</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Security Requirements</p>
                      <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                        <div className="space-y-1">
                          <p className="text-xs font-bold">Enforce 2FA</p>
                          <p className="text-[8px] uppercase tracking-widest opacity-30">Require two-factor authentication for this user</p>
                        </div>
                        <button className="w-12 h-6 bg-admin-gold rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-admin-bg rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Initial Password */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Lock size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Security Credentials</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-admin-gold/5 border border-admin-gold/10 space-y-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Temporary Password</p>
                      <p className="text-sm font-mono text-admin-gold">ZELORI-TEMP-8821-X</p>
                      <p className="text-[8px] uppercase tracking-widest opacity-30 mt-2 italic">User will be prompted to change this on first login</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => setIsAddPanelOpen(false)}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Cancel
                </button>
                <button className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  Create Account
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAccounts;
