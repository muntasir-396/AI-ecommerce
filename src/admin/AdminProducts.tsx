import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Edit, 
  Copy, 
  Trash2, 
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Eye,
  Settings,
  Globe,
  Tag as TagIcon,
  DollarSign,
  Package as PackageIcon,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Product } from '../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft' | 'archived'>('all');

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!editingProduct?.name || editingProduct?.price === undefined || editingProduct?.price === null) {
      alert('Please fill in required fields (Name and Price)');
      return;
    }

    const method = editingProduct.id ? 'PUT' : 'POST';
    const url = editingProduct.id ? `/api/products/${editingProduct.id}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      if (res.ok) {
        fetchProducts();
        setIsAddPanelOpen(false);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredProducts.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelectItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedItems(newSelected);
  };

  const filteredProducts = products.filter(p => 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeTab === 'all' || p.category.toLowerCase() === activeTab) // Simplified tab filtering
  );

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-admin-display font-bold text-admin-gold">Products</h2>
            <span className="px-3 py-1 bg-admin-gold/10 text-admin-gold text-[10px] font-bold uppercase tracking-widest border border-admin-gold/20">
              {products.length} Total
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Manage your luxury catalog</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-8 py-4 border border-admin-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/5 transition-all group">
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export CSV
          </button>
          <button 
            onClick={() => {
              setEditingProduct({ name: '', price: 0, category: 'Dresses', image: '', video: '', description: '' });
              setIsAddPanelOpen(true);
            }}
            className="flex items-center gap-2 px-8 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-admin-card border border-admin-gold/15 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40" />
            <input 
              type="text" 
              placeholder="Search by name, SKU, or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-admin-gold/10 pl-12 pr-4 py-4 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold transition-all placeholder:text-admin-gold/20"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
              <option>All Categories</option>
              <option>Dresses</option>
              <option>Outerwear</option>
              <option>Accessories</option>
            </select>
            <select className="bg-black/20 border border-admin-gold/10 px-6 py-4 text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-admin-gold transition-all appearance-none min-w-[180px]">
              <option>Status: All</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <button className="px-6 py-4 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <Filter size={16} /> More Filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-admin-gold/5">
          <div className="flex gap-8">
            {(['all', 'active', 'draft', 'archived'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all",
                  activeTab === tab ? "text-admin-gold border-admin-gold" : "text-admin-ivory/30 border-transparent hover:text-admin-ivory/60"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="text-[10px] uppercase tracking-widest font-bold text-admin-gold/40 hover:text-admin-gold transition-all"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedItems.size > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-admin-gold text-admin-bg p-4 flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{selectedItems.size} items selected</span>
              <div className="h-4 w-px bg-admin-bg/20" />
              <div className="flex gap-4">
                <button className="text-[10px] uppercase tracking-widest font-bold hover:underline">Delete Selected</button>
                <button className="text-[10px] uppercase tracking-widest font-bold hover:underline">Change Status</button>
                <button className="text-[10px] uppercase tracking-widest font-bold hover:underline">Export</button>
              </div>
            </div>
            <button onClick={() => setSelectedItems(new Set())} className="p-1 hover:bg-black/10 transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="bg-admin-card border border-admin-gold/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-admin-gold/10">
                <th className="p-6 w-12">
                  <input 
                    type="checkbox" 
                    className="accent-admin-gold w-4 h-4" 
                    checked={selectedItems.size === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Product</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">SKU</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Category</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Price</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Stock</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Status</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Featured</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold">Sales</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-admin-gold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-gold/5">
              {filteredProducts.map((product, idx) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group hover:bg-admin-gold/5 transition-all duration-300"
                >
                  <td className="p-6">
                    <input 
                      type="checkbox" 
                      className="accent-admin-gold w-4 h-4" 
                      checked={selectedItems.has(product.id)}
                      onChange={() => toggleSelectItem(product.id)}
                    />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-black/40 overflow-hidden shrink-0 border border-admin-gold/10 group-hover:border-admin-gold/30 transition-colors">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-wide group-hover:text-admin-gold transition-colors cursor-pointer">{product.name}</p>
                        <p className="text-[9px] opacity-30 uppercase tracking-[0.2em] mt-1">Luxury Collection</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-mono opacity-40">VV-{product.id}001</span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase tracking-widest opacity-60">{product.category}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">${product.price.toFixed(2)}</span>
                      {idx % 3 === 0 && <span className="text-[9px] text-admin-danger line-through opacity-40">${(product.price * 1.2).toFixed(2)}</span>}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full shadow-[0_0_8px]",
                        idx % 5 === 0 ? "bg-admin-danger shadow-admin-danger/50" : "bg-admin-success shadow-admin-success/50"
                      )} />
                      <span className={cn("text-xs font-medium", idx % 5 === 0 ? "text-admin-danger" : "text-admin-ivory/60")}>
                        {idx % 5 === 0 ? '2 left' : '48 in stock'}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-bold px-3 py-1 border",
                      idx % 4 === 0 ? "bg-admin-gold/5 border-admin-gold/20 text-admin-gold" : "bg-white/5 border-white/10 text-admin-ivory/40"
                    )}>
                      {idx % 4 === 0 ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-6">
                    <button className={cn("transition-colors", idx % 3 === 0 ? "text-admin-gold" : "text-admin-gold/10 hover:text-admin-gold/40")}>
                      <Star size={16} fill={idx % 3 === 0 ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{Math.floor(Math.random() * 500)}</span>
                      <span className="text-[9px] opacity-30 uppercase tracking-widest">Units</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setIsAddPanelOpen(true);
                        }}
                        className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" 
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-admin-gold/10 text-admin-gold/40 hover:text-admin-gold transition-all" title="Duplicate">
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-admin-danger/10 text-admin-gold/40 hover:text-admin-danger transition-all" 
                        title="Delete"
                      >
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
          <div className="flex items-center gap-4">
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Showing 1-10 of {products.length} results</p>
            <select className="bg-transparent border-b border-admin-gold/10 text-[10px] uppercase tracking-widest font-bold focus:outline-none">
              <option>25 per page</option>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold hover:border-admin-gold transition-all">
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
            <button className="p-3 border border-admin-gold/10 text-admin-gold/40 hover:text-admin-gold hover:border-admin-gold transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Slide-over Panel */}
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-[720px] bg-admin-sidebar border-l border-admin-gold/20 z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-10 border-b border-admin-gold/10 flex items-center justify-between bg-black/20">
                <div>
                  <h3 className="text-3xl font-admin-display font-bold tracking-wider text-admin-gold">
                    {editingProduct?.id ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">
                    {editingProduct?.id ? `Catalog Entry — VV-${editingProduct.id}001` : 'Catalog Entry — VV-NEW-001'}
                  </p>
                </div>
                <button onClick={() => { setIsAddPanelOpen(false); setEditingProduct(null); }} className="p-3 hover:bg-admin-gold/10 text-admin-gold transition-all rounded-full">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 space-y-16 custom-scrollbar">
                {/* Section 1: Basic Info */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Settings size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Basic Information</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Product Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                        placeholder="e.g. Midnight Velvet Blazer" 
                        value={editingProduct?.name || ''}
                        onChange={(e) => setEditingProduct(prev => ({ ...prev!, name: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Category</label>
                        <select 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none"
                          value={editingProduct?.category || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, category: e.target.value }))}
                        >
                          <option value="">Select Category</option>
                          <option value="Dresses">Dresses</option>
                          <option value="Outerwear">Outerwear</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Bottoms">Bottoms</option>
                          <option value="Footwear">Footwear</option>
                          <option value="Knitwear">Knitwear</option>
                          <option value="Tops">Tops</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Image URL 1 (Primary)</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://images.unsplash.com/..." 
                          value={editingProduct?.image || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, image: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Image URL 2</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://images.unsplash.com/..." 
                          value={editingProduct?.image2 || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, image2: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Image URL 3</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://images.unsplash.com/..." 
                          value={editingProduct?.image3 || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, image3: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Image URL 4</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://images.unsplash.com/..." 
                          value={editingProduct?.image4 || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, image4: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Image URL 5</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://images.unsplash.com/..." 
                          value={editingProduct?.image5 || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, image5: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Video URL 1 (Cinematic)</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://player.vimeo.com/external/..." 
                          value={editingProduct?.video || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, video: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Video URL 2</label>
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="https://player.vimeo.com/external/..." 
                          value={editingProduct?.video2 || ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, video2: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Description</label>
                      <textarea 
                        className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all min-h-[160px] resize-none" 
                        placeholder="Describe the craftsmanship and material details..." 
                        value={editingProduct?.description || ''}
                        onChange={(e) => setEditingProduct(prev => ({ ...prev!, description: e.target.value }))}
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: Media Preview */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <ImageIcon size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Media Preview</h4>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                      <p className="text-[8px] uppercase tracking-widest font-bold opacity-30 text-center">Image 1</p>
                      {editingProduct?.image ? (
                        <div className="relative aspect-[3/4] w-full border border-admin-gold/20 overflow-hidden">
                          <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-[3/4] border-2 border-dashed border-admin-gold/10 flex items-center justify-center text-center p-4 bg-black/10">
                          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-admin-gold/40">No Image</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <p className="text-[8px] uppercase tracking-widest font-bold opacity-30 text-center">Image 2</p>
                      {editingProduct?.image2 ? (
                        <div className="relative aspect-[3/4] w-full border border-admin-gold/20 overflow-hidden">
                          <img src={editingProduct.image2} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-[3/4] border-2 border-dashed border-admin-gold/10 flex items-center justify-center text-center p-4 bg-black/10">
                          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-admin-gold/40">No Image</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <p className="text-[8px] uppercase tracking-widest font-bold opacity-30 text-center">Video 1</p>
                      {editingProduct?.video ? (
                        <div className="relative aspect-[3/4] w-full border border-admin-gold/20 overflow-hidden bg-black">
                          <video 
                            src={editingProduct.video} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[3/4] border-2 border-dashed border-admin-gold/10 flex items-center justify-center text-center p-4 bg-black/10">
                          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-admin-gold/40">No Video</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <p className="text-[8px] uppercase tracking-widest font-bold opacity-30 text-center">Video 2</p>
                      {editingProduct?.video2 ? (
                        <div className="relative aspect-[3/4] w-full border border-admin-gold/20 overflow-hidden bg-black">
                          <video 
                            src={editingProduct.video2} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[3/4] border-2 border-dashed border-admin-gold/10 flex items-center justify-center text-center p-4 bg-black/10">
                          <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-admin-gold/40">No Video</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Section 3: Pricing */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <DollarSign size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Pricing Strategy</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Base Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-gold/40 text-xs">$</span>
                        <input 
                          type="number" 
                          className="w-full bg-black/20 border border-admin-gold/10 pl-8 pr-4 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" 
                          placeholder="0.00" 
                          value={editingProduct?.price ?? ''}
                          onChange={(e) => setEditingProduct(prev => ({ ...prev!, price: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 7: Status & Visibility */}
                <section className="space-y-8 pb-12">
                  <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                    <Eye size={18} className="text-admin-gold" />
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Visibility & Status</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Available for Sale</span>
                      <button 
                        onClick={() => setEditingProduct(prev => ({ ...prev!, is_available: !prev?.is_available }))}
                        className={cn(
                          "w-12 h-6 rounded-full relative transition-colors",
                          editingProduct?.is_available ? "bg-admin-gold" : "bg-black/40"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-admin-bg rounded-full transition-all",
                          editingProduct?.is_available ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-10 border-t border-admin-gold/10 flex items-center justify-end gap-6 bg-black/40 backdrop-blur-xl">
                <button 
                  onClick={() => { setIsAddPanelOpen(false); setEditingProduct(null); }}
                  className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/40 hover:text-admin-ivory transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-12 py-5 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  {editingProduct?.id ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
