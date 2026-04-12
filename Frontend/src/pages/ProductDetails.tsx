import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Heart, Share2, Truck, RotateCcw, Check, Leaf, Package, ChevronRight, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ProductCard } from '@/components/ProductCard';
import { PageLoader } from '@/components/Loader';
import { PLACEHOLDER_IMAGE } from '@/utils/constants';
import { getProductById } from '@/utils/sampleProducts';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'CARE' | 'SHIPPING'>('DETAILS');

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Part 4: Real-time Firestore Document Listener
    const docRef = doc(db, 'products', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const foundProduct = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(foundProduct);
        if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
        if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
      } else {
        // Fallback to mock for development/demo
        const mockProduct = getProductById(id);
        if (mockProduct) setProduct(mockProduct);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      const mockProduct = getProductById(id);
      if (mockProduct) setProduct(mockProduct)
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (isLoading) return <PageLoader />;
  if (!product) return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 bg-background px-6">
      <h2 className="text-center text-4xl font-black italic uppercase tracking-tighter text-foreground">PIECE NOT FOUND</h2>
      <p className="max-w-sm text-center text-sm text-muted-foreground">This piece may have been archived or removed.</p>
      <Link to="/" className="btn-luxury">RETURN TO COLLECTIONS</Link>
    </div>
  );

  const images = product.images || [product.image];

  return (
    <PageTransition>
      <div className="bg-background pb-24 pt-20 sm:pb-32 sm:pt-24 md:pb-40">
        <div className="lunar-container">
          
          {/* Breadcrumb / Navigation */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground sm:mb-12 sm:gap-4">
             <Link to="/" className="hover:text-primary transition-colors">LUNAR</Link>
             <ChevronRight className="h-3 w-3" />
             <Link to={`/${product.gender}`} className="hover:text-primary transition-colors">{product.gender}</Link>
             <ChevronRight className="h-3 w-3" />
             <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* LEFT: Image Gallery (Lg: 7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={images[selectedImage] || PLACEHOLDER_IMAGE}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-0"
                  />
                </AnimatePresence>
                {product.isNew && (
                   <span className="absolute top-8 left-8 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2">NEW SEASON</span>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "aspect-[3/4] overflow-hidden transition-all duration-700",
                        selectedImage === idx ? "opacity-100 scale-100" : "opacity-40 grayscale scale-95 hover:opacity-70"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Information (Lg: 5 cols) */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="luxury-subheading">{product.brand || 'LUNAR ARCHIVE'}</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6 pt-2">
                  <p className="text-2xl font-bold tracking-widest text-primary">{formatPrice(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-lg text-muted-foreground line-through decoration-primary/30 decoration-2">{formatPrice(product.originalPrice)}</p>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4 border-l-2 border-primary/20 pl-6">
                 <p className="text-sm font-medium leading-relaxed text-muted-foreground uppercase tracking-widest">
                   {product.description}
                 </p>
              </div>

              {/* Selection Controls */}
              <div className="space-y-10">
                
                {/* COLOR SELECTION */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                       <span>SELECT PALETTE</span>
                       <span className="text-primary">{selectedColor}</span>
                    </div>
                    <div className="flex gap-4">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "group flex items-center justify-center p-1 rounded-full border-2 transition-all duration-500",
                            selectedColor === color ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-100"
                          )}
                        >
                          <div 
                            className="w-8 h-8 rounded-full border border-border" 
                            style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIZE SELECTION */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                       <span>SELECT DIMENSION</span>
                       <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                         SIZE GUIDE <Info className="h-3 w-3" />
                       </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "py-4 text-[10px] font-black uppercase tracking-widest border transition-all duration-500",
                            selectedSize === size
                              ? "bg-foreground text-background border-foreground"
                              : "border-border hover:border-foreground"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUANTITY & ACTIONS */}
                <div className="space-y-6 pt-4">
                   <div className="flex items-center gap-8">
                     <div className="flex items-center border border-border px-4 py-2">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-primary transition-colors"><Minus className="h-4 w-4" /></button>
                        <span className="w-12 text-center text-sm font-black">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-primary transition-colors"><Plus className="h-4 w-4" /></button>
                     </div>
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                        <Heart className="h-5 w-5" /> WISHLIST
                     </button>
                   </div>

                   <button
                    onClick={() => addToCart(product)}
                    className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-sm"
                   >
                     ADD TO COLLECTION <ChevronRight className="h-5 w-5" />
                   </button>
                </div>
              </div>

              {/* TABS SECTION */}
              <div className="pt-12 space-y-8">
                 <div className="flex gap-10 border-b border-border text-[10px] font-black uppercase tracking-[0.3em] pb-4">
                    {['DETAILS', 'CARE', 'SHIPPING'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={cn("relative transition-colors", activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                      >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute -bottom-4 left-0 right-0 h-1 bg-primary" />}
                      </button>
                    ))}
                 </div>
                 
                 <div className="min-h-[100px] text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-muted-foreground">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeTab === 'DETAILS' && (
                          <ul className="space-y-3">
                            {product.features?.map(f => <li key={f} className="flex items-center gap-3"><div className="h-1 w-1 bg-primary" /> {f}</li>) || <li>HANDCRAFTED PREMIUM MATERIALS</li>}
                            {product.materials?.map(m => <li key={m} className="flex items-center gap-3"><div className="h-1 w-1 bg-primary" /> {m} COMPOSITION</li>)}
                          </ul>
                        )}
                        {activeTab === 'CARE' && (
                          <ul className="space-y-3">
                            {product.careInstructions?.map(c => <li key={c} className="flex items-center gap-3"><div className="h-1 w-1 bg-primary" /> {c}</li>) || <li>DRY CLEAN RECOMMENDED FOR LONGEVITY</li>}
                          </ul>
                        )}
                        {activeTab === 'SHIPPING' && (
                          <div className="space-y-4">
                            <p>EXPRESS WORLDWIDE DELIVERY WITHIN 3-5 BUSINESS DAYS.</p>
                            <p>COMPLIMENTARY RETURNS ON ALL PIECES WITHIN 14 DAYS OF RECEIPT.</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <section className="mt-40">
             <div className="text-center mb-16">
                <span className="luxury-subheading">YOU MAY ALSO DESIRE</span>
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">COMPLEMENTARY PIECES</h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* We'll use actual sample products here if possible, otherwise mock */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="opacity-80 hover:opacity-100 transition-opacity">
                    <ProductCard product={product} /> 
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
