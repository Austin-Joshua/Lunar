import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Package, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { ProductCarousel } from '@/components/ProductCarousel';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const raw = location.hash.replace(/^#/, '');
    if (!raw) return;
    const t = window.setTimeout(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.pathname]);

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
      '1548036328-c9fa89d128fa',
    ][i % 6]}?w=600&q=80`,
    gender: 'men' as const,
    category: 'NEW SEASON',
    subcategory: 'NEW SEASON',
    inStock: true,
    isNew: true,
  }));

  const sectionClass = 'scroll-mt-28 md:scroll-mt-32 border-border/60 border-t dark:border-white/10';
  const scrollOnly = 'scroll-mt-28 md:scroll-mt-32';

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/20 bg-apple-gradient">
      <Hero />

      <div id="best-sellers" className={scrollOnly}>
        <ProductCarousel title="THE ARCHIVE" subtitle="SIGNATURE BEST SELLERS" products={newArrivals.slice(0, 3)} />
      </div>

      <section id="men" className={`py-24 md:py-32 ${sectionClass}`}>
        <div className="lunar-container">
          <div className="mb-12 flex flex-col items-end justify-between gap-8 md:mb-16 md:flex-row">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">01 / ARCHIVE: MEN</span>
              <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">
                Technological <br />
                Tailoring.
              </h2>
            </div>
            <Link
              to="/shop/men"
              className="border-b border-primary/30 pb-2 text-[10px] font-black tracking-widest text-primary transition-all hover:tracking-[0.3em]"
            >
              VIEW ALL MEN&apos;S PIECES
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {newArrivals.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="block">
                  <div className="mb-6 aspect-[3/4] overflow-hidden rounded-3xl bg-secondary/30 ring-1 ring-border/60 dark:bg-secondary/20 dark:ring-white/10">
                    <img
                      src={product.image}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      alt=""
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">{product.name}</h3>
                    <p className="text-[10px] font-bold italic tracking-tight text-primary">{product.brand}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="women" className={`bg-muted/20 py-24 md:py-32 dark:bg-white/[0.02] ${sectionClass}`}>
        <div className="lunar-container">
          <div className="order-1 mb-12 flex flex-col items-end justify-between gap-8 md:mb-16 md:flex-row">
            <div className="space-y-4 text-right md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">02 / ARCHIVE: WOMEN</span>
              <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">
                Editorial <br />
                Minimalism.
              </h2>
            </div>
            <Link
              to="/shop/women"
              className="border-b border-primary/30 pb-2 text-[10px] font-black tracking-widest text-primary transition-all hover:tracking-[0.3em]"
            >
              VIEW ALL WOMEN&apos;S PIECES
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {newArrivals.slice(3, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="block">
                  <div className="mb-6 aspect-[3/4] overflow-hidden rounded-3xl bg-secondary/30 ring-1 ring-border/60 dark:bg-secondary/20 dark:ring-white/10">
                    <img
                      src={product.image}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      alt=""
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">{product.name}</h3>
                    <p className="text-[10px] font-bold italic tracking-tight text-primary">{product.brand}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className={`py-20 md:py-36 ${sectionClass}`}>
        <div className="lunar-container">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-12">
            <div className="space-y-16 lg:col-span-12">
              <div className="space-y-6 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary">03 / SPECIAL EDITIONS</span>
                <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-8xl lg:text-9xl">
                  Archive Collections<span className="font-light not-italic text-primary">.</span>
                </h2>
              </div>
              <div className="grid h-auto grid-cols-1 gap-8 md:grid-cols-2 md:h-[560px] lg:h-[600px]">
                <div className="relative overflow-hidden rounded-[3rem] group">
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80"
                    className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                    alt=""
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-10 md:p-16">
                    <span className="mb-4 text-[10px] font-black uppercase tracking-widest text-primary">DROPPING APRIL 2026</span>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white md:text-4xl">NEON MONOLITH</h3>
                  </div>
                </div>
                <div className="relative mt-0 overflow-hidden rounded-[3rem] group md:mt-24">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80"
                    className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                    alt=""
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-10 md:p-16">
                    <span className="mb-4 text-[10px] font-black uppercase tracking-widest text-primary">DROPPING JUNE 2026</span>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white md:text-4xl">DESERT SHADOW</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-border/60 border-t bg-secondary/20 py-20 dark:border-white/10 md:py-36">
        <div className="lunar-container grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-deep md:aspect-[4/5] lg:col-span-6"
          >
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1000&q=80"
              alt=""
              className="h-full w-full object-cover grayscale transition-all duration-1000 hover:scale-110 hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10 flex flex-col gap-2 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">DESIGN PHILOSOPHY</span>
              <h3 className="text-2xl font-black italic tracking-tighter">SUSTAINABLE WOOL ATELIER</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 lg:col-span-6"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">CRAFTSMANSHIP</span>
              <h2 className="text-5xl font-black uppercase italic leading-[0.9] tracking-tighter md:text-7xl">
                Architecture <br />
                <span className="font-light not-italic text-primary">of Style.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base font-medium uppercase leading-relaxed tracking-widest text-muted-foreground md:text-lg">
              Every seam is a story of precision. We believe in the beauty of the essential, crafting pieces that transcend seasons with high-fidelity fabrics and heritage techniques.
            </p>
            <div className="pt-4">
              <Link to="/about" className="btn-luxury inline-flex items-center gap-4 px-10 py-5">
                THE ATELIER EXPERIENCE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/50 py-24 md:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.09)_0%,transparent_70%)]" />

        <div className="lunar-container relative z-10">
          <div className="mb-20 space-y-6 text-center md:mb-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary">BESPOKE SERVICES</span>
            <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-foreground md:text-7xl">
              Lunar <br />
              <span className="font-light not-italic text-primary">Concierge.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-24 lg:gap-24">
            {[
              {
                title: 'Signature Packaging',
                icon: Package,
                desc: 'Hand-finished charcoal cases with personalized digital tags and embossed sealing.',
              },
              {
                title: 'Global Logistics',
                icon: Globe,
                desc: 'Express white-glove delivery to 150+ international destinations with real-time tracking.',
              },
              {
                title: 'Atelier Alterations',
                icon: Sparkles,
                desc: 'Complimentary precision tailoring and bespoke fitting available at every Lunar flagship.',
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group space-y-10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 shadow-lg transition-all duration-700 group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="space-y-5">
                  <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-foreground">{service.title}</h3>
                  <p className="text-sm font-medium uppercase leading-relaxed tracking-widest text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-border/60 border-t py-24 md:py-40 dark:border-white/10`}>
        <div className="lunar-container">
          <div className="mb-20 space-y-4 text-center md:mb-32">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">04 / INFRASTRUCTURE</span>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-foreground md:text-7xl">
              Bespoke <br />
              <span className="font-light not-italic text-primary">Fulfillment.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <FeatureCard index={0} title="Atelier Quality" desc="Hand-crafted in Copenhagen with the finest sustainably sourced heritage fabrics." icon={Zap} />
            <FeatureCard index={1} title="Global Priority" desc="Complimentary express worldwide shipping on every bespoke order." icon={ShieldCheck} />
            <FeatureCard index={2} title="Seamless Returns" desc="A transparent 30-day collection policy managed by our dedicated concierge." icon={Package} />
          </div>
        </div>
      </section>

      <section className="border-border/60 border-y bg-muted/15 py-24 dark:border-white/10 dark:bg-white/[0.02] md:py-40">
        <div className="lunar-container flex max-w-2xl flex-col items-center text-center">
          <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/10">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <span className="mb-6 text-[10px] font-black uppercase tracking-[0.8em] text-primary">INTERNAL ARCHIVE</span>
          <h2 className="mb-8 text-5xl font-black uppercase italic tracking-tighter md:text-7xl">Stay in Orbit.</h2>
          <p className="mb-12 text-sm font-medium uppercase leading-relaxed tracking-[0.2em] text-muted-foreground md:text-base">
            Receive private invitations to seasonal drops and exclusive editorial content directly to your ledger.
          </p>

          <form
            className="group relative w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="ENTER EMAIL ADDRESS"
              className="w-full rounded-full border-2 border-border bg-background px-8 py-5 text-sm font-black uppercase tracking-widest shadow-xl transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none md:px-10 md:py-6"
            />
            <button
              type="submit"
              className="absolute bottom-2 right-2 top-2 rounded-full bg-foreground px-6 text-[10px] font-black uppercase tracking-widest text-background shadow-2xl transition-all duration-500 hover:bg-primary md:px-8"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="mt-8 text-[10px] font-bold tracking-widest text-muted-foreground">PRIVACY POLICY APPLIES</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
