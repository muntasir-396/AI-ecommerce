import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  Image as ImageIcon,
  Search,
  Save,
  X,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  image?: string | null;
  children?: Category[];
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const buildTree = (flatList: Category[]): Category[] => {
    const map: { [key: string]: Category } = {};
    const tree: Category[] = [];

    flatList.forEach(cat => {
      map[cat.id] = { ...cat, children: [] };
    });

    flatList.forEach(cat => {
      if (cat.parentId && map[cat.parentId]) {
        map[cat.parentId].children!.push(map[cat.id]);
      } else {
        tree.push(map[cat.id]);
      }
    });

    return tree;
  };

  const treeData = buildTree(categories);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const handleAddCategory = (parentId?: string) => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      slug: '',
      parentId: parentId || null,
      description: '',
      image: ''
    };
    setSelectedCategory(newCat);
    setIsEditing(true);
  };

  const handleSaveCategory = async () => {
    if (!selectedCategory?.name || !selectedCategory?.slug) {
      alert('Name and Slug are required');
      return;
    }

    const isNew = !categories.find(c => c.id === selectedCategory.id);
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/categories' : `/api/categories/${selectedCategory.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCategory),
      });

      if (res.ok) {
        fetchCategories();
        setIsEditing(false);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
        if (selectedCategory?.id === id) {
          setIsEditing(false);
          setSelectedCategory(null);
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const renderCategoryItem = (category: Category, level = 0) => {
    const isExpanded = expandedIds.has(category.id);
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = selectedCategory?.id === category.id;

    return (
      <div key={category.id} className="space-y-1">
        <div 
          className={cn(
            "group flex items-center gap-2 px-3 py-2 transition-all duration-300 cursor-pointer border border-transparent",
            isSelected ? "bg-admin-gold/10 border-admin-gold/20 text-admin-gold" : "hover:bg-white/5 text-admin-ivory/80"
          )}
          onClick={() => {
            setSelectedCategory(category);
            setIsEditing(true);
          }}
        >
          <div className="flex items-center gap-2 flex-grow">
            <div style={{ width: `${level * 24}px` }} />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(category.id);
              }}
              className={cn("p-1 hover:bg-white/10 rounded transition-opacity", !hasChildren && "opacity-0 pointer-events-none")}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            <GripVertical size={14} className="opacity-0 group-hover:opacity-30 cursor-grab active:cursor-grabbing" />
            <span className="text-sm font-medium tracking-wide">{category.name}</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddCategory(category.id);
              }}
              className="p-1.5 hover:text-admin-gold transition-colors"
              title="Add Sub-category"
            >
              <Plus size={14} />
            </button>
            <button className="p-1.5 hover:text-admin-danger transition-colors" title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {category.children!.map(child => renderCategoryItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-admin-display font-bold text-admin-gold mb-2">Categories</h1>
          <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-30">Manage your product hierarchy</p>
        </div>
        <button 
          onClick={() => handleAddCategory()}
          className="flex items-center gap-2 bg-admin-gold text-admin-bg px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Add Top-Level Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Category Tree */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-admin-card border border-admin-gold/15 p-6 min-h-[600px] flex flex-col">
            <div className="relative mb-6">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-gold/40" />
              <input 
                type="text" 
                placeholder="Search categories..." 
                className="w-full bg-black/20 border border-admin-gold/10 pl-10 pr-4 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-admin-gold/40 transition-all"
              />
            </div>

            <div className="flex-grow space-y-1 overflow-y-auto custom-scrollbar pr-2">
              {treeData.map(cat => renderCategoryItem(cat))}
            </div>

            <div className="mt-8 pt-6 border-t border-admin-gold/10">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 flex items-center gap-2">
                <GripVertical size={12} /> Drag to reorder categories
              </p>
            </div>
          </div>
        </div>

        {/* Right: Category Edit Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {isEditing && selectedCategory ? (
              <motion.div
                key={selectedCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-admin-card border border-admin-gold/15 p-10 space-y-10"
              >
                <div className="flex items-center justify-between border-b border-admin-gold/10 pb-6">
                  <h2 className="text-2xl font-admin-display font-bold text-admin-gold">
                    {selectedCategory.id.includes('.') ? 'Edit Category' : 'New Category'}
                  </h2>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-white/5 text-admin-ivory/40 hover:text-admin-ivory transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Category Name</label>
                    <input 
                      type="text" 
                      value={selectedCategory.name}
                      onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                      className="w-full bg-black/20 border border-admin-gold/10 px-4 py-3 text-sm focus:outline-none focus:border-admin-gold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Slug</label>
                    <input 
                      type="text" 
                      value={selectedCategory.slug}
                      onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                      className="w-full bg-black/20 border border-admin-gold/10 px-4 py-3 text-sm focus:outline-none focus:border-admin-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Parent Category</label>
                  <select 
                    value={selectedCategory.parentId || ''}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, parentId: e.target.value || null })}
                    className="w-full bg-black/20 border border-admin-gold/10 px-4 py-3 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none"
                  >
                    <option value="">None (Top Level)</option>
                    {categories.filter(c => c.id !== selectedCategory.id).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Description</label>
                  <textarea 
                    rows={4}
                    value={selectedCategory.description || ''}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                    className="w-full bg-black/20 border border-admin-gold/10 px-4 py-3 text-sm focus:outline-none focus:border-admin-gold transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Editorial Banner URL</label>
                  <div className="flex gap-4">
                    <div className="relative flex-grow">
                      <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-gold/40" />
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/..." 
                        value={selectedCategory.image || ''}
                        onChange={(e) => setSelectedCategory({ ...selectedCategory, image: e.target.value })}
                        className="w-full bg-black/20 border border-admin-gold/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-admin-gold transition-all"
                      />
                    </div>
                  </div>
                  <div className="aspect-[21/9] bg-black/40 border-2 border-dashed border-admin-gold/10 flex flex-col items-center justify-center gap-4 group hover:border-admin-gold/30 transition-all cursor-pointer overflow-hidden relative">
                    {selectedCategory.image ? (
                      <img src={selectedCategory.image} alt="Category" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-admin-gold/5 flex items-center justify-center text-admin-gold/40 group-hover:scale-110 transition-transform">
                          <ImageIcon size={24} />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-admin-gold/60">Editorial Banner Preview</p>
                          <p className="text-[8px] opacity-30 mt-1">Enter a URL above to see preview</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-10 border-t border-admin-gold/10 flex justify-end gap-4">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-admin-ivory/60 hover:text-admin-ivory transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveCategory}
                    className="flex items-center gap-2 bg-admin-gold text-admin-bg px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                  >
                    <Save size={16} /> Save Category
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[600px] border-2 border-dashed border-admin-gold/10 flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 rounded-full bg-admin-gold/5 flex items-center justify-center text-admin-gold/20 mb-6">
                  <Edit2 size={32} />
                </div>
                <h3 className="text-xl font-admin-display font-bold text-admin-gold/40 mb-2">No Category Selected</h3>
                <p className="text-xs uppercase tracking-widest opacity-30 max-w-xs leading-loose">
                  Select a category from the tree to edit its details or create a new one.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
