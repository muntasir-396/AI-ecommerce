import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  delay?: number;
  floatDuration?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  trend, 
  icon: Icon, 
  delay = 0,
  floatDuration = 4.2
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{ 
        opacity: { duration: 0.5, delay },
        y: { 
          duration: floatDuration, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay + 0.5
        }
      }}
      whileHover={{ scale: 1.02, y: -15, transition: { duration: 0.3 } }}
      className="bg-admin-card border border-admin-gold/15 p-6 relative group overflow-hidden"
    >
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-admin-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-admin-gold/5 rounded-full blur-2xl group-hover:bg-admin-gold/10 transition-all duration-500" />

      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-none bg-admin-gold/10 border border-admin-gold/20 flex items-center justify-center group-hover:bg-admin-gold/20 group-hover:border-admin-gold/40 transition-all duration-500">
          <Icon size={24} className="text-admin-gold" />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
            trend >= 0 ? "text-emerald-400" : "text-rose-400"
          )}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 group-hover:opacity-60 transition-opacity">{label}</h4>
        <p className="text-3xl font-mono font-bold tracking-tight text-admin-ivory group-hover:text-admin-gold transition-colors duration-500">{value}</p>
      </div>

      {/* Bottom Label for Low Stock or special cases */}
      {label === 'Low Stock' && (
        <p className="mt-4 text-[10px] uppercase tracking-widest font-bold text-admin-danger/60">Needs attention</p>
      )}
    </motion.div>
  );
};

export default StatCard;
