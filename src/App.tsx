import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles,
  Send,
  Loader2,
  ChevronRight,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Product, CartItem, ChatMessage } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TryOnCamera = ({ product }: { product: Product }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center text-white p-8 text-center">
        <Camera size={48} className="mb-4 opacity-20" />
        <p className="text-sm uppercase tracking-widest font-bold mb-2">Camera Access Denied</p>
        <p className="text-xs opacity-50 max-w-xs">Please enable camera permissions in your browser settings to use the virtual mirror.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      {/* Product Overlay Simulation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg pointer-events-none mix-blend-multiply opacity-80"
      >
        <img 
          src={product.image} 
          alt="Try on overlay" 
          className="w-full h-auto drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white uppercase tracking-[0.3em] font-bold">
          Virtual Fitting in Progress
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileView, setProfileView] = useState<'main' | 'orders' | 'wishlist' | 'shipping' | 'payment' | 'settings'>('main');
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your personal Vogue & Verve stylist. How can I help you elevate your look today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    showNotification(`Added ${product.name} to bag`);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'customer@example.com',
          total: cartTotal,
          items: cart
        })
      });
      if (response.ok) {
        setCart([]);
        setIsCartOpen(false);
        showNotification("Order placed successfully! Check your email for details.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Thank you for subscribing to our newsletter!", "info");
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: newMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        config: {
          systemInstruction: "You are a high-end fashion stylist for 'Vogue & Verve', a luxury ecommerce brand. Your tone is sophisticated, helpful, and trend-aware. Recommend products from the catalog if relevant. The catalog includes: Midnight Velvet Blazer ($249.99), Silk Slip Dress ($189.00), Cashmere Turtleneck ($159.50), Tailored Wool Trousers ($129.00), Leather Chelsea Boots ($210.00), Oversized Linen Shirt ($89.00)."
        }
      });
      
      setChatMessages([...newMessages, { role: 'model', text: response.text || "I'm sorry, I couldn't process that. How else can I assist your style journey?" }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-brand-bg text-brand-paper px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10"
          >
            {notification.type === 'success' ? <ShoppingBag size={18} className="text-emerald-400" /> : <Sparkles size={18} className="text-brand-accent" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-[1800px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => { setActiveCategory('Outerwear'); scrollToProducts(); }} className="nav-link">New</button>
              <button onClick={() => { setActiveCategory('All'); scrollToProducts(); }} className="nav-link">Women</button>
              <button onClick={() => { setActiveCategory('All'); scrollToProducts(); }} className="nav-link">Men</button>
              <button onClick={scrollToFooter} className="nav-link">Maison</button>
            </div>
          </div>
          
          <h1 onClick={() => { setSelectedProduct(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-3xl font-serif font-bold tracking-[0.15em] cursor-pointer absolute left-1/2 -translate-x-1/2">VOGUE & VERVE</h1>
          
          <div className="flex items-center gap-8">
            <div className={`hidden lg:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-black/20 px-2 py-1 text-xs uppercase tracking-widest focus:outline-none focus:border-black"
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="nav-link flex items-center gap-2"
            >
              <Search size={18} /> <span className="hidden lg:inline">Search</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="nav-link flex items-center gap-2">
              <ShoppingBag size={18} /> <span className="hidden lg:inline">Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
            <button onClick={() => setIsProfileOpen(true)} className="nav-link flex items-center gap-2">
              <User size={18} /> <span className="hidden lg:inline">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mega Menu Overlay (LV Style) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[100] overflow-y-auto"
            >
              <div className="max-w-[1800px] mx-auto px-8 h-24 flex items-center">
                <button onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 uppercase tracking-[0.3em] text-[10px] font-bold hover:opacity-50 transition-opacity">
                  <X size={20} /> Close
                </button>
              </div>

              <div className="max-w-[1800px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                {/* Left Column: Categories */}
                <div className="lg:col-span-4 space-y-6">
                  {[
                    "Monogram Anniversary",
                    "Gifts and Personalization",
                    "New",
                    "Bags and Small Leather Goods",
                    "Women",
                    "Men",
                    "Perfumes and Beauty",
                    "Jewelry",
                    "Watches",
                    "Trunks, Travel and Home"
                  ].map((cat) => (
                    <button 
                      key={cat}
                      className={`w-full text-left text-2xl font-serif tracking-wide hover:opacity-50 transition-opacity flex items-center justify-between group ${cat === 'Men' ? 'border-b border-black pb-2' : ''}`}
                    >
                      {cat}
                      {cat === 'Men' && <ChevronRight size={20} />}
                    </button>
                  ))}
                </div>

                {/* Right Column: Featured & Sub-links */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 border-l border-black/5 pl-12">
                  <div className="space-y-12">
                    <div className="aspect-[16/9] bg-brand-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1549037173-e3b717902c57?auto=format&fit=crop&q=80&w=1200" 
                        alt="LV Trunk Edition" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.4em] font-bold">LV Trunk Edition</p>
                    </div>
                  </div>

                  <div className="space-y-8 pt-12">
                    {[
                      "Bags",
                      "Wallets and Small Leather Goods",
                      "Travel",
                      "Accessories",
                      "Fashion Jewelry"
                    ].map((sub) => (
                      <button 
                        key={sub}
                        onClick={() => { setActiveCategory('All'); scrollToProducts(); setIsMobileMenuOpen(false); }}
                        className="w-full text-left text-lg font-serif hover:opacity-50 transition-opacity"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsProfileOpen(false); setProfileView('main'); }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-[120] p-12 shadow-2xl rounded-none min-h-[600px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  {profileView !== 'main' && (
                    <button onClick={() => setProfileView('main')} className="p-2 hover:bg-black/5 -ml-2">
                      <ArrowRight size={20} className="rotate-180" />
                    </button>
                  )}
                  <h3 className="text-2xl font-serif italic">
                    {profileView === 'main' ? 'My Account' : 
                     profileView === 'orders' ? 'My Orders' :
                     profileView === 'wishlist' ? 'My Wishlist' :
                     profileView === 'shipping' ? 'Shipping Address' :
                     profileView === 'payment' ? 'Payment Methods' : 'Settings'}
                  </h3>
                </div>
                <button onClick={() => { setIsProfileOpen(false); setProfileView('main'); }} className="p-2 hover:bg-black/5">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {profileView === 'main' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 pb-8 border-b border-black/5">
                      <div className="w-16 h-16 rounded-full bg-brand-muted flex items-center justify-center">
                        <User size={32} className="opacity-20" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase tracking-widest">Muntasir Mamun</h4>
                        <p className="text-xs opacity-50 tracking-widest">muntasirmamun396@gmail.com</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 'orders', label: 'My Orders' },
                        { id: 'wishlist', label: 'Wishlist' },
                        { id: 'shipping', label: 'Shipping Address' },
                        { id: 'payment', label: 'Payment Methods' },
                        { id: 'settings', label: 'Settings' }
                      ].map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => setProfileView(item.id as any)}
                          className="w-full text-left py-5 text-xs uppercase tracking-[0.2em] font-bold border-b border-black/5 hover:pl-4 transition-all flex items-center justify-between group"
                        >
                          {item.label}
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        showNotification("Logged out successfully", "info");
                        setIsProfileOpen(false);
                      }}
                      className="w-full py-5 bg-black text-white text-xs uppercase tracking-[0.3em] font-bold hover:opacity-80 transition-opacity mt-8"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                {profileView === 'orders' && (
                  <div className="space-y-6">
                    {[
                      { id: '#VV-9821', date: 'Oct 12, 2023', total: 438.99, status: 'Delivered' },
                      { id: '#VV-9745', date: 'Sep 28, 2023', total: 189.00, status: 'Shipped' }
                    ].map(order => (
                      <div key={order.id} className="p-6 border border-black/5 bg-brand-muted/30">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Order ID</p>
                            <p className="text-sm font-bold">{order.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Status</p>
                            <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-emerald-100 text-emerald-700">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Date</p>
                            <p className="text-xs">{order.date}</p>
                          </div>
                          <p className="text-lg font-serif italic">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-4 border border-black/10 text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
                      View All Order History
                    </button>
                  </div>
                )}

                {profileView === 'wishlist' && (
                  <div className="grid grid-cols-2 gap-6">
                    {products.slice(0, 2).map(product => (
                      <div key={product.id} className="group">
                        <div className="aspect-[3/4] bg-brand-muted overflow-hidden relative mb-3">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm hover:bg-white">
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1 truncate">{product.name}</h4>
                        <p className="text-xs opacity-50">${product.price.toFixed(2)}</p>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <div className="col-span-2 py-20 text-center opacity-40 italic font-serif">
                        Your wishlist is currently empty.
                      </div>
                    )}
                  </div>
                )}

                {profileView === 'shipping' && (
                  <div className="space-y-8">
                    <div className="p-6 border border-black/10 relative">
                      <div className="absolute top-4 right-4 flex gap-3">
                        <button className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100">Edit</button>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-4">Primary Address</p>
                      <p className="text-sm leading-relaxed">
                        Muntasir Mamun<br />
                        123 Luxury Avenue, Suite 400<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <button className="w-full py-5 border-2 border-dashed border-black/10 text-[10px] uppercase tracking-widest font-bold hover:border-black transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> Add New Address
                    </button>
                  </div>
                )}

                {profileView === 'payment' && (
                  <div className="space-y-6">
                    <div className="p-6 border border-black/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-brand-bg rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                        <div>
                          <p className="text-xs font-bold">•••• •••• •••• 4242</p>
                          <p className="text-[10px] opacity-40">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100">Remove</button>
                    </div>
                    <button className="w-full py-5 border-2 border-dashed border-black/10 text-[10px] uppercase tracking-widest font-bold hover:border-black transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> Add Payment Method
                    </button>
                  </div>
                )}

                {profileView === 'settings' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Account Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-black/5">
                          <span className="text-xs font-medium">Email Notifications</span>
                          <button className="w-10 h-5 bg-emerald-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-black/5">
                          <span className="text-xs font-medium">Two-Factor Authentication</span>
                          <button className="w-10 h-5 bg-black/10 rounded-full relative">
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Privacy</h4>
                      <button className="w-full text-left text-xs font-medium py-2 border-b border-black/5">Manage Data & Privacy</button>
                      <button className="w-full text-left text-xs font-medium py-2 border-b border-black/5 text-red-500">Delete Account</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section - Full Screen Cinematic */}
              <section className="relative h-[90vh] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 flex flex-col items-center justify-end pb-24">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center text-white"
                  >
                    <h2 className="text-7xl md:text-9xl font-serif mb-12 tracking-tight leading-none">The New <br/><span className="italic">Elegance</span></h2>
                    <div className="flex gap-6 justify-center">
                      <button 
                        onClick={scrollToProducts}
                        className="bg-white text-black px-12 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black hover:text-white transition-all duration-500"
                      >
                        Explore the Collection
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Maison Highlight - Split Layout */}
              <section className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Women" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white">
                    <h3 className="text-5xl font-serif mb-8">Women's Universe</h3>
                    <button onClick={() => { setActiveCategory('Dresses'); scrollToProducts(); }} className="border border-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all">Discover</button>
                  </div>
                </div>
                <div className="relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Men" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white">
                    <h3 className="text-5xl font-serif mb-8">Men's Universe</h3>
                    <button onClick={() => { setActiveCategory('Outerwear'); scrollToProducts(); }} className="border border-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all">Discover</button>
                  </div>
                </div>
              </section>

              {/* Product Grid - Refined */}
              <section ref={productsRef} className="max-w-[1600px] mx-auto px-8 py-32 scroll-mt-24">
                <div className="text-center mb-24">
                  <span className="uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 mb-4 block">Selection</span>
                  <h3 className="text-5xl font-serif italic">Signature Pieces</h3>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {filteredProducts.map((product, idx) => (
                      <motion.div 
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group cursor-pointer"
                        onClick={() => { setSelectedProduct(product); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-brand-muted mb-8">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm uppercase tracking-widest font-bold mb-2">{product.name}</h4>
                          <p className="text-sm font-serif opacity-50">${product.price.toFixed(2)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-brand-bg/40 font-serif text-xl italic">No pieces found matching your criteria.</p>
                    <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-sm font-semibold uppercase tracking-widest border-b border-brand-bg pb-1">Reset Filters</button>
                  </div>
                )}
              </section>

              {/* Heritage Section */}
              <section className="bg-brand-muted py-32">
                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
                  <div className="order-2 md:order-1">
                    <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" className="w-full rounded-none shadow-2xl" alt="Maison" referrerPolicy="no-referrer" />
                  </div>
                  <div className="order-1 md:order-2">
                    <span className="uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 mb-6 block">The Maison</span>
                    <h2 className="text-6xl font-serif mb-10 leading-tight">A Legacy of <br/><span className="italic">Craftsmanship</span></h2>
                    <p className="text-brand-bg/60 text-lg leading-relaxed mb-12">
                      Since our inception, Vogue & Verve has stood for the pinnacle of luxury. Every piece is a testament to the artisans who pour their soul into every stitch, ensuring that elegance is not just seen, but felt.
                    </p>
                    <button className="btn-outline">Explore our Story</button>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-12"
              >
                <ArrowRight size={16} className="rotate-180" /> Back to Collection
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                {/* Product Images */}
                <div className="space-y-8">
                  <div className="aspect-[4/5] rounded-none overflow-hidden bg-brand-muted">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="aspect-[4/5] rounded-none overflow-hidden bg-brand-muted opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                       <img src={selectedProduct.image} alt="Detail 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="aspect-[4/5] rounded-none overflow-hidden bg-brand-muted opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                       <img src={selectedProduct.image} alt="Detail 2" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col pt-12">
                  <div className="mb-12">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-brand-bg/40 font-bold mb-6">{selectedProduct.category}</p>
                    <h2 className="text-6xl font-serif mb-8 leading-tight">{selectedProduct.name}</h2>
                    <p className="text-4xl font-serif mb-10 opacity-20">${selectedProduct.price.toFixed(2)}</p>
                    <div className="h-px bg-black/5 w-full mb-10" />
                    <p className="text-brand-bg/60 text-sm leading-loose mb-12 max-w-md">
                      {selectedProduct.description || "A masterpiece of modern design, this piece embodies the Vogue & Verve philosophy of timeless elegance and superior craftsmanship."}
                    </p>
                  </div>

                  <div className="space-y-10 mb-16">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Size</span>
                      <div className="flex gap-4">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <button key={size} className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-[10px] font-bold hover:border-brand-bg transition-colors">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Color</span>
                      <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-brand-bg border-2 border-brand-accent p-1">
                          <div className="w-full h-full rounded-full bg-brand-bg" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#9c9c9c] border border-black/5" />
                        <button className="w-10 h-10 rounded-full bg-white border border-black/10" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-grow bg-white text-brand-bg border border-brand-bg py-5 rounded-none uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-bg hover:text-brand-paper transition-all flex items-center justify-center gap-3"
                    >
                      Add to Bag <ShoppingBag size={16} />
                    </button>
                    <button 
                      onClick={() => setIsBuyNowOpen(true)}
                      className="flex-grow bg-brand-bg text-brand-paper py-5 rounded-none uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-bg/80 transition-all flex items-center justify-center gap-3"
                    >
                      Buy Now
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      onClick={() => setIsTryOnOpen(true)}
                      className="w-full border border-brand-accent text-brand-accent py-5 rounded-none uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                      <Camera size={16} /> Virtual Try On
                    </button>
                  </div>

                  <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-black/5">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Material</p>
                      <p className="text-xs opacity-60">100% Premium</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Origin</p>
                      <p className="text-xs opacity-60">Italy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Care</p>
                      <p className="text-xs opacity-60">Dry Clean Only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products Placeholder */}
              <div className="mt-32">
                <h3 className="text-2xl font-serif mb-12">Complete the Look</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {products.filter(p => p.id !== selectedProduct.id).slice(0, 4).map(product => (
                    <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                      <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-sm opacity-50">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Stylist Teaser */}
        {!selectedProduct && (
          <section className="bg-brand-bg text-brand-paper py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                  <Sparkles size={16} className="text-brand-accent" />
                  <span className="text-xs font-semibold uppercase tracking-widest">AI Personal Stylist</span>
                </div>
                <h2 className="text-5xl font-serif mb-6 leading-tight">Find Your Perfect <br/><span className="italic text-brand-accent">Signature Look</span></h2>
                <p className="text-brand-paper/70 text-lg mb-10 max-w-md">
                  Not sure how to style that blazer? Our AI stylist is trained on the latest trends and our entire collection to help you look your best.
                </p>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="bg-brand-accent text-brand-bg px-10 py-4 rounded-full font-semibold hover:bg-brand-accent/90 transition-all"
                >
                  Consult Stylist
                </button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full border border-white/10 absolute -top-20 -right-20 w-[120%] animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" 
                  alt="Styling"
                  className="rounded-3xl relative z-10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer ref={footerRef} className="bg-white border-t border-black/5 py-32">
        <div className="max-w-[1800px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1">
            <h1 className="text-2xl font-serif font-bold tracking-[0.2em] mb-8">VOGUE & VERVE</h1>
            <p className="text-xs uppercase tracking-widest text-brand-bg/40 leading-loose">
              The pinnacle of luxury craftsmanship. <br/>Defining elegance since 2026.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10">Universe</h5>
            <ul className="space-y-6 text-xs uppercase tracking-widest text-brand-bg/60">
              <li><button onClick={() => { setActiveCategory('All'); scrollToProducts(); }} className="hover:text-brand-bg transition-colors">Women</button></li>
              <li><button onClick={() => { setActiveCategory('Outerwear'); scrollToProducts(); }} className="hover:text-brand-bg transition-colors">Men</button></li>
              <li><button onClick={() => { setActiveCategory('Dresses'); scrollToProducts(); }} className="hover:text-brand-bg transition-colors">Accessories</button></li>
              <li><button onClick={() => showNotification("New collection arriving soon", "info")} className="hover:text-brand-bg transition-colors">Art of Living</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10">Services</h5>
            <ul className="space-y-6 text-xs uppercase tracking-widest text-brand-bg/60">
              <li><button onClick={() => showNotification("Complimentary shipping on all orders", "info")} className="hover:text-brand-bg transition-colors">Shipping</button></li>
              <li><button onClick={() => showNotification("30-day returns policy", "info")} className="hover:text-brand-bg transition-colors">Returns</button></li>
              <li><button onClick={() => showNotification("Contact our client advisors", "info")} className="hover:text-brand-bg transition-colors">Contact Us</button></li>
              <li><button onClick={() => showNotification("Personalization services available", "info")} className="hover:text-brand-bg transition-colors">Care & Services</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10">Newsletter</h5>
            <p className="text-xs uppercase tracking-widest text-brand-bg/40 mb-8 leading-loose">Subscribe to receive the latest news from the Maison.</p>
            <form onSubmit={handleNewsletter} className="flex border-b border-black/20 pb-2">
              <input 
                type="email" 
                required
                placeholder="Email address" 
                className="bg-transparent text-xs uppercase tracking-widest flex-grow focus:outline-none"
              />
              <button type="submit" className="hover:opacity-50 transition-opacity">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto px-8 mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">
          <p>© 2026 Vogue & Verve. All Rights Reserved.</p>
          <div className="flex gap-12">
            <button onClick={() => showNotification("Privacy Policy updated Feb 2026", "info")}>Privacy Policy</button>
            <button onClick={() => showNotification("Terms of Service updated Feb 2026", "info")}>Terms of Service</button>
            <button onClick={() => showNotification("Legal Notice", "info")}>Legal Notice</button>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-paper z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <h3 className="text-xl font-serif">Your Bag ({cart.length})</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag size={48} className="opacity-10 mb-4" />
                    <p className="text-brand-bg/40">Your bag is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 text-sm font-semibold uppercase tracking-widest border-b border-brand-bg pb-1"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-brand-bg/40 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-brand-bg/40 mt-1">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-black/10 rounded-full px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-black/5 rounded-full"><Minus size={12} /></button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-black/5 rounded-full"><Plus size={12} /></button>
                          </div>
                          <p className="font-serif">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-black/5 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-serif">Subtotal</span>
                    <span className="font-serif font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-brand-bg/40 uppercase tracking-widest text-center">Shipping & taxes calculated at checkout</p>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-bg text-brand-paper py-5 rounded-none uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-bg/80 transition-all"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Stylist Chat */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white z-[80] shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-black/5"
          >
            <div className="bg-brand-bg text-brand-paper p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center">
                  <Sparkles size={20} className="text-brand-bg" />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-none">AI Stylist</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Personal Concierge</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-bg text-brand-paper rounded-tr-none' 
                      : 'bg-brand-paper text-brand-bg border border-black/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-brand-paper p-4 rounded-2xl rounded-tl-none border border-black/5">
                    <Loader2 size={16} className="animate-spin opacity-40" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-black/5">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask for styling advice..."
                  className="flex-grow bg-brand-paper border border-black/5 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand-bg"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isTyping}
                  className="bg-brand-bg text-brand-paper p-3 rounded-full hover:bg-brand-bg/90 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Try On Modal */}
      <AnimatePresence>
        {isTryOnOpen && selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTryOnOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[110]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-20 bg-white z-[120] rounded-none overflow-hidden flex flex-col md:flex-row"
            >
              <div className="flex-grow bg-black relative flex items-center justify-center">
                <TryOnCamera product={selectedProduct} />
                <button 
                  onClick={() => setIsTryOnOpen(false)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="w-full md:w-96 bg-white p-12 flex flex-col">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 mb-4 block">Virtual Mirror</span>
                <h3 className="text-3xl font-serif mb-8 italic">Virtual Try On</h3>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-20 h-24 bg-brand-muted overflow-hidden">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest">{selectedProduct.name}</h4>
                    <p className="text-sm opacity-50">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-xs leading-loose opacity-60 mb-12">
                  Our AR technology allows you to see how this piece fits your silhouette. Ensure you are in a well-lit environment for the best experience.
                </p>
                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setIsTryOnOpen(false); }}
                    className="w-full btn-primary"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => setIsTryOnOpen(false)}
                    className="w-full btn-outline"
                  >
                    Close Mirror
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Buy Now Modal */}
      <AnimatePresence>
        {isBuyNowOpen && selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBuyNowOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[120] p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-serif italic">Express Checkout</h3>
                <button onClick={() => setIsBuyNowOpen(false)} className="p-2 hover:bg-black/5">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex gap-6 mb-12 pb-12 border-b border-black/5">
                <div className="w-24 h-32 bg-brand-muted overflow-hidden">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-serif mb-2">{selectedProduct.name}</h4>
                  <p className="text-xl font-bold">${selectedProduct.price.toFixed(2)}</p>
                  <p className="text-xs uppercase tracking-widest opacity-40 mt-2">Free Express Shipping</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Size</label>
                    <select className="w-full bg-brand-muted px-4 py-3 text-xs uppercase tracking-widest font-bold focus:outline-none">
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Payment</label>
                    <div className="w-full bg-brand-muted px-4 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                       Apple Pay
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  showNotification("Order placed successfully!", "success");
                  setIsBuyNowOpen(false);
                  setSelectedProduct(null);
                }}
                className="w-full btn-primary py-6 text-sm"
              >
                Confirm Purchase — ${selectedProduct.price.toFixed(2)}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      {!isChatOpen && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-brand-bg text-brand-paper rounded-full shadow-2xl flex items-center justify-center z-50 group"
        >
          <Sparkles size={24} className="group-hover:text-brand-accent transition-colors" />
        </motion.button>
      )}
    </div>
  );
}
