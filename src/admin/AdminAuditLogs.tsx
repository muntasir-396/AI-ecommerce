import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Clock, 
  User, 
  Shield, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AuditLog {
  id: number;
  timestamp: string;
  user: { name: string; avatar?: string };
  action: string;
  ip: string;
  severity: 'Info' | 'Warning' | 'Danger';
  details: string;
}

const mockLogs: AuditLog[] = [
  { id: 1, timestamp: '2024-05-20 14:32:12', user: { name: 'Admin Tom' }, action: 'Updated Product #124 (Midnight Blazer)', ip: '192.168.1.1', severity: 'Info', details: 'Changed price from $450 to $425' },
  { id: 2, timestamp: '2024-05-20 13:15:45', user: { name: 'Editor Sarah' }, action: 'Published Banner "Summer 2024"', ip: '192.168.1.45', severity: 'Info', details: 'Status changed from Draft to Active' },
  { id: 3, timestamp: '2024-05-20 12:05:10', user: { name: 'System' }, action: 'Failed Login Attempt', ip: '45.12.89.231', severity: 'Warning', details: 'Multiple failed attempts for user: root' },
  { id: 4, timestamp: '2024-05-20 10:45:30', user: { name: 'Admin Tom' }, action: 'Deleted Discount Code "OLD_SALE"', ip: '192.168.1.1', severity: 'Danger', details: 'Permanent deletion of promotional asset' },
  { id: 5, timestamp: '2024-05-20 09:30:15', user: { name: 'Editor Sarah' }, action: 'Updated Category "Evening Wear"', ip: '192.168.1.45', severity: 'Info', details: 'Modified SEO meta description' },
  { id: 6, timestamp: '2024-05-19 23:55:00', user: { name: 'System' }, action: 'Database Backup Completed', ip: 'localhost', severity: 'Info', details: 'Backup size: 2.4 GB' },
  { id: 7, timestamp: '2024-05-19 21:20:12', user: { name: 'Admin Tom' }, action: 'Changed User Role: Julianne Moore', ip: '192.168.1.1', severity: 'Warning', details: 'Role upgraded from Customer to VIP' },
  { id: 8, timestamp: '2024-05-19 18:10:45', user: { name: 'System' }, action: 'API Key Rotated', ip: 'internal', severity: 'Danger', details: 'Stripe Live Secret Key updated' },
];

const AdminAuditLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Audit Logs</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              <Terminal size={10} /> System Integrity: Secure
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Immutable record of all administrative actions</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all group">
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by action, user or details..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Severity: All</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Danger</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>User: All</option>
            <option>Admin Tom</option>
            <option>Editor Sarah</option>
            <option>System</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Timestamp</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">User</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Action</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">IP Address</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Severity</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockLogs.map((log, idx) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-admin-gold/40" />
                      <span className="text-[10px] font-mono opacity-60">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold text-[10px] font-bold border border-admin-gold/20">
                        {log.user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold">{log.user.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold text-admin-gold">{log.action}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Globe size={12} className="text-admin-gold/20" />
                      <span className="text-[10px] font-mono opacity-40">{log.ip}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-1 border text-[9px] uppercase tracking-widest font-bold w-fit",
                      log.severity === 'Info' ? "bg-admin-info/5 border-admin-info/20 text-admin-info" :
                      log.severity === 'Warning' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-admin-danger/5 border-admin-danger/20 text-admin-danger"
                    )}>
                      {log.severity === 'Info' ? <Info size={10} /> : 
                       log.severity === 'Warning' ? <AlertCircle size={10} /> : 
                       <Shield size={10} />}
                      {log.severity}
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-[10px] opacity-40 italic max-w-[300px] truncate">{log.details}</p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-admin-gold/10 flex items-center justify-between bg-black/10">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-8 of 12,450 logs</p>
          <div className="flex items-center gap-3">
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(p => (
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
    </div>
  );
};

export default AdminAuditLogs;
