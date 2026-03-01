import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Package, 
  Users, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';
import StatCard from './components/StatCard';
import { cn } from '../lib/utils';

const revenueData = [
  { name: '01 Jan', value: 4000 },
  { name: '05 Jan', value: 3000 },
  { name: '10 Jan', value: 2000 },
  { name: '15 Jan', value: 2780 },
  { name: '20 Jan', value: 1890 },
  { name: '25 Jan', value: 2390 },
  { name: '30 Jan', value: 3490 },
];

const categoryData = [
  { name: 'Dresses', value: 400, fill: '#C9A84C' },
  { name: 'Outerwear', value: 300, fill: '#8A6E2F' },
  { name: 'Bottoms', value: 300, fill: '#F5F0E8' },
  { name: 'Footwear', value: 200, fill: '#4A3B1A' },
];

const recentOrders = [
  { id: '#ZEL-00421', customer: 'Sophia Loren', items: 2, total: 480.00, status: 'pending', date: '2 mins ago' },
  { id: '#ZEL-00420', customer: 'Marcello M.', items: 1, total: 249.99, status: 'processing', date: '15 mins ago' },
  { id: '#ZEL-00419', customer: 'Monica B.', items: 3, total: 890.50, status: 'shipped', date: '1 hour ago' },
  { id: '#ZEL-00418', customer: 'Gianni V.', items: 1, total: 129.00, status: 'delivered', date: '3 hours ago' },
  { id: '#ZEL-00417', customer: 'Donatella F.', items: 2, total: 560.00, status: 'cancelled', date: '5 hours ago' },
];

const topProducts = [
  { name: 'Midnight Velvet Blazer', sales: 142, revenue: 35498.58, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=100' },
  { name: 'Silk Slip Dress', sales: 98, revenue: 18522.00, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=100' },
  { name: 'Cashmere Turtleneck', sales: 84, revenue: 13398.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=100' },
  { name: 'Tailored Wool Trousers', sales: 76, revenue: 9804.00, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=100' },
];

const activityLog = [
  { action: 'Admin updated product', target: 'Zelori Silk Coat', actor: 'M. Mamun', time: '2 mins ago' },
  { action: 'New order placed', target: '#ZEL-00421', actor: 'System', time: '5 mins ago' },
  { action: 'Admin changed status', target: '#ZEL-00419', actor: 'S. Loren', time: '12 mins ago' },
  { action: 'New user registered', target: 'Gianni V.', actor: 'System', time: '25 mins ago' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* SECTION A — KPI CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Revenue" value="$128,430" trend={12.4} icon={DollarSign} delay={0.1} floatDuration={4.2} />
        <StatCard label="Orders" value="1,204 total" trend={5.2} icon={Package} delay={0.2} floatDuration={5.1} />
        <StatCard label="New Users" value="+84 this week" trend={8.1} icon={Users} delay={0.3} floatDuration={4.7} />
        <StatCard label="Low Stock" value="12 products" trend={-2.4} icon={AlertCircle} delay={0.4} floatDuration={5.8} />
      </div>

      {/* SECTION B — CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Over Time */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 bg-admin-card border border-admin-gold/15 p-8"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold mb-1">Revenue Over Time</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Last 30 days performance</p>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '90D', '1Y'].map(t => (
                <button key={t} className={cn(
                  "px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold border transition-all",
                  t === '30D' ? "bg-admin-gold text-admin-bg border-admin-gold" : "border-admin-gold/20 text-admin-gold/40 hover:border-admin-gold hover:text-admin-gold"
                )}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(201,168,76,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(201,168,76,0.5)', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="rgba(201,168,76,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(201,168,76,0.5)', fontWeight: 'bold' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '0px',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                  itemStyle={{ color: '#C9A84C' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C9A84C" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4 bg-admin-card border border-admin-gold/15 p-8 flex flex-col"
        >
          <div className="mb-10">
            <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold mb-1">Sales by Category</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Revenue distribution</p>
          </div>
          <div className="flex-grow h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.2)" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '0px',
                    fontSize: '10px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.fill }} />
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SECTION C — BOTTOM ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-7 bg-admin-card border border-admin-gold/15 p-8"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold mb-1">Recent Orders</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Latest transactions</p>
            </div>
            <button className="text-[10px] uppercase tracking-widest font-bold text-admin-gold border-b border-admin-gold/30 pb-1 hover:border-admin-gold transition-all">
              View All Orders →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-admin-gold/10">
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Order ID</th>
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Customer</th>
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-center">Items</th>
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Total</th>
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                  <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-gold/5">
                {recentOrders.map((order, idx) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.05) }}
                    className="group hover:bg-admin-gold/5 transition-colors"
                  >
                    <td className="py-4 text-xs font-mono font-bold">{order.id}</td>
                    <td className="py-4">
                      <p className="text-xs font-bold">{order.customer}</p>
                      <p className="text-[10px] opacity-40">{order.date}</p>
                    </td>
                    <td className="py-4 text-xs text-center opacity-60">{order.items}</td>
                    <td className="py-4 text-xs font-bold">${order.total.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={cn(
                        "text-[9px] uppercase tracking-widest font-bold px-2 py-1",
                        order.status === 'pending' && "bg-admin-warning/10 text-admin-warning",
                        order.status === 'processing' && "bg-admin-info/10 text-admin-info",
                        order.status === 'shipped' && "bg-purple-500/10 text-purple-400",
                        order.status === 'delivered' && "bg-admin-success/10 text-admin-success",
                        order.status === 'cancelled' && "bg-admin-danger/10 text-admin-danger",
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
                        <Eye size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Selling Products */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-5 bg-admin-card border border-admin-gold/15 p-8"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold mb-1">Top Products</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Best sellers</p>
            </div>
            <button className="text-[10px] uppercase tracking-widest font-bold text-admin-gold border-b border-admin-gold/30 pb-1 hover:border-admin-gold transition-all">
              View All →
            </button>
          </div>
          <div className="space-y-6">
            {topProducts.map((product, idx) => (
              <motion.div 
                key={product.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + (idx * 0.05) }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-16 bg-admin-sidebar overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold truncate mb-1 group-hover:text-admin-gold transition-colors">{product.name}</h4>
                  <div className="flex items-center gap-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">{product.sales} units</p>
                    <div className="h-1 w-1 bg-admin-gold/20 rounded-full" />
                    <p className="text-[10px] uppercase tracking-widest font-bold text-admin-gold">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-admin-gold/20 group-hover:text-admin-gold group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SECTION D — ACTIVITY FEED */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-admin-card border border-admin-gold/15 p-8"
      >
        <div className="mb-10">
          <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold mb-1">Activity Feed</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Recent admin actions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activityLog.map((log, idx) => (
            <div key={idx} className="relative pl-6 border-l border-admin-gold/10">
              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-admin-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">{log.time}</p>
              <p className="text-xs font-bold mb-1">{log.action}</p>
              <p className="text-xs text-admin-gold italic">"{log.target}"</p>
              <p className="text-[10px] mt-2 opacity-30">by {log.actor}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
