import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Moon, Sun, Bell, Lock, User, Mail, ShieldCheck, ChevronRight, Fingerprint, Activity, CreditCard } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'profile', label: 'IDENTITY', icon: User },
    { id: 'security', label: 'SECURITY PROTOCOL', icon: Lock },
    { id: 'notifications', label: 'COMMUNICATIONS', icon: Bell },
    { id: 'billing', label: 'VALUATION & BILLING', icon: CreditCard },
  ];

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen pt-32 pb-40 selection:bg-primary/20">
        <div className="lunar-container">
          
          {/* EDITORIAL HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16 mb-20">
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                   <Fingerprint className="h-4 w-4" />
                   COMMAND PREFERENCES
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                  User <br />
                  <span className="text-primary font-light not-italic">Settings.</span>
                </h1>
             </div>
             <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">
                <div className="flex items-center gap-2 font-black text-primary"><div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> ENCRYPTED SESSION ACTIVE</div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-4 space-y-10">
               <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-500 group",
                        activeTab === item.id 
                          ? "bg-primary/10 text-primary border border-primary/20 shadow-2xl" 
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-4">
                         <item.icon className="h-4 w-4" />
                         <span className="text-[10px] font-black tracking-[0.3em] uppercase">{item.label}</span>
                      </div>
                      <ChevronRight className={cn("h-4 w-4 transition-transform duration-500", activeTab === item.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} />
                    </button>
                  ))}
               </div>

               <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-4 px-10 py-6 rounded-2xl text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-all duration-500 font-black text-[10px] tracking-[0.4em] uppercase group"
               >
                  <LogOut className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-500" /> 
                  TERMINATE SESSION
               </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  {activeTab === 'profile' && (
                    <div className="space-y-16">
                       <section className="space-y-10">
                          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                             <User className="h-4 w-4 text-primary" />
                             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">CORE IDENTITY</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold text-white/20 tracking-widest uppercase">FULL NAME</label>
                                <div className="checkout-input bg-white/5 border-white/10 text-white/40 cursor-not-allowed flex items-center justify-between">
                                   {user?.name || 'IDENTITY UNSET'}
                                   <ShieldCheck className="h-4 w-4 opacity-20" />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold text-white/20 tracking-widest uppercase">COMMUNICATION BRIDGE</label>
                                <div className="checkout-input bg-white/5 border-white/10 text-white/40 cursor-not-allowed flex items-center justify-between">
                                   {user?.email || 'EMAIL UNSET'}
                                   <ShieldCheck className="h-4 w-4 opacity-20" />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold text-white/20 tracking-widest uppercase">LEVEL OF ACCESS</label>
                                <div className="checkout-input bg-white/5 border-white/10 text-primary/60 cursor-not-allowed font-black flex items-center justify-between">
                                   {user?.role === 'admin' ? 'SYSTEM OVERSEER' : 'GUEST ARCHIVIST'}
                                   <Activity className="h-4 w-4 opacity-40 animate-pulse" />
                                </div>
                             </div>
                          </div>
                       </section>

                       <section className="space-y-10">
                          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                             <Activity className="h-4 w-4 text-primary" />
                             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">INTERFACE THEME</h2>
                          </div>
                          <button 
                            onClick={toggleTheme}
                            className="w-full flex items-center justify-between p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-700 group"
                          >
                             <div className="flex items-center gap-8">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                                   {theme === 'dark' ? <Moon className="h-8 w-8" /> : <Sun className="h-8 w-8" />}
                                </div>
                                <div className="text-left">
                                   <p className="text-sm font-black italic tracking-tighter text-white uppercase group-hover:text-primary transition-colors">DARK PROTOCOL</p>
                                   <p className="text-[9px] font-bold text-white/20 tracking-widest uppercase mt-2">TOGGLE HIGH-CONTRAST MONOCHROME EXPERIENCE</p>
                                </div>
                             </div>
                             <div className={cn("w-14 h-8 rounded-full border border-white/10 relative transition-all duration-500", theme === 'dark' ? "bg-primary" : "bg-white/5")}>
                                <motion.div 
                                  animate={{ x: theme === 'dark' ? 24 : 4 }}
                                  className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-2xl"
                                />
                             </div>
                          </button>
                       </section>
                    </div>
                  )}

                  {activeTab !== 'profile' && (
                    <div className="py-40 text-center space-y-10 border border-white/5 rounded-[3rem] bg-white/[0.01]">
                       <div className="flex justify-center">
                          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                             <ShieldCheck className="h-10 w-10" />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Protocol Encrypted</h3>
                          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose">
                             THIS SECTION IS CURRENTLY PROTECTED BY BIOMETRIC ENCRYPTION. VERIFICATION REQUIRED FOR ACCESS.
                          </p>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT PROMPT MODAL */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 space-y-12 shadow-full"
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                   <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                      <LogOut className="h-8 w-8" />
                   </div>
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">End Session?</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                  ARE YOU ABSOLUTELY CERTAIN YOU WANT TO DISCONNECT FROM THE LUNAR ARCHIVE PROTOCOL?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="py-5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-colors"
                >
                  ABORT
                </button>
                <button
                  onClick={handleLogout}
                  className="py-5 rounded-2xl bg-destructive text-white text-[10px] font-black uppercase tracking-widest hover:bg-destructive/80 transition-all shadow-xl"
                >
                  CONFIRM
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Settings;
