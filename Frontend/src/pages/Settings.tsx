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
    navigate('/signin');
  };

  const menuItems = [
    { id: 'profile', label: 'IDENTITY', icon: User },
    { id: 'security', label: 'SECURITY PROTOCOL', icon: Lock },
    { id: 'notifications', label: 'COMMUNICATIONS', icon: Bell },
    { id: 'billing', label: 'VALUATION & BILLING', icon: CreditCard },
  ];

  return (
    <PageTransition>
      <div className="min-h-[100dvh] bg-background pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] text-foreground selection:bg-primary/20 sm:pt-28 md:pb-32 md:pt-32 lg:pb-40">
        <div className="lunar-container">
          
          {/* EDITORIAL HEADER */}
          <div className="mb-10 flex flex-col justify-between gap-8 border-b border-border/80 pb-10 dark:border-white/10 sm:mb-14 sm:gap-10 md:mb-16 md:flex-row md:items-end md:pb-16">
             <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-primary sm:gap-4">
                   <Fingerprint className="h-4 w-4 shrink-0" />
                   COMMAND PREFERENCES
                </div>
                <h1 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-foreground sm:text-5xl md:text-7xl lg:text-8xl">
                  User <br />
                  <span className="text-primary font-light not-italic">Settings.</span>
                </h1>
             </div>
             <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                <div className="flex items-center gap-2 font-black text-primary"><div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> ENCRYPTED SESSION ACTIVE</div>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="space-y-8 lg:col-span-4 lg:space-y-10">
               <div className="space-y-2 rounded-3xl border border-border bg-muted/20 p-4 dark:border-white/10 dark:bg-white/[0.02] sm:space-y-3 sm:rounded-[2.5rem] sm:p-6 md:p-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "group flex min-h-[48px] w-full items-center justify-between rounded-2xl px-4 py-4 transition-all duration-500 sm:px-6 sm:py-5",
                        activeTab === item.id 
                          ? "border border-primary/20 bg-primary/10 text-primary shadow-lg" 
                          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/5"
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
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="group flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-destructive/60 transition-all duration-500 hover:bg-destructive/5 hover:text-destructive sm:gap-4 sm:px-10 sm:py-6"
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
                    <div className="space-y-12 sm:space-y-16">
                       <section className="space-y-8 sm:space-y-10">
                          <div className="flex items-center gap-4 border-b border-border pb-4 dark:border-white/5">
                             <User className="h-4 w-4 text-primary" />
                             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">CORE IDENTITY</h2>
                          </div>
                          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">FULL NAME</label>
                                <div className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3 text-muted-foreground dark:border-white/10 dark:bg-white/5">
                                   {user?.name || 'IDENTITY UNSET'}
                                   <ShieldCheck className="h-4 w-4 opacity-20" />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase">COMMUNICATION BRIDGE</label>
                                <div className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3 text-muted-foreground dark:border-white/10 dark:bg-white/5">
                                   {user?.email || 'EMAIL UNSET'}
                                   <ShieldCheck className="h-4 w-4 opacity-20" />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase">LEVEL OF ACCESS</label>
                                <div className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3 font-black text-primary/60 dark:border-white/10 dark:bg-white/5">
                                   {user?.role === 'admin' ? 'SYSTEM OVERSEER' : 'GUEST ARCHIVIST'}
                                   <Activity className="h-4 w-4 opacity-40 animate-pulse" />
                                </div>
                             </div>
                          </div>
                       </section>

                       <section className="space-y-8 sm:space-y-10">
                          <div className="flex items-center gap-4 border-b border-border pb-4 dark:border-white/5">
                             <Activity className="h-4 w-4 text-primary" />
                             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">INTERFACE THEME</h2>
                          </div>
                          <button 
                            type="button"
                            onClick={toggleTheme}
                            className="group flex w-full min-h-[56px] items-center justify-between rounded-3xl border border-border bg-muted/20 p-6 transition-all duration-700 hover:border-primary/20 dark:border-white/5 dark:bg-white/[0.02] sm:rounded-[2.5rem] sm:p-8 md:p-10"
                          >
                             <div className="flex items-center gap-8">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                                   {theme === 'dark' ? <Moon className="h-8 w-8" /> : <Sun className="h-8 w-8" />}
                                </div>
                                <div className="text-left">
                                   <p className="text-sm font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">DARK PROTOCOL</p>
                                   <p className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-2">TOGGLE HIGH-CONTRAST MONOCHROME EXPERIENCE</p>
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
                    <div className="space-y-8 rounded-3xl border border-border bg-muted/20 py-16 text-center dark:border-white/5 dark:bg-white/[0.02] sm:space-y-10 sm:rounded-[3rem] sm:py-24 md:py-32">
                       <div className="flex justify-center">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-muted-foreground/50 dark:bg-white/5">
                             <ShieldCheck className="h-10 w-10" />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Protocol Encrypted</h3>
                          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 px-safe pb-safe pt-safe backdrop-blur-3xl sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-full dark:border-white/10 sm:space-y-12 sm:rounded-[3rem] sm:p-12"
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                   <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                      <LogOut className="h-8 w-8" />
                   </div>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">End Session?</h3>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                  ARE YOU ABSOLUTELY CERTAIN YOU WANT TO DISCONNECT FROM THE LUNAR ARCHIVE PROTOCOL?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="min-h-11 rounded-2xl border border-border py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted dark:border-white/5"
                >
                  ABORT
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="min-h-11 rounded-2xl bg-destructive py-4 text-[10px] font-black uppercase tracking-widest text-destructive-foreground shadow-xl transition-all hover:bg-destructive/80"
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
