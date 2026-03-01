import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Shield, 
  Key, 
  Smartphone, 
  Clock, 
  Globe, 
  Camera,
  Save,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Notifications', icon: Globe },
  ];

  return (
    <div className="space-y-10 p-8 max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-admin-display font-bold text-admin-gold">My Profile</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Manage your administrative identity</p>
        </div>
        <button className="flex items-center gap-2 px-10 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
          <Save size={16} /> Update Profile
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Avatar & Tabs */}
        <div className="lg:w-72 shrink-0 space-y-8">
          <div className="bg-admin-card border border-admin-gold/15 p-8 text-center space-y-6">
            <div className="relative w-32 h-32 mx-auto group">
              <div className="w-full h-full rounded-full bg-admin-gold/10 border-2 border-admin-gold/20 flex items-center justify-center overflow-hidden">
                <User size={48} className="text-admin-gold/40" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-admin-gold text-admin-bg rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-admin-display font-bold text-admin-gold">{user?.name || 'Admin'}</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mt-1">{user?.role === 'admin' ? 'Super Admin' : 'Staff'}</p>
            </div>
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border border-transparent",
                  activeTab === tab.name 
                    ? "bg-admin-gold text-admin-bg shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                    : "text-admin-gold/40 hover:text-admin-gold hover:bg-admin-gold/5"
                )}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Content Area */}
        <div className="flex-grow bg-admin-card border border-admin-gold/15 p-10">
          {activeTab === 'Profile' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <User size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Personal Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Full Name</label>
                    <input type="text" defaultValue={user?.name || 'Admin'} className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email Address</label>
                    <input type="email" defaultValue={user?.email || 'admin@zelori.com'} className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Phone Number</label>
                    <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Language</label>
                    <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                      <option>English (US)</option>
                      <option>French (FR)</option>
                      <option>Italian (IT)</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Clock size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Account History</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Last Login</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">May 20, 2024 • 14:32:12 from 192.168.1.1</p>
                    </div>
                    <CheckCircle2 size={16} className="text-admin-success" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/20 border border-admin-gold/5">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Account Created</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">Jan 12, 2024 • 09:15:00</p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'Security' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Lock size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Change Password</h4>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Current Password</label>
                    <input type="password" placeholder="••••••••••••" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">New Password</label>
                      <input type="password" placeholder="••••••••••••" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Confirm New Password</label>
                      <input type="password" placeholder="••••••••••••" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                    </div>
                  </div>
                  <button className="px-8 py-3 border border-admin-gold/20 text-admin-gold text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/5 transition-all">
                    Update Password
                  </button>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Smartphone size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Two-Factor Authentication</h4>
                </div>
                <div className="p-6 bg-admin-success/5 border border-admin-success/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-admin-success/10 rounded-lg">
                      <Smartphone size={20} className="text-admin-success" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">2FA is currently active</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">Your account is secured with mobile authentication</p>
                    </div>
                  </div>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:underline">Disable</button>
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
