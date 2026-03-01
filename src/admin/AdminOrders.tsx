import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Printer,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  fulfillmentStatus: 'Unfulfilled' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const mockOrders: Order[] = [
  { id: 'ORD-8821', date: '2024-05-20 14:32', customer: { name: 'Julianne Moore', email: 'j.moore@example.com' }, items: 3, total: 1240.00, paymentStatus: 'Paid', fulfillmentStatus: 'Processing' },
  { id: 'ORD-8820', date: '2024-05-20 12:15', customer: { name: 'Alexander Wang', email: 'wang.a@example.com' }, items: 1, total: 450.00, paymentStatus: 'Paid', fulfillmentStatus: 'Shipped' },
  { id: 'ORD-8819', date: '2024-05-19 18:45', customer: { name: 'Elena Gilbert', email: 'elena.g@mystic.com' }, items: 2, total: 890.00, paymentStatus: 'Pending', fulfillmentStatus: 'Unfulfilled' },
  { id: 'ORD-8818', date: '2024-05-19 16:20', customer: { name: 'Marcus Aurelius', email: 'marcus@rome.gov' }, items: 5, total: 3200.00, paymentStatus: 'Paid', fulfillmentStatus: 'Delivered' },
  { id: 'ORD-8817', date: '2024-05-19 09:10', customer: { name: 'Sophia Loren', email: 'sophia@cinema.it' }, items: 1, total: 150.00, paymentStatus: 'Failed', fulfillmentStatus: 'Cancelled' },
  { id: 'ORD-8816', date: '2024-05-18 21:30', customer: { name: 'David Gandy', email: 'gandy.d@models.uk' }, items: 2, total: 780.00, paymentStatus: 'Paid', fulfillmentStatus: 'Delivered' },
  { id: 'ORD-8815', date: '2024-05-18 15:45', customer: { name: 'Naomi Campbell', email: 'naomi@runway.com' }, items: 4, total: 2100.00, paymentStatus: 'Paid', fulfillmentStatus: 'Shipped' },
  { id: 'ORD-8814', date: '2024-05-18 11:20', customer: { name: 'Tom Ford', email: 'tom@ford.com' }, items: 1, total: 950.00, paymentStatus: 'Paid', fulfillmentStatus: 'Delivered' },
];

const AdminOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Orders</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockOrders.length} Recent
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage customer transactions</p>
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
            placeholder="Search by Order ID, Customer Name or Email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Unfulfilled</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Payment: All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Order ID</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Date</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Customer</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Items</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Total</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Payment</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Fulfillment</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockOrders.map((order, idx) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold font-mono text-admin-gold cursor-pointer hover:underline" onClick={() => openOrderDetail(order)}>
                      {order.id}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{order.date}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold text-[10px] font-bold">
                        {order.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{order.customer.name}</p>
                        <p className="text-[9px] opacity-30">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs opacity-60">{order.items} items</td>
                  <td className="p-6 text-xs font-bold">${order.total.toFixed(2)}</td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      order.paymentStatus === 'Paid' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      order.paymentStatus === 'Pending' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-admin-danger/5 border-admin-danger/20 text-admin-danger"
                    )}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      order.fulfillmentStatus === 'Delivered' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      order.fulfillmentStatus === 'Shipped' ? "bg-admin-info/5 border-admin-info/20 text-admin-info" :
                      order.fulfillmentStatus === 'Processing' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openOrderDetail(order)} className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="View Details">
                        <Eye size={16} />
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-8 of 124 results</p>
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

      {/* Order Detail Slide-over */}
      <AnimatePresence>
        {isDetailOpen && selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[800px] bg-admin-sidebar border-l border-admin-gold/20 z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-10 border-b border-admin-gold/10 flex items-center justify-between bg-black/20">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">{selectedOrder.id}</h3>
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      selectedOrder.fulfillmentStatus === 'Delivered' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" : "bg-admin-warning/5 border-admin-warning/20 text-admin-warning"
                    )}>
                      {selectedOrder.fulfillmentStatus}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Placed on {selectedOrder.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full border border-admin-gold/10">
                    <Printer size={20} />
                  </button>
                  <button onClick={() => setIsDetailOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                    <X size={28} />
                  </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                {/* Order Summary Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Payment Status</p>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-admin-gold" />
                      <p className="text-sm font-bold">{selectedOrder.paymentStatus}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Fulfillment</p>
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-admin-gold" />
                      <p className="text-sm font-bold">{selectedOrder.fulfillmentStatus}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 border border-admin-gold/10 p-6 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Total Amount</p>
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-admin-gold" />
                      <p className="text-sm font-bold">${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer & Shipping */}
                <div className="grid grid-cols-2 gap-10">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                      <User size={18} className="text-admin-gold" />
                      <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Customer Information</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold text-lg font-bold">
                          {selectedOrder.customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{selectedOrder.customer.name}</p>
                          <p className="text-xs opacity-40">Customer since 2023</p>
                        </div>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-xs">
                          <Mail size={14} className="text-admin-gold/40" />
                          <span>{selectedOrder.customer.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <Phone size={14} className="text-admin-gold/40" />
                          <span>+1 (555) 012-3456</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                      <MapPin size={18} className="text-admin-gold" />
                      <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Shipping Address</h4>
                    </div>
                    <div className="space-y-2 text-xs leading-relaxed opacity-60">
                      <p className="font-bold text-admin-ivory opacity-100">{selectedOrder.customer.name}</p>
                      <p>725 Fifth Avenue</p>
                      <p>New York, NY 10022</p>
                      <p>United States</p>
                      <div className="pt-4 flex items-center gap-2 text-admin-gold hover:underline cursor-pointer">
                        <ExternalLink size={12} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">View on Map</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Order Items */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Package size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Order Items</h4>
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map(item => (
                      <div key={item} className="flex items-center gap-6 p-4 bg-black/20 border border-admin-gold/5 group hover:border-admin-gold/20 transition-all">
                        <div className="w-16 h-20 bg-black/40 border border-admin-gold/10 overflow-hidden shrink-0">
                          <img src={`https://picsum.photos/seed/luxury${item}/200/300`} alt="Product" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold tracking-wide">Midnight Velvet Blazer</p>
                          <p className="text-[10px] opacity-30 uppercase tracking-widest mt-1">Size: M | Color: Obsidian</p>
                          <p className="text-[10px] font-mono opacity-20 mt-1">SKU: VV-001-M-OBS</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold">$450.00</p>
                          <p className="text-[10px] opacity-30 mt-1">Qty: 1</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Order Timeline */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Clock size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Order Timeline</h4>
                  </div>
                  <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-admin-gold/10">
                    <div className="flex gap-6 relative">
                      <div className="w-4 h-4 rounded-full bg-admin-success shrink-0 mt-1 z-10 shadow-[0_0_10px_rgba(42,107,74,0.5)]" />
                      <div>
                        <p className="text-xs font-bold">Order Delivered</p>
                        <p className="text-[10px] opacity-30 mt-1 uppercase tracking-widest">May 22, 2024 — 10:15 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-6 relative">
                      <div className="w-4 h-4 rounded-full bg-admin-gold shrink-0 mt-1 z-10 shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
                      <div>
                        <p className="text-xs font-bold">In Transit — Out for Delivery</p>
                        <p className="text-[10px] opacity-30 mt-1 uppercase tracking-widest">May 22, 2024 — 08:30 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-6 relative">
                      <div className="w-4 h-4 rounded-full bg-admin-gold/20 shrink-0 mt-1 z-10" />
                      <div>
                        <p className="text-xs font-bold opacity-60">Order Shipped via DHL Express</p>
                        <p className="text-[10px] opacity-20 mt-1 uppercase tracking-widest">May 21, 2024 — 14:20 PM</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:underline">
                    Cancel Order
                  </button>
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-gold hover:underline">
                    Issue Refund
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <select className="bg-black/40 border border-admin-gold/20 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[200px]">
                    <option>Update Status: Shipped</option>
                    <option>Update Status: Delivered</option>
                    <option>Update Status: Cancelled</option>
                  </select>
                  <button className="px-10 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
