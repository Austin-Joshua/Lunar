import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Package, ArrowRight, ArrowDown, Globe, Sparkles, UserCheck } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { ProductCarousel } from '@/components/ProductCarousel';
import { Footer } from '@/components/Footer';

const Home: React.FC = () => {
  // Mock data for carousel - New Arrivals
  const newArrivals = Array.from({ length: 6 }, (_, i) => ({
    id: `new-${i + 1}`,
    name: `SIGNATURE PIECE 0${i + 1}`,
    brand: 'LUNAR ARCHIVE',
    price: 3450 + i * 500,
    description: 'A premium minimalist piece with technical excellence.',
    image: `https://images.unsplash.com/photo-${[
      '1596755094514-f87e34085b2c',
      '1539109136881-3be0616acf4b',
      '1617127365659-c47fa864d8bc',
      '1515886657613-9f3515b0c78f',
      '1490481651871-ab68de25d43d',
      '1548036328-c9fa89d128fa'
    ][i % 6]}?w=600&q=80`,
    gender: 'men' as any,
    category: 'NEW SEASON',
    subcategory: 'NEW SEASON',
    inStock: true,
    isNew: true
  }));

  return (
    <PageTransition>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/20 overflow-hidden bg-apple-gradient">
        
        {/* HERO - Modular Component */}
        <Hero />

        {/* BEST SELLERS - Base Protocol */}
        <div id="best-sellers">
          <ProductCarousel 
            title="THE ARCHIVE"
            subtitle="SIGNATURE BEST SELLERS"
            products={newArrivals.slice(0, 3)}
          />
        </div>

        {/* MEN'S COLLECTION - Minimalist Preview */}
        <section id="men" className="py-32 border-t border-white/5">
           <div className="lunar-container">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">01 / ARCHIVE: MEN</span>
                    <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-foreground">Technological <br />Tailoring.</h2>
                 </div>
                 <Link to="/shop/men" className="text-[10px] font-black tracking-widest text-primary hover:tracking-[0.3em] transition-all pb-2 border-b border-primary/20">VIEW ALL MEN'S PIECES</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {newArrivals.slice(0, 3).map((product, i) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                    >
                       <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-secondary/20 mb-6 ring-1 ring-white/5">
                          <img src={product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={product.name} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-[11px] font-black tracking-widest uppercase text-white">{product.name}</h3>
                          <p className="text-[10px] font-bold text-primary italic tracking-tight">{product.brand}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* WOMEN'S COLLECTION - Minimalist Preview */}
        <section id="women" className="py-32 border-t border-white/5 bg-white/[0.01]">
           <div className="lunar-container">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                 <div className="space-y-4 text-right md:text-left order-1 md:order-none">
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">02 / ARCHIVE: WOMEN</span>
                    <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-foreground">Editorial <br />Minimalism.</h2>
                 </div>
                 <Link to="/shop/women" className="text-[10px] font-black tracking-widest text-primary hover:tracking-[0.3em] transition-all pb-2 border-b border-primary/20">VIEW ALL WOMEN'S PIECES</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {newArrivals.slice(3, 6).map((product, i) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                    >
                       <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-secondary/20 mb-6 ring-1 ring-white/5">
                          <img src={product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={product.name} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-[11px] font-black tracking-widest uppercase text-white">{product.name}</h3>
                          <p className="text-[10px] font-bold text-primary italic tracking-tight">{product.brand}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* COLLECTIONS - Editorial Block */}
        <section id="collections" className="py-48 border-t border-white/5 bg-background">
           <div className="lunar-container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                 <div className="lg:col-span-12 space-y-20">
                    <div className="text-center space-y-6">
                       <span className="text-[10px] font-black tracking-[0.8em] text-primary uppercase">03 / SPECIAL EDITIONS</span>
                       <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none text-foreground italic">Archive Collections<span className="text-primary not-italic font-light">.</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
                       <div className="relative rounded-[3rem] overflow-hidden group">
                          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="Collection 01" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-16">
                             <span className="text-[10px] font-black tracking-widest text-primary mb-4 uppercase">DROPPING APRIL 2026</span>
                             <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase">NEON MONOLITH</h3>
                          </div>
                       </div>
                       <div className="relative rounded-[3rem] overflow-hidden group mt-12 md:mt-24">
                          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="Collection 02" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-16">
                             <span className="text-[10px] font-black tracking-widest text-primary mb-4 uppercase">DROPPING JUNE 2026</span>
                             <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase">DESERT SHADOW</h3>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* IMAGE FOCUS SECTION - Heritage & Craftsmanship */}
        <section className="py-24 md:py-48 bg-secondary/20 relative">
          <div className="lunar-container grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-deep"
            >
               <img 
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1000&q=80" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-110"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
               <div className="absolute bottom-10 left-10 text-white flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">DESIGN PHILOSOPHY</span>
                  <h3 className="text-2xl font-black italic tracking-tighter">SUSTAINABLE WOOL ATELIER</h3>
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-12"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase">CRAFTSMANSHIP</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
                  Architecture <br />
                  <span className="text-primary font-light not-italic">of Style.</span>
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium uppercase tracking-widest max-w-xl">
                Every seam is a story of precision. We believe in the beauty of the essential, crafting pieces that transcend seasons with high-fidelity fabrics and heritage techniques.
              </p>
              <div className="pt-8">
                <Link to="/about" className="btn-luxury inline-flex items-center gap-4 px-10 py-5">
                  THE ATELIER EXPERIENCE
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LUNAR CONCIERGE - Services Section */}
        <section className="py-32 md:py-48 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
          {/* Decorative radial gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(196,160,111,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="lunar-container relative z-10">
            <div className="text-center mb-32 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.6em] text-primary uppercase">BESPOKE SERVICES</span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-foreground">
                Lunar <br />
                <span className="text-primary font-light not-italic">Concierge.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
               {[
                 { title: 'Signature Packaging', icon: Package, desc: 'Hand-finished charcoal cases with personalized digital tags and embossed sealing.' },
                 { title: 'Global Logistics', icon: Globe, desc: 'Express white-glove delivery to 150+ international destinations with real-time tracking.' },
                 { title: 'Atelier Alterations', icon: Sparkles, desc: 'Complimentary precision tailoring and bespoke fitting available at every Lunar flagship.' }
               ].map((service, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-10 group"
                 >
                    <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-lg">
                       <service.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-5">
                       <h3 className="text-xl font-bold tracking-[0.2em] text-foreground uppercase">{service.title}</h3>
                       <p className="text-muted-foreground text-sm font-medium tracking-widest leading-relaxed uppercase">
                          {service.desc}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* FEATURES - Modular Card Implementation */}
        <section className="py-48 border-t border-white/5">
          <div className="lunar-container">
            <div className="text-center mb-32 space-y-4">
              <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">04 / INFRASTRUCTURE</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Bespoke <br /><span className="text-primary not-italic font-light">Fulfillment.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard 
                index={0}
                title="Atelier Quality"
                desc="Hand-crafted in Copenhagen with the finest sustainably sourced heritage fabrics."
                icon={Zap}
              />
              <FeatureCard 
                index={1}
                title="Global Priority"
                desc="Complimentary express worldwide shipping on every bespoke order."
                icon={ShieldCheck}
              />
              <FeatureCard 
                index={2}
                title="Seamless Returns"
                desc="A transparent 30-day collection policy managed by our dedicated concierge."
                icon={Package}
              />
            </div>
          </div>
        </section>

        {/* THE INNER CIRCLE - Newsletter Subscription */}
        <section className="py-48 bg-white/[0.01] border-y border-white/5">
          <div className="lunar-container flex flex-col items-center text-center max-w-2xl">
             <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mb-12">
                <Sparkles className="h-10 w-10 text-primary" />
             </div>
             <span className="text-[10px] font-black tracking-[0.8em] text-primary uppercase mb-8">INTERNAL ARCHIVE</span>
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-10">
                Stay in Orbit.
             </h2>
             <p className="text-white/40 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-16 leading-relaxed">
                Receive private invitations to seasonal drops and exclusive editorial content directly to your ledger.
             </p>
             
             <form className="w-full relative group">
                <input 
                  type="email" 
                  placeholder="ENTER EMAIL ADDRESS" 
                  className="w-full bg-background border-2 border-border focus:border-primary/50 rounded-full px-10 py-6 text-sm font-black tracking-widest uppercase focus:outline-none shadow-xl transition-all"
                />
                <button type="submit" className="absolute right-3 top-3 bottom-3 px-8 rounded-full bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-2xl">
                   SUBSCRIBE
                </button>
             </form>
             <p className="text-[10px] text-muted-foreground font-bold tracking-widest mt-10">PRIVACY POLICY APPLIES</p>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Home;
