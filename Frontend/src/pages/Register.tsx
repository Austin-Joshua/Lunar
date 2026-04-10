import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, User, Mail, Lock, ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { ThemeToggle } from '@/components/ThemeToggle';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading: contextLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const isLoading = contextLoading || isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsSubmitting(true);
      const { user: userData, token } = await authApi.register(name, email, password);
      login(userData, token, true); // Sync with context
      navigate('/shop');
    } catch (err: any) {
      setError(err.data?.message || err.message || 'Enrollment unsuccessful. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary/20 relative">
        <div className="absolute top-8 right-8 z-50">
          <ThemeToggle />
        </div>
        
        {/* Left Side: Member Branding */}
        <div className="hidden lg:block relative bg-foreground overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none overflow-hidden">
            <h1 className="text-[30vw] font-black italic tracking-tighter text-background leading-none rotate-90 whitespace-nowrap">
              ENROLL
            </h1>
          </div>
          
          <div className="absolute inset-0 p-24 flex flex-col justify-between z-10 text-background">
             <Link to="/" className="text-4xl font-black italic tracking-tighter leading-none group">
              LUNAR<span className="text-primary not-italic group-hover:scale-125 transition-transform inline-block">.</span>
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 max-w-lg"
            >
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.6em] text-white/40">
                 <Sparkles className="h-3 w-3 text-primary" />
                 ATELIER MEMBERSHIP
              </div>
              <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.85]">
                The <br />
                <span className="text-primary font-light not-italic">Archive.</span>
              </h1>
              <p className="text-lg font-medium text-white/50 leading-relaxed uppercase tracking-tight max-w-sm">
                Join our exclusive society of modern connoisseurs. Members enjoy priority access to seasonal archives, private invitations, and bespoke styling services.
              </p>
              
              <div className="flex gap-12 pt-16">
                 {[
                   { label: 'PRIORITY', val: '01' },
                   { label: 'PRIVATE', val: '02' },
                   { label: 'BESPOKE', val: '03' }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2 border-l border-white/10 pl-6">
                      <h3 className="text-3xl font-black italic text-primary">{stat.val}</h3>
                      <span className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-40">{stat.label}</span>
                   </div>
                 ))}
              </div>
            </motion.div>

            <div className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">© 2026 LUNAR ATELIER</div>
          </div>
        </div>

        {/* Right Side: Sleek Enrollment Form */}
        <div className="flex items-center justify-center p-8 md:p-32 bg-background relative overflow-hidden">
          {/* Subtle background branding for mobile */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <h1 className="text-[60vw] font-black italic tracking-tighter leading-none rotate-90 whitespace-nowrap">JOIN THE CIRCLE</h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md space-y-16 z-10"
          >
            <div className="lg:hidden text-center mb-16">
               <Link to="/" className="text-5xl font-black italic tracking-tighter leading-none inline-block">
                LUNAR<span className="text-primary not-italic">.</span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                 <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">02 / REGISTRATION</span>
                 <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-foreground">Join the Circle<span className="text-primary not-italic font-light">.</span></h1>
              </div>
              <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase leading-relaxed max-w-xs mx-auto">
                Join the LUNAR inner circle to gain priority access to limited seasonal pieces and bespoke archival services.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/5 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest p-5 rounded-3xl text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-10">
                {/* Name - Refined Input */}
                <div className="relative group overflow-hidden">
                  <div className="flex items-center gap-6 border-b-2 border-border focus-within:border-primary transition-all duration-700 pb-4">
                    <User className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                    <input
                      type="text"
                      required
                      placeholder="FULL NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent text-sm font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-muted-foreground/30 py-1"
                    />
                  </div>
                </div>

                {/* Email - Refined Input */}
                <div className="relative group overflow-hidden">
                  <div className="flex items-center gap-6 border-b-2 border-border focus-within:border-primary transition-all duration-700 pb-4">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-muted-foreground/30 py-1"
                    />
                  </div>
                </div>

                {/* Password - Refined Input */}
                <div className="relative group overflow-hidden">
                  <div className="flex items-center gap-6 border-b-2 border-border focus-within:border-primary transition-all duration-700 pb-4">
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="CHOOSE PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-muted-foreground/30 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 hover:text-primary transition-colors text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-relaxed pt-2">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <p>
                  By enrolling, you agree to our <Link to="/terms" className="text-foreground hover:text-primary transition-colors border-b border-foreground">Terms</Link> and <Link to="/privacy" className="text-foreground hover:text-primary transition-colors border-b border-foreground">Privacy Policy</Link>.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-premium-primary w-full py-6 text-[10px] font-black tracking-[0.3em] uppercase group"
              >
                <div className="flex items-center justify-center gap-4">
                  {isLoading ? 'INITIALIZING...' : 'REGISTER IDENTITY'}
                  {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />}
                </div>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-16 text-center space-y-6">
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                ALREADY A MEMBER?{" "}
                <Link to="/signin" className="text-primary hover:text-foreground transition-colors border-b border-primary/20 pb-1">
                  MEMBER ACCESS
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
