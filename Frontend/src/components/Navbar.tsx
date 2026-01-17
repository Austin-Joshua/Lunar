import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navLinks = [
  {
    name: 'Men',
    href: '/men',
    submenu: [
      { name: 'Shirts', href: '/men/shirts' },
      { name: 'Pants', href: '/men/pants' },
      { name: 'Footwear', href: '/men/footwear' },
      { name: 'Accessories', href: '/men/accessories' },
      { name: 'Bags', href: '/men/bags' },
    ],
  },
  {
    name: 'Women',
    href: '/women',
    submenu: [
      { name: 'Tops', href: '/women/tops' },
      { name: 'Pants', href: '/women/pants' },
      { name: 'Skirts', href: '/women/skirts' },
      { name: 'Footwear', href: '/women/footwear' },
      { name: 'Accessories', href: '/women/accessories' },
      { name: 'Bags', href: '/women/bags' },
    ],
  },
  {
    name: 'Kids',
    href: '/kids',
    submenu: [
      { name: 'Boys', href: '/kids/boys' },
      { name: 'Girls', href: '/kids/girls' },
      { name: 'Footwear', href: '/kids/footwear' },
      { name: 'Accessories', href: '/kids/accessories' },
    ],
  },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const isKidsSection = location.pathname.startsWith('/kids');

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isKidsSection && "border-kids-sky"
    )}>
      <nav className="lunar-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={cn(
              "text-2xl font-bold tracking-tight",
              isKidsSection ? "text-kids-coral" : "text-primary"
            )}>
              LUNAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(link.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground",
                    link.name === 'Kids' && "hover:text-kids-coral"
                  )}
                >
                  {link.name}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown */}
                <div className={cn(
                  "absolute top-full left-0 mt-1 w-48 rounded-md bg-popover shadow-lunar-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                  activeSubmenu === link.name && "opacity-100 visible"
                )}>
                  <div className="py-2">
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.name}
                        to={sublink.href}
                        className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 rounded-md bg-popover shadow-lunar-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors text-destructive"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full text-primary-foreground",
                  isKidsSection ? "bg-kids-coral" : "bg-primary"
                )}>
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-down">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2">
                <Link
                  to={link.href}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                <div className="pl-4 space-y-1">
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.href}
                      className="block py-1.5 text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block py-2 text-lg font-medium mt-4 border-t pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
