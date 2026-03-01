import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  X,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  RefreshCcw,
  MoreVertical,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  fee: number;
  net: number;
  status: 'Succeeded' | 'Pending' | 'Refunded' | 'Failed';
  method: 'Stripe' | 'PayPal' | 'Apple Pay';
  date: string;
}

const mockTransactions: Transaction[] = [
  { id: 'txn_3MvX92Lp092', orderId: '#ORD-8821', customer: 'Julianne Moore', amount: 1240.00, fee: 36.26, net: 1203.74, status: 'Succeeded', method: 'Stripe', date: '2 hours ago' },
  { id: 'txn_3MvX92Lp093', orderId: '#ORD-8822', customer: 'Alexander Wang', amount: 450.00, fee: 13.35, net: 436.65, status: 'Pending', method: 'PayPal', date: '5 hours ago' },
  { id: 'txn_3MvX92Lp094', orderId: '#ORD-8823', customer: 'Elena Gilbert', amount: 890.00, fee: 26.11, net: 863.89, status: 'Refunded', method: 'Apple Pay', date: '1 day ago' },
  { id: 'txn_3MvX92Lp095', orderId: '#ORD-8824', customer: 'Marcus Aurelius', amount: 3200.00, fee: 93.10, net: 3106.90, status: 'Succeeded', method: 'Stripe', date: '2 days ago' },
  { id: 'txn_3MvX92Lp096', orderId: '#ORD-8825', customer: 'Sophia Loren', amount: 150.00, fee: 4.65, net: 145.35, status: 'Failed', method: 'Stripe', date: '3 days ago' },
];

const AdminPayments: React.FC = () => {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Transactions</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              <ShieldCheck size={10} /> PCI Compliant
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Monitor financial flow and payment integrity</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all group">
          <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Statement
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-4">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Net Volume (30d)</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-admin-display font-bold text-admin-gold">$84,250.00</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-admin-success bg-admin-success/5 px-2 py-1">
              <ArrowUpRight size={10} /> +12.4%
            </div>
          </div>
        </div>
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-4">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Payouts</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-admin-display font-bold text-admin-gold">$12,400.00</h3>
            <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Next: May 24</div>
          </div>
        </div>
        <div className="bg-admin-card border border-admin-gold/15 p-8 space-y-4">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Refund Rate</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-admin-display font-bold text-admin-gold">1.2%</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-admin-danger bg-admin-danger/5 px-2 py-1">
              <ArrowDownLeft size={10} /> -0.5%
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by transaction ID, order or customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Succeeded</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Failed</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Method: All</option>
            <option>Stripe</option>
            <option>PayPal</option>
            <option>Apple Pay</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Transaction ID</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Order</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Customer</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Amount</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Fee</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Net</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockTransactions.map((txn, idx) => (
                <motion.tr 
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedTxn(txn)}
                  className="group hover:bg-admin-gold/5 transition-all duration-300 cursor-pointer"
                >
                  <td className="p-6">
                    <span className="text-[10px] font-mono opacity-60 group-hover:text-admin-gold transition-colors">{txn.id}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold">{txn.orderId}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-60">{txn.customer}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold">${txn.amount.toFixed(2)}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-40">-${txn.fee.toFixed(2)}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-bold text-admin-gold">${txn.net.toFixed(2)}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        txn.status === 'Succeeded' ? "bg-admin-success" :
                        txn.status === 'Pending' ? "bg-admin-warning" :
                        txn.status === 'Refunded' ? "bg-admin-info" : "bg-admin-danger"
                      )} />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{txn.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-[10px] uppercase tracking-widest opacity-30">{txn.date}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-admin-gold/10 flex items-center justify-between bg-black/10">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 1,842 transactions</p>
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

      {/* Transaction Detail Slide-over */}
      <AnimatePresence>
        {selectedTxn && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTxn(null)}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">Transaction Details</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">{selectedTxn.id}</p>
                </div>
                <button onClick={() => setSelectedTxn(null)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                {/* Summary Card */}
                <div className="p-8 bg-black/40 border border-admin-gold/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Amount</span>
                    <span className="text-3xl font-admin-display font-bold text-admin-gold">${selectedTxn.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Status</span>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold px-3 py-1 border",
                      selectedTxn.status === 'Succeeded' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" : "bg-admin-warning/5 border-admin-warning/20 text-admin-warning"
                    )}>
                      {selectedTxn.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Payment Method</span>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-admin-gold/40" />
                      <span className="text-xs font-bold">{selectedTxn.method}</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <DollarSign size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Fee Breakdown</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="opacity-40">Gross Amount</span>
                      <span>${selectedTxn.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="opacity-40">Processing Fee ({selectedTxn.method})</span>
                      <span className="text-admin-danger">-${selectedTxn.fee.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-admin-gold/5 flex justify-between text-sm font-bold">
                      <span className="text-admin-gold">Net Amount</span>
                      <span className="text-admin-gold">${selectedTxn.net.toFixed(2)}</span>
                    </div>
                  </div>
                </section>

                {/* Related Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Clock size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Related Information</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Order Reference</p>
                      <button className="text-sm font-bold hover:text-admin-gold transition-all flex items-center gap-2">
                        {selectedTxn.orderId} <ExternalLink size={12} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Customer</p>
                      <p className="text-sm font-bold">{selectedTxn.customer}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Created At</p>
                      <p className="text-sm">May 20, 2024 • 14:32:12</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Payment Gateway ID</p>
                      <p className="text-[10px] font-mono opacity-60">ch_3MvX92Lp092XyZ1</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-gold/40 hover:text-admin-gold transition-all">
                  <ExternalLink size={14} /> View in {selectedTxn.method}
                </button>
                <div className="flex gap-4">
                  <button className="px-10 py-5 border border-admin-danger/20 text-admin-danger text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-danger/5 transition-all">
                    <RefreshCcw size={14} className="inline mr-2" /> Issue Refund
                  </button>
                  <button onClick={() => setSelectedTxn(null)} className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    Done
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

export default AdminPayments;
