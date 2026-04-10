import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Package, ShieldCheck, Zap } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

const LandingPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/20 overflow-hidden bg-apple-gradient">
        
        {/* HERO SECTION - Minimal, Premium, Centered */}
        <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6">
          <div className="lunar-container z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-primary uppercase bg-primary/5 px-4 py-2 rounded-full mb-4 animate-slide-up-fade">
                LUNAR SPRING 2026
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                Redefinition of <br />
                <span className="text-foreground/90 font-light italic text-primary">Modern Luxury.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-tight max-w-2xl mx-auto pt-6 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                Where heritage craftsmanship meets high-fidelity design. Engineered for the modern individual who seeks the exceptional.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
                <Link to="/shop" className="btn-premium-primary w-full sm:w-auto shadow-2xl">
                  Shop Collection
                  <ArrowRight className="h-4 w-4 ml-3" />
                </Link>
                <Link to="/signin" className="btn-premium-outline w-full sm:w-auto">
                  Access Account
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </div>
        </section>

        {/* IMAGE FOCUS SECTION - High Whitespace */}
        <section className="py-40 bg-secondary/30">
          <div className="lunar-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-deep"
            >
               <img 
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1000&q=80" 
                alt="Minimalist Design" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Crafted for those <br />
                <span className="text-primary italic font-light">Who Lead.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe in the beauty of the essential. Our Spring Archive redefines modern minimalism with pieces meticulously crafted from pure silk, sustainable wool, and technical organic cotton.
              </p>
              <div className="pt-6">
                <Link to="/shop" className="btn-premium-gold">
                  Explore Heritage
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURE CARDS - 3 Premium Lift Cards */}
        <section className="py-40">
          <div className="lunar-container">
            <div className="text-center mb-24">
              <span className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase">THE EXPERIENCE</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-4">Elevated Logistics.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Global Priority', desc: 'Seamless express delivery across 150+ territories with real-time digital tracking.', icon: Zap },
                { title: 'Atelier Inspection', desc: 'Every piece is hand-verified and sealed in our signature charcoal laboratory packaging.', icon: ShieldCheck },
                { title: 'Personal Concierge', desc: 'Complimentary 30-day collection and bespoke exchange service, managed by your dedicated agent.', icon: Package }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="premium-card group"
                >
                  <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <feature.icon className="h-7 w-7 stroke-[1.5px]" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-40 bg-foreground text-background">
          <div className="lunar-container text-center max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-none antialiased">Join the Future <br /> of the Atelier.</h2>
            <p className="text-white/60 text-lg md:text-xl font-medium tracking-tight mb-16">
              Exclusive early access to our seasonal drops and editorial insights. Secure your place in the LUNAR inner circle.
            </p>
            <Link to="/signup" className="inline-block px-12 py-6 rounded-3xl bg-white text-black text-sm font-black tracking-widest hover:scale-105 transition-all shadow-2xl uppercase">
              Establish Your Identity
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 bg-background border-t border-border/50">
          <div className="lunar-container flex flex-col md:flex-row justify-between items-center gap-10">
             <span className="text-2xl font-black tracking-tighter">LUNAR.</span>
             <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground">© 2026 DESIGNED IN COPENHAGEN</p>
             <div className="flex gap-8 text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
                <Link to="/shop" className="hover:text-primary transition-colors">SHOP</Link>
                <Link to="/about" className="hover:text-primary transition-colors">ABOUT</Link>
                <Link to="/stores" className="hover:text-primary transition-colors">STORES</Link>
             </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
