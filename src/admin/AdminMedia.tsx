import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Copy, 
  X, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  MoreVertical,
  Info,
  CheckCircle2,
  ExternalLink,
  Grid,
  List
} from 'lucide-react';
import { cn } from '../lib/utils';

interface MediaFile {
  id: number;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  dimensions?: string;
  url: string;
  uploadedAt: string;
}

const mockMedia: MediaFile[] = [
  { id: 1, name: 'hero-banner-summer.jpg', type: 'image', size: '1.2 MB', dimensions: '1920x1080', url: 'https://picsum.photos/seed/lux1/800/600', uploadedAt: '2 hours ago' },
  { id: 2, name: 'product-video-blazer.mp4', type: 'video', size: '12.5 MB', url: 'https://picsum.photos/seed/lux2/800/600', uploadedAt: '5 hours ago' },
  { id: 3, name: 'brand-guidelines.pdf', type: 'document', size: '4.8 MB', url: 'https://picsum.photos/seed/lux3/800/600', uploadedAt: '1 day ago' },
  { id: 4, name: 'velvet-texture-close.jpg', type: 'image', size: '850 KB', dimensions: '1200x1200', url: 'https://picsum.photos/seed/lux4/800/600', uploadedAt: '2 days ago' },
  { id: 5, name: 'model-runway-obsidian.jpg', type: 'image', size: '2.1 MB', dimensions: '2400x3600', url: 'https://picsum.photos/seed/lux5/800/600', uploadedAt: '3 days ago' },
  { id: 6, name: 'winter-collection-lookbook.pdf', type: 'document', size: '15.2 MB', url: 'https://picsum.photos/seed/lux6/800/600', uploadedAt: '1 week ago' },
  { id: 7, name: 'social-ad-square.jpg', type: 'image', size: '450 KB', dimensions: '1080x1080', url: 'https://picsum.photos/seed/lux7/800/600', uploadedAt: '1 week ago' },
  { id: 8, name: 'bts-photoshoot.mp4', type: 'video', size: '45.0 MB', url: 'https://picsum.photos/seed/lux8/800/600', uploadedAt: '2 weeks ago' },
];

const AdminMedia: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Media Library</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              <div className="w-1.5 h-1.5 rounded-full bg-admin-gold animate-pulse" />
              1.2 GB / 10 GB Used
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage your brand assets and product imagery</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]">
          <Upload size={16} /> Upload Media
        </button>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-grow w-full lg:w-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
          <input 
            type="text" 
            placeholder="Search by filename..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex gap-2">
            <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[150px]">
              <option>All Types</option>
              <option>Images</option>
              <option>Videos</option>
              <option>Documents</option>
            </select>
            <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[150px]">
              <option>Sort: Newest</option>
              <option>Sort: Oldest</option>
              <option>Sort: Largest</option>
              <option>Sort: Smallest</option>
            </select>
          </div>
          <div className="flex border border-admin-gold/10 p-1 bg-black/20">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 transition-all",
                viewMode === 'grid' ? "bg-admin-gold text-admin-bg shadow-lg" : "text-admin-gold/40 hover:text-admin-gold"
              )}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 transition-all",
                viewMode === 'list' ? "bg-admin-gold text-admin-bg shadow-lg" : "text-admin-gold/40 hover:text-admin-gold"
              )}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Media Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockMedia.map((file, idx) => (
            <motion.div 
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedFile(file)}
              className="group relative aspect-square bg-admin-card border border-admin-gold/10 overflow-hidden cursor-pointer hover:border-admin-gold transition-all"
            >
              {file.type === 'image' ? (
                <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : file.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-black/40">
                  <Video size={48} className="text-admin-gold/20 group-hover:text-admin-gold/60 transition-colors" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/40">
                  <FileText size={48} className="text-admin-gold/20 group-hover:text-admin-gold/60 transition-colors" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-[10px] font-bold truncate text-admin-gold">{file.name}</p>
                <p className="text-[8px] uppercase tracking-widest opacity-60 mt-1">{file.size} {file.dimensions && `• ${file.dimensions}`}</p>
              </div>

              {/* Quick Actions Overlay */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-black/60 hover:bg-admin-gold text-white transition-colors">
                  <Copy size={12} />
                </button>
                <button className="p-1.5 bg-black/60 hover:bg-admin-danger text-white transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">File</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Type</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Size</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Uploaded</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {mockMedia.map((file, idx) => (
                <tr key={file.id} className="group hover:bg-admin-gold/5 transition-all cursor-pointer" onClick={() => setSelectedFile(file)}>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black/40 border border-admin-gold/10 flex items-center justify-center overflow-hidden">
                        {file.type === 'image' ? (
                          <img src={file.url} alt="" className="w-full h-full object-cover" />
                        ) : file.type === 'video' ? (
                          <Video size={16} className="text-admin-gold/40" />
                        ) : (
                          <FileText size={16} className="text-admin-gold/40" />
                        )}
                      </div>
                      <span className="text-xs font-bold group-hover:text-admin-gold transition-colors">{file.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-40">{file.type}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-60">{file.size}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-30">{file.uploadedAt}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Detail Slide-over */}
      <AnimatePresence>
        {selectedFile && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-admin-sidebar border-l border-admin-gold/20 z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-8 border-b border-admin-gold/10 flex items-center justify-between bg-black/20">
                <h3 className="text-xl font-admin-display font-bold tracking-wider text-admin-gold">File Details</h3>
                <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* Preview */}
                <div className="aspect-video bg-black/40 border border-admin-gold/10 flex items-center justify-center overflow-hidden">
                  {selectedFile.type === 'image' ? (
                    <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-full object-contain" />
                  ) : selectedFile.type === 'video' ? (
                    <Video size={64} className="text-admin-gold/20" />
                  ) : (
                    <FileText size={64} className="text-admin-gold/20" />
                  )}
                </div>

                {/* Info List */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Info size={16} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Metadata</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Filename</span>
                      <span className="text-xs font-bold truncate max-w-[200px]">{selectedFile.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Size</span>
                      <span className="text-xs font-bold">{selectedFile.size}</span>
                    </div>
                    {selectedFile.dimensions && (
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Dimensions</span>
                        <span className="text-xs font-bold">{selectedFile.dimensions}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Type</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{selectedFile.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Uploaded</span>
                      <span className="text-xs font-bold">{selectedFile.uploadedAt}</span>
                    </div>
                  </div>
                </section>

                {/* Actions & URL */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ExternalLink size={16} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Asset URL</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={selectedFile.url} 
                        className="flex-grow bg-black/20 border border-admin-gold/10 px-4 py-3 text-[10px] font-mono focus:outline-none"
                      />
                      <button className="px-4 bg-admin-gold text-admin-bg text-[10px] font-bold uppercase tracking-widest hover:bg-admin-gold/90 transition-all">
                        Copy
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-30">Alt Text (SEO)</label>
                      <textarea 
                        className="w-full bg-black/20 border border-admin-gold/10 px-4 py-3 text-xs focus:outline-none focus:border-admin-gold transition-all min-h-[80px]"
                        placeholder="Describe this asset for accessibility..."
                      />
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-admin-gold/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:underline">
                  <Trash2 size={14} /> Delete Asset
                </button>
                <div className="flex gap-4">
                  <button className="px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/5 transition-all">
                    Download
                  </button>
                  <button className="px-10 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-widest font-bold hover:bg-admin-gold/90 transition-all">
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

export default AdminMedia;
