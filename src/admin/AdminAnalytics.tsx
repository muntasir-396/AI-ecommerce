import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  MousePointer2,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const channelData = [
  { name: 'Direct', value: 4500 },
  { name: 'Social', value: 3200 },
  { name: 'Email', value: 2100 },
  { name: 'Search', value: 1800 },
  { name: 'Referral', value: 900 },
];

const deviceData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 28 },
  { name: 'Tablet', value: 7 },
];

const COLORS = ['#C9A84C', '#8A6E2F', '#F5F0E8', '#4A4A4A'];

const AdminAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <div className="space-y-10 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Analytics</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Deep insights into your luxury ecosystem</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-4 bg-black/20 border border-admin-gold/10 cursor-pointer hover:border-admin-gold/30 transition-all">
            <Calendar size={16} className="text-admin-gold" />
            <span className="text-[10px] uppercase tracking-widest font-bold">{dateRange}</span>
          </div>
          <button className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]">
            <Download size={14} /> Download Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', up: true, icon: DollarSign },
          { label: 'Conversion Rate', value: '3.24%', trend: '+0.8%', up: true, icon: MousePointer2 },
          { label: 'Avg. Order Value', value: '$842.00', trend: '-2.4%', up: false, icon: ShoppingBag },
          { label: 'Active Sessions', value: '42,890', trend: '+18.2%', up: true, icon: Users },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-admin-card border border-admin-gold/15 p-8 space-y-4 group hover:border-admin-gold/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-admin-gold/5 border border-admin-gold/10 rounded-lg group-hover:bg-admin-gold/10 transition-colors">
                <kpi.icon size={20} className="text-admin-gold" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                kpi.up ? "text-admin-success bg-admin-success/5" : "text-admin-danger bg-admin-danger/5"
              )}>
                {kpi.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {kpi.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">{kpi.label}</p>
              <h3 className="text-3xl font-admin-display font-bold text-admin-gold mt-1">{kpi.value}</h3>
            </div>
            <div className="h-10 w-full opacity-20">
              {/* Mini trend line placeholder */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <Area type="monotone" dataKey="value" stroke="#C9A84C" fill="#C9A84C" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Over Time */}
        <div className="lg:col-span-2 bg-admin-card border border-admin-gold/15 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Revenue Performance</h4>
            <div className="flex gap-4">
              <button className="text-[8px] uppercase tracking-widest font-bold px-3 py-1 border border-admin-gold/20 text-admin-gold">Daily</button>
              <button className="text-[8px] uppercase tracking-widest font-bold px-3 py-1 opacity-30 hover:opacity-100 transition-all">Weekly</button>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '0' }}
                  itemStyle={{ color: '#C9A84C', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: 'rgba(245,240,232,0.4)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#C9A84C" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-8 flex flex-col">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Device Distribution</h4>
          <div className="flex-grow flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '0' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-admin-display font-bold text-admin-gold">65%</span>
              <span className="text-[8px] uppercase tracking-widest font-bold opacity-30">Mobile First</span>
            </div>
          </div>
          <div className="space-y-4">
            {deviceData.map((device, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{device.name}</span>
                </div>
                <span className="text-xs font-bold">{device.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Channel */}
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Acquisition Channels</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(245,240,232,0.6)', fontSize: 10, fontWeight: 'bold' }} 
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(201,168,76,0.05)' }}
                  contentStyle={{ backgroundColor: '#0F0F0F', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '0' }}
                />
                <Bar dataKey="value" fill="#C9A84C" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Heatmap Placeholder */}
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Global Sales Reach</h4>
            <Globe size={18} className="text-admin-gold opacity-20" />
          </div>
          <div className="h-[300px] flex items-center justify-center bg-black/20 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000">
              <img src="https://picsum.photos/seed/worldmap/800/400" alt="World Map" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center space-y-4">
              <div className="flex justify-center gap-4">
                <div className="w-3 h-3 rounded-full bg-admin-gold animate-ping" />
                <div className="w-3 h-3 rounded-full bg-admin-gold animate-ping delay-300" />
                <div className="w-3 h-3 rounded-full bg-admin-gold animate-ping delay-700" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-admin-gold">Live Heatmap — 12 Countries Active</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-admin-gold/5 bg-black/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">North America</span>
              <span className="text-xs font-bold text-admin-gold">42%</span>
            </div>
            <div className="p-4 border border-admin-gold/5 bg-black/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Europe</span>
              <span className="text-xs font-bold text-admin-gold">31%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table (Mini) */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="p-8 border-b border-admin-gold/10 flex items-center justify-between">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Top Performing Products</h4>
          <button className="text-[10px] uppercase tracking-widest font-bold text-admin-gold/40 hover:text-admin-gold transition-all flex items-center gap-2">
            View All Products <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Product</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Revenue</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Sales</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Conversion</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="group hover:bg-admin-gold/5 transition-all">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-12 bg-black/40 border border-admin-gold/10 overflow-hidden">
                        <img src={`https://picsum.photos/seed/lux${i}/100/150`} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-bold">Midnight Velvet Blazer</p>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold">$42,500.00</td>
                  <td className="p-6 text-xs opacity-60">124 Units</td>
                  <td className="p-6 text-xs opacity-60">4.2%</td>
                  <td className="p-6 text-right">
                    <span className="text-[10px] font-bold text-admin-success">+12.4%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
