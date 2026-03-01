import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Globe, 
  CreditCard, 
  Truck, 
  Bell, 
  Shield, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Mail,
  Lock,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { name: 'General', icon: Settings },
    { name: 'Storefront', icon: Globe },
    { name: 'Payments', icon: CreditCard },
    { name: 'Shipping', icon: Truck },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-10 p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-admin-display font-bold text-admin-gold">System Settings</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-1">Configure your luxury commerce engine</p>
        </div>
        <button className="flex items-center gap-2 px-10 py-4 bg-admin-gold text-admin-bg text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-admin-gold/90 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border border-transparent",
                activeTab === tab.name 
                  ? "bg-admin-gold text-admin-bg shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                  : "text-admin-gold/40 hover:text-admin-gold hover:bg-admin-gold/5"
              )}
            >
              <tab.icon size={16} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-admin-card border border-admin-gold/15 p-10 space-y-12">
          {activeTab === 'General' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Settings size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Store Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Store Name</label>
                    <input type="text" defaultValue="ZELORI LUXURY" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Support Email</label>
                    <input type="email" defaultValue="concierge@zelori.com" className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Store Currency</label>
                    <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                      <option>USD ($) — United States Dollar</option>
                      <option>EUR (€) — Euro</option>
                      <option>GBP (£) — British Pound</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Timezone</label>
                    <select className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all appearance-none">
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) London</option>
                      <option>(GMT+01:00) Paris</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Globe size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Regional Settings</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-gold/5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Automatic Tax Calculation</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">Calculate taxes based on customer location</p>
                    </div>
                    <button className="w-12 h-6 bg-admin-gold rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-admin-bg rounded-full" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-gold/5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Multi-Language Support</p>
                      <p className="text-[9px] uppercase tracking-widest opacity-30">Enable translations for global markets</p>
                    </div>
                    <button className="w-12 h-6 bg-black/40 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'Payments' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <CreditCard size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Payment Gateways</h4>
                </div>
                <div className="space-y-8">
                  <div className="p-8 bg-black/20 border border-admin-gold/10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="w-full" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Stripe Payments</p>
                          <p className="text-[9px] uppercase tracking-widest opacity-30 text-admin-success">Connected & Active</p>
                        </div>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest font-bold text-admin-danger hover:underline">Disconnect</button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Live Secret Key</label>
                        <div className="relative">
                          <input 
                            type={showApiKey ? "text" : "password"} 
                            value="sk_live_51MvX..." 
                            readOnly 
                            className="w-full bg-black/40 border border-admin-gold/10 px-5 py-4 text-sm font-mono focus:outline-none" 
                          />
                          <button 
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-gold/40 hover:text-admin-gold"
                          >
                            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border border-admin-gold/5 bg-black/5 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-full" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">PayPal Checkout</p>
                          <p className="text-[9px] uppercase tracking-widest opacity-30">Not Connected</p>
                        </div>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest font-bold text-admin-gold hover:underline">Configure</button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'Security' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Shield size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Access Control</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-gold/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-admin-gold/5 border border-admin-gold/10 rounded-lg">
                        <Smartphone size={20} className="text-admin-gold" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Two-Factor Authentication (2FA)</p>
                        <p className="text-[9px] uppercase tracking-widest opacity-30">Require a code from your mobile device to login</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-admin-gold rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-admin-bg rounded-full" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-gold/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-admin-gold/5 border border-admin-gold/10 rounded-lg">
                        <Clock size={20} className="text-admin-gold" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Session Timeout</p>
                        <p className="text-[9px] uppercase tracking-widest opacity-30">Automatically logout after 30 minutes of inactivity</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-admin-gold rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-admin-bg rounded-full" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-admin-gold/10 pb-4">
                  <Lock size={18} className="text-admin-gold" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-admin-gold">Password Policy</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Minimum Length</label>
                    <input type="number" defaultValue={12} className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Password Expiry (Days)</label>
                    <input type="number" defaultValue={90} className="w-full bg-black/20 border border-admin-gold/10 px-5 py-4 text-sm focus:outline-none focus:border-admin-gold transition-all" />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {['Storefront', 'Shipping', 'Notifications'].includes(activeTab) && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-admin-gold/5 border border-admin-gold/10 rounded-full flex items-center justify-center mx-auto">
                <Settings size={32} className="text-admin-gold/20 animate-spin-slow" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">
                The {activeTab} module is currently being calibrated for luxury standards.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
