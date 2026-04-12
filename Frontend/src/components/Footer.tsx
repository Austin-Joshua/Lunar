import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight, Github, Mail, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  COLLECTIONS: [
    { name: 'MEN', href: '/men' },
    { name: 'WOMEN', href: '/women' },
    { name: 'KIDS', href: '/kids' },
    { name: 'NEW ARRIVALS', href: '/' },
  ],
  ASSISTANCE: [
    { name: 'TRACK ORDER', href: '/orders' },
    { name: 'RETURNS', href: '/settings' },
    { name: 'SHIPPING', href: '/settings' },
    { name: 'FAQS', href: '/settings' },
  ],
  COMPANY: [
    { name: 'HERITAGE', href: '/#collections' },
    { name: 'THE STUDIO', href: '/' },
    { name: 'SUSTAINABILITY', href: '/#collections' },
    { name: 'CONTACT', href: 'mailto:concierge@lunar.com' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/10 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-16 text-foreground selection:bg-primary/20 sm:pt-24 lg:pt-28">
      <div className="lunar-container">
        
        {/* UPPER FOOTER: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 gap-12 border-b border-border/40 pb-12 dark:border-white/5 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <div className="lg:col-span-6 space-y-10">
            <Link to="/" className="inline-block group">
              <span className="block text-4xl font-black tracking-tighter leading-none transition-transform duration-500 group-hover:scale-[1.02]">
                <span className="font-bold">LUNAR</span>
                <span className="text-primary italic">.</span>
              </span>
              <span className="text-[10px] font-black tracking-[0.6em] text-primary mt-2 block">ARCHIVE</span>
            </Link>
            <p className="text-muted-foreground text-sm font-medium tracking-widest max-w-md leading-relaxed uppercase">
              Defining the future of essential luxury. Architectural silhouettes met with the worlds finest sustainable materials.
            </p>
            <div className="flex gap-8">
               {[Instagram, Twitter, Facebook, Github].map((Icon, i) => (
                 <a key={i} href="#" className="text-muted-foreground/40 hover:text-primary transition-colors transform hover:scale-110 duration-500">
                    <Icon className="h-5 w-5" />
                 </a>
               ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-10">
             <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">NEWSLETTER ARCHIVE</span>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-foreground">Join the Inner Circle</h3>
             </div>
             <form className="relative max-w-md group">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-border/50 py-6 text-xs font-black tracking-widest focus:outline-none focus:border-primary transition-all uppercase placeholder:text-muted-foreground/30"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary p-2 group-hover:translate-x-2 transition-transform duration-500">
                   <ArrowRight className="h-5 w-5" />
                </button>
             </form>
             <p className="text-[8px] font-bold text-muted-foreground/40 tracking-widest uppercase">
                BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY PROTOCOL AND TERMS OF SERVICE.
             </p>
          </div>
        </div>

        {/* MIDDLE FOOTER: LINKS */}
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-3 md:gap-12 md:py-16 lg:grid-cols-5 lg:gap-14 lg:py-20">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6 sm:space-y-8">
                 <h4 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase">{title}</h4>
                 <ul className="space-y-3 sm:space-y-4">
                    {links.map(link => (
                      <li key={link.name}>
                         {link.href.startsWith('mailto:') ? (
                           <a href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                             {link.name}
                           </a>
                         ) : (
                           <Link to={link.href} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                             {link.name}
                           </Link>
                         )}
                      </li>
                    ))}
                 </ul>
              </div>
            ))}

            <div className="lg:col-span-2 space-y-8">
               <h4 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase">LOCATIONS</h4>
               <div className="space-y-6 text-[10px] font-bold tracking-widest text-muted-foreground uppercase leading-loose">
                  <div className="flex items-start gap-4">
                     <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                     <p>12 FASHION ARCHIVE, ATELIER DISTRICT<br />MUMBAI, INDIA 400001</p>
                  </div>
                  <div className="flex items-start gap-4">
                     <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                     <p>CONCIERGE@LUNAR.COM</p>
                  </div>
                  <div className="flex items-start gap-4 text-primary">
                     <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                     <p className="font-black">SECURED GLOBAL FULFILLMENT ACTIVE</p>
                  </div>
               </div>
            </div>
        </div>

        {/* LOWER FOOTER: BREADCRUMBS & COPYRIGHT */}
         <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8 text-[9px] font-black tracking-widest text-muted-foreground/30 uppercase">
               <a href="#" className="hover:text-foreground transition-colors">PRIVACY PROTOCOLS</a>
               <a href="#" className="hover:text-foreground transition-colors">TERMS OF ENGAGEMENT</a>
               <a href="#" className="hover:text-foreground transition-colors">COOKIE SETTINGS</a>
            </div>
            <p className="text-[9px] font-black tracking-widest text-muted-foreground/30 uppercase">
               © {new Date().getFullYear()} LUNAR ATELIER. BUILT ON ARCHITECTURAL PRECISION.
            </p>
         </div>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -mb-64 -mr-64 pointer-events-none" />
    </footer>
  );
};
