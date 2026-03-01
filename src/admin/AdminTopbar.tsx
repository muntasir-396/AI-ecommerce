import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Bell, 
  ExternalLink, 
  User, 
  ChevronDown, 
  LogOut, 
  LayoutDashboard,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

const AdminTopbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 bg-admin-bg/95 backdrop-blur-md border-b border-admin-gold/15 sticky top-0 z-40 px-8 flex items-center justify-between">
      {/* Left: Dynamic Title */}
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-admin-display font-bold tracking-[0.1em] text-admin-gold">{getPageTitle()}</h2>
        <div className="h-4 w-px bg-admin-gold/20" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">ZELORI PORTAL</span>
      </div>

      {/* Center: Global Search */}
      <div className="flex-grow max-w-xl mx-12">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40 group-focus-within:text-admin-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search products, orders, users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-admin-sidebar/50 border border-admin-gold/10 px-12 py-2 rounded-none text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold focus:ring-1 focus:ring-admin-gold/20 transition-all placeholder:text-admin-gold/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <span className="text-[8px] border border-admin-gold/20 px-1.5 py-0.5 rounded opacity-30 font-mono">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Live Site Link */}
        <Link 
          to="/" 
          target="_blank"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 hover:text-admin-gold transition-all group"
        >
          <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline">Live Site</span>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-admin-gold/60 hover:text-admin-gold transition-colors group">
          <Bell size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-admin-gold rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)] animate-pulse" />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 pl-3 rounded-none border border-admin-gold/10 bg-admin-sidebar/30 hover:bg-admin-sidebar/50 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{user?.name?.split(' ').map(n => n[0]).join('. ')}</p>
              <p className="text-[8px] opacity-40 uppercase tracking-widest leading-none">{user?.role === 'admin' ? 'Super Admin' : 'Staff'}</p>
            </div>
            <div className="w-8 h-8 rounded-none bg-admin-gold/20 border border-admin-gold/30 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-admin-gold" />
            </div>
            <ChevronDown size={14} className={cn("text-admin-gold/40 transition-transform", isProfileOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsProfileOpen(false)}
                  className="fixed inset-0 z-10"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-admin-sidebar border border-admin-gold/20 shadow-2xl z-20 p-2 overflow-hidden"
                >
                  <div className="p-3 border-b border-admin-gold/10 mb-2">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Signed in as</p>
                    <p className="text-xs font-bold truncate">{user?.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link 
                      to="/admin/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/10 hover:text-admin-gold transition-all text-left"
                    >
                      <User size={14} /> View Profile
                    </Link>
                    <Link 
                      to="/admin/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/10 hover:text-admin-gold transition-all text-left"
                    >
                      <Settings size={14} /> Account Settings
                    </Link>
                    <Link 
                      to="/admin/settings?tab=Security"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/10 hover:text-admin-gold transition-all text-left"
                    >
                      <ShieldCheck size={14} /> Security
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-admin-gold/10">
                    <button 
                      onClick={() => {
                        logout();
                        window.location.href = '/';
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:bg-admin-danger/10 transition-all text-left"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
