import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BarChart3, 
  Shirt, 
  Layers, 
  Tag, 
  Package, 
  CreditCard, 
  Ticket, 
  Users, 
  Star, 
  Mail, 
  Image as ImageIcon, 
  Palette, 
  FileText, 
  Settings, 
  ShieldCheck, 
  ClipboardList,
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    ]
  },
  {
    label: 'CATALOG',
    items: [
      { label: 'Products', icon: Shirt, path: '/admin/products' },
      { label: 'Categories', icon: Layers, path: '/admin/categories' },
      { label: 'Tags & Attributes', icon: Tag, path: '/admin/tags' },
    ]
  },
  {
    label: 'COMMERCE',
    items: [
      { label: 'Orders', icon: Package, path: '/admin/orders' },
      { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
      { label: 'Discount Codes', icon: Ticket, path: '/admin/discounts' },
    ]
  },
  {
    label: 'CUSTOMERS',
    items: [
      { label: 'Users', icon: Users, path: '/admin/users' },
      { label: 'Reviews', icon: Star, path: '/admin/reviews' },
      { label: 'Newsletters', icon: Mail, path: '/admin/newsletters' },
    ]
  },
  {
    label: 'CONTENT',
    items: [
      { label: 'Media Library', icon: ImageIcon, path: '/admin/media' },
      { label: 'Banners & Hero', icon: Palette, path: '/admin/banners' },
      { label: 'Blog Posts', icon: FileText, path: '/admin/blog' },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
      { label: 'Admin Accounts', icon: ShieldCheck, path: '/admin/admins' },
      { label: 'Audit Logs', icon: ClipboardList, path: '/admin/audit-logs' },
    ]
  }
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-[260px] h-screen bg-admin-sidebar border-r border-admin-gold/15 flex flex-col sticky top-0 shrink-0 z-50">
      {/* Logo Section */}
      <div className="p-8 border-b border-admin-gold/10">
        <motion.div 
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col"
        >
          <h1 className="text-2xl font-admin-display font-bold tracking-[0.2em] text-admin-gold">ZELORI</h1>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40 mt-1">ADMIN PORTAL</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-8">
        {navGroups.map((group, groupIdx) => (
          <div key={group.label} className="space-y-2">
            <h3 className="px-4 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4">{group.label}</h3>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIdx * 0.1) + (itemIdx * 0.05) }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center justify-between px-4 py-3 rounded-none transition-all duration-300 group relative",
                        isActive 
                          ? "text-admin-gold bg-admin-gold/5" 
                          : "text-admin-ivory/60 hover:text-admin-ivory hover:bg-admin-gold/5"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-admin-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]"
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={cn("transition-colors", isActive ? "text-admin-gold" : "group-hover:text-admin-gold")} />
                        <span className="text-sm tracking-wide">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="opacity-50" />}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="p-6 border-t border-admin-gold/10 bg-black/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-admin-gold/20 border border-admin-gold/30 flex items-center justify-center overflow-hidden">
            <Users size={20} className="text-admin-gold" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest truncate">{user?.name || 'Admin'}</p>
            <p className="text-[10px] opacity-40 truncate">{user?.role === 'admin' ? 'Super Admin' : 'Staff'}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="w-full flex items-center justify-center gap-2 py-3 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold hover:text-admin-bg transition-all"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
