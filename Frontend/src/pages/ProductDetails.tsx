import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Heart, Share2, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { PageLoader } from '@/components/Loader';
import { formatPrice, PLACEHOLDER_IMAGE } from '@/utils/constants';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

// Mock product data
const mockProduct: Product = {
  id: '1',
  name: 'Premium Linen Oxford Shirt',
  brand: 'LUNAR Essentials',
  price: 89.00,
  originalPrice: 120.00,
  description: 'Crafted from the finest linen, this Oxford shirt combines timeless elegance with modern comfort. Features a relaxed fit, mother-of-pearl buttons, and a soft hand feel that gets better with every wash.',
  image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&h=1000&fit=crop',
  ],
  gender: 'men',
  category: 'shirts',
  subcategory: 'shirts',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['White', 'Light Blue', 'Navy'],
  inStock: true,
  rating: 4.8,
  reviewCount: 124,
};

const relatedProducts: Product[] = [
  {
    id: '3',
    name: 'Classic Chinos',
    brand: 'LUNAR Essentials',
    price: 75.00,
    description: 'Comfortable chino pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'pants',
    subcategory: 'pants',
    inStock: true,
  },
  {
    id: '5',
    name: 'Leather Belt',
    brand: 'LUNAR Luxe',
    price: 65.00,
    description: 'Premium leather belt',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    gender: 'men',
    category: 'accessories',
    subcategory: 'accessories',
    inStock: true,
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      if (mockProduct.colors?.length) setSelectedColor(mockProduct.colors[0]);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) return <PageLoader />;
  if (!product) return <div className="lunar-container py-12">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const images = product.images || [product.image];

  return (
    <div className="lunar-container py-8 animate-fade-in">
      {/* Breadcrumb */}
      <Link
        to={`/${product.gender}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
            <img
              src={images[selectedImage] || PLACEHOLDER_IMAGE}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-20 h-24 rounded-md overflow-hidden border-2 transition-colors",
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating!) ? "text-lunar-gold" : "text-muted"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-3">Color: <span className="font-normal">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 rounded-md border transition-colors",
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:border-primary"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <p className="font-medium">Size: <span className="font-normal">{selectedSize || 'Select size'}</span></p>
                <button className="text-sm text-primary hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 rounded-md border font-medium transition-colors",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-medium mb-3">Quantity</p>
            <div className="flex items-center border rounded-md w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.sizes?.length && !selectedSize}
              className="flex-1 py-3 lunar-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 flex items-center justify-center border rounded-md hover:bg-accent transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border rounded-md hover:bg-accent transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span>Free 30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
