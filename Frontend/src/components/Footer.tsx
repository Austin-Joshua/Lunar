import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Men', href: '/shop/men', label: 'Browse men\'s collection' },
    { name: 'Women', href: '/shop/women', label: 'Browse women\'s collection' },
    { name: 'Kids', href: '/shop/kids', label: 'Browse kids\' collection' },
    { name: 'New Arrivals', href: '/shop', label: 'Latest products' },
  ],
  help: [
    { name: 'Track Order', href: '/shop/orders', label: 'View your orders' },
    { name: 'Returns', href: '/shop', label: 'Return policy' },
    { name: 'Shipping Info', href: '/shop', label: 'Shipping details' },
    { name: 'FAQs', href: '/shop', label: 'Frequently asked questions' },
  ],
  company: [
    { name: 'About Us', href: '/shop', label: 'Learn about Lunar' },
    { name: 'Careers', href: '/shop', label: 'Join our team' },
    { name: 'Press', href: '/shop', label: 'Press releases' },
    { name: 'Sustainability', href: '/shop', label: 'Sustainability initiatives' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground dark:bg-slate-800 dark:text-slate-100">
      <div className="lunar-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tight dark:text-white">LUNAR</span>
            </Link>
            <p className="mt-4 text-primary-foreground/70 dark:text-slate-300 max-w-sm">
              Discover curated fashion that speaks to your unique style. Quality meets elegance in every piece.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    title={link.label}
                    className="text-primary-foreground/70 dark:text-slate-300 hover:text-primary-foreground dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    title={link.label}
                    className="text-primary-foreground/70 dark:text-slate-300 hover:text-primary-foreground dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/70 dark:text-slate-300">
                <Mail className="h-4 w-4" />
                <span>hello@lunar.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70 dark:text-slate-300">
                <Phone className="h-4 w-4" />
                <span>+91 (98765) 43210</span>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/70 dark:text-slate-300">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Fashion Street<br />Mumbai, India 400001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 dark:border-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50 dark:text-slate-400">
            © {new Date().getFullYear()} LUNAR. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50 dark:text-slate-400">
            <a href="#" className="hover:text-primary-foreground dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
