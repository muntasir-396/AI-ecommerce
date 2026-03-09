import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Star, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  X,
  MessageSquare,
  User,
  ShoppingBag,
  ExternalLink,
  Trash2,
  Reply,
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Review {
  id: number;
  product: { name: string; image: string };
  customer: string;
  rating: number;
  comment: string;
  status: 'Approved' | 'Pending' | 'Spam';
  date: string;
}

const mockReviews: Review[] = [
  { id: 1, product: { name: 'Midnight Velvet Blazer', image: 'https://picsum.photos/seed/lux1/100/150' }, customer: 'Julianne Moore', rating: 5, comment: 'Absolutely stunning quality. The fit is perfect and the velvet is incredibly soft. Worth every penny.', status: 'Approved', date: '2 hours ago' },
  { id: 2, product: { name: 'Obsidian Silk Gown', image: 'https://picsum.photos/seed/lux2/100/150' }, customer: 'Alexander Wang', rating: 4, comment: 'Beautiful dress, though the sizing runs slightly small. I would recommend sizing up.', status: 'Pending', date: '5 hours ago' },
  { id: 3, product: { name: 'Gold Leaf Cuff', image: 'https://picsum.photos/seed/lux3/100/150' }, customer: 'Elena Gilbert', rating: 2, comment: 'The gold plating started to wear off after just two wears. Very disappointed given the price.', status: 'Spam', date: '1 day ago' },
  { id: 4, product: { name: 'Cashmere Wrap', image: 'https://picsum.photos/seed/lux4/100/150' }, customer: 'Marcus Aurelius', rating: 5, comment: 'The most luxurious cashmere I have ever owned. Perfect for cool evenings.', status: 'Approved', date: '2 days ago' },
  { id: 5, product: { name: 'Leather Chelsea Boots', image: 'https://picsum.photos/seed/lux5/100/150' }, customer: 'Sophia Loren', rating: 3, comment: 'Stylish but quite stiff. Hopefully they break in over time.', status: 'Approved', date: '3 days ago' },
];

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const updateStatus = (id: number, newStatus: 'Approved' | 'Pending' | 'Spam') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Reviews</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              <Star size={10} fill="currentColor" /> 4.8 Avg Rating
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Monitor customer feedback and manage product reputation</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all group">
          Export Reviews
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by product or customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Rating: All</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>2 Stars</option>
            <option>1 Star</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Spam</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Product</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Customer</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Rating</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Review</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Date</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {reviews.map((review, idx) => (
                <motion.tr 
                  key={review.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input type="checkbox" className="accent-admin-gold w-4 h-4" />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-black/40 border border-admin-gold/10 overflow-hidden">
                        <img src={review.product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold truncate max-w-[150px]">{review.product.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-60">{review.customer}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={cn(
                            i < review.rating ? "text-admin-gold fill-admin-gold" : "text-admin-gold/20"
                          )} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs opacity-40 italic line-clamp-1 max-w-[300px]">"{review.comment}"</p>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      review.status === 'Approved' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      review.status === 'Pending' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-admin-danger/5 border-admin-danger/20 text-admin-danger"
                    )}>
                      {review.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-30">{review.date}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedReview(review)} 
                        className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" 
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(review.id, 'Approved')}
                        className={cn(
                          "p-2 hover:bg-admin-success/10 transition-all",
                          review.status === 'Approved' ? "text-admin-success" : "text-admin-gold/40 hover:text-admin-success"
                        )}
                        title="Approve Review"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(review.id, 'Pending')}
                        className={cn(
                          "p-2 hover:bg-admin-warning/10 transition-all",
                          review.status === 'Pending' ? "text-admin-warning" : "text-admin-gold/40 hover:text-admin-warning"
                        )}
                        title="Reject / Set to Pending"
                      >
                        <XCircle size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(review.id, 'Spam')}
                        className={cn(
                          "p-2 hover:bg-admin-danger/10 transition-all",
                          review.status === 'Spam' ? "text-admin-danger" : "text-admin-gold/40 hover:text-admin-danger"
                        )}
                        title="Flag as Spam"
                      >
                        <AlertTriangle size={16} />
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 842 reviews</p>
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

      {/* Review Detail Slide-over */}
      <AnimatePresence>
        {selectedReview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">Review Details</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Review ID: REV-{selectedReview.id}00</p>
                </div>
                <button onClick={() => setSelectedReview(null)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar">
                {/* Product Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ShoppingBag size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Product Information</h4>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-black/20 border border-admin-gold/10">
                    <div className="w-20 h-24 bg-black/40 border border-admin-gold/10 overflow-hidden">
                      <img src={selectedReview.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-bold">{selectedReview.product.name}</p>
                      <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-gold hover:underline">
                        View Product <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Review Content */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <MessageSquare size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Customer Feedback</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-admin-gold/10 flex items-center justify-center text-admin-gold font-bold border border-admin-gold/20">
                          {selectedReview.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{selectedReview.customer}</p>
                          <p className="text-[9px] uppercase tracking-widest opacity-30">{selectedReview.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={cn(
                              i < selectedReview.rating ? "text-admin-gold fill-admin-gold" : "text-admin-gold/20"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-8 bg-black/20 border border-admin-gold/5 italic text-admin-ivory/80 leading-relaxed">
                      "{selectedReview.comment}"
                    </div>
                  </div>
                </section>

                {/* Admin Reply */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Reply size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Official Response</h4>
                  </div>
                  <textarea 
                    className="w-full bg-black/20 border border-admin-gold/10 p-6 text-sm focus:outline-none focus:border-admin-gold transition-all min-h-[150px]"
                    placeholder="Write a public response to this review..."
                  />
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                <div className="flex gap-4">
                  <button 
                    onClick={() => { updateStatus(selectedReview.id, 'Spam'); setSelectedReview(null); }}
                    className="p-4 border border-admin-danger/20 text-admin-danger hover:bg-admin-danger/5 transition-all" 
                    title="Mark as Spam"
                  >
                    <AlertTriangle size={20} />
                  </button>
                  <button className="p-4 border border-admin-gold/20 text-admin-gold/40 hover:text-admin-gold transition-all" title="Delete Review">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { updateStatus(selectedReview.id, 'Pending'); setSelectedReview(null); }}
                    className="px-10 py-5 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => { updateStatus(selectedReview.id, 'Approved'); setSelectedReview(null); }}
                    className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                  >
                    Approve & Reply
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

export default AdminReviews;
