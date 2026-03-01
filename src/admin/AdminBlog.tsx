import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  X,
  FileText,
  User,
  Calendar,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  date: string;
  views: number;
  comments: number;
}

const mockPosts: BlogPost[] = [
  { id: 1, title: 'The Art of Italian Silk: A Masterclass', author: 'Julianne Moore', category: 'Craftsmanship', status: 'Published', date: 'May 15, 2024', views: 1240, comments: 12 },
  { id: 2, title: 'Summer 2024: The Obsidian Collection', author: 'Alexander Wang', category: 'Collections', status: 'Published', date: 'May 10, 2024', views: 3500, comments: 45 },
  { id: 3, title: 'Sustainability in Luxury Fashion', author: 'Elena Gilbert', category: 'Ethics', status: 'Scheduled', date: 'Jun 01, 2024', views: 0, comments: 0 },
  { id: 4, title: 'Behind the Scenes: New York Fashion Week', author: 'Julianne Moore', category: 'Events', status: 'Draft', date: '-', views: 0, comments: 0 },
  { id: 5, title: 'The Evolution of the Midnight Blazer', author: 'Marcus Aurelius', category: 'Design', status: 'Published', date: 'Apr 20, 2024', views: 890, comments: 8 },
];

const AdminBlog: React.FC = () => {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Blog Posts</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {mockPosts.length} Articles
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage your brand's editorial voice</p>
        </div>
        <button 
          onClick={() => setIsAddPanelOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Create Article
        </button>
      </div>

      {/* Filters */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search articles by title or author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Status: All</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
            <option>Category: All</option>
            <option>Craftsmanship</option>
            <option>Collections</option>
            <option>Ethics</option>
            <option>Events</option>
          </select>
          <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Article Title</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Author</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Category</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Date</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Stats</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockPosts.map((post, idx) => (
                <motion.tr 
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-admin-gold/5 border border-admin-gold/10 text-admin-gold">
                        <FileText size={14} />
                      </div>
                      <span className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors line-clamp-1 max-w-[300px]">{post.title}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-admin-gold/40" />
                      <span className="text-xs opacity-60">{post.author}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{post.category}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-admin-gold/20" />
                      <span className="text-[10px] font-mono opacity-40">{post.date}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye size={12} className="text-admin-gold/20" />
                        <span className="text-[10px] font-mono opacity-60">{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-admin-gold/20" />
                        <span className="text-[10px] font-mono opacity-60">{post.comments}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      post.status === 'Published' ? "bg-admin-success/5 border-admin-success/20 text-admin-success" :
                      post.status === 'Scheduled' ? "bg-admin-warning/5 border-admin-warning/20 text-admin-warning" :
                      "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Preview">
                        <Globe size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all" title="Delete">
                        <Trash2 size={16} />
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
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-5 of 124 articles</p>
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

      {/* Create Post Slide-over */}
      <AnimatePresence>
        {isAddPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddPanelOpen(false)}
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
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">New Article</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Draft your next luxury editorial</p>
                </div>
                <button onClick={() => setIsAddPanelOpen(false)} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-16 custom-scrollbar">
                {/* Basic Info */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <FileText size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Article Content</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Article Title</label>
                      <input type="text" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="e.g. The Art of Italian Silk" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Slug</label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] opacity-30">zelori.com/blog/</span>
                        <input type="text" className="flex-grow bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" placeholder="the-art-of-italian-silk" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Metadata */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <User size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Metadata & Authorship</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Author</label>
                      <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                        <option>Julianne Moore</option>
                        <option>Alexander Wang</option>
                        <option>Marcus Aurelius</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Category</label>
                      <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                        <option>Craftsmanship</option>
                        <option>Collections</option>
                        <option>Ethics</option>
                        <option>Events</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Content Editor Placeholder */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Edit size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Main Content</h4>
                  </div>
                  <div className="border-2 border-dashed border-admin-gold/10 p-20 text-center bg-black/10 group hover:border-admin-gold/40 transition-all cursor-pointer">
                    <Plus size={32} className="text-admin-gold/20 mx-auto mb-4 group-hover:text-admin-gold transition-colors" />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-admin-gold/60">Launch Rich Text Editor</p>
                  </div>
                </section>

                {/* Scheduling */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Clock size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Publishing Options</h4>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-gold/5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Schedule for later</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">Pick a future date and time to publish</p>
                    </div>
                    <button className="w-12 h-6 bg-black/40 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" />
                    </button>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => setIsAddPanelOpen(false)}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Save Draft
                </button>
                <button className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  Publish Article
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlog;
