import React from 'react';
import ProductList from '@/pages/ProductList';

// Women subcategory pages
export const Tops: React.FC = () => <ProductList gender="women" subcategory="tops" />;
export const WomenPants: React.FC = () => <ProductList gender="women" subcategory="pants" />;
export const Skirts: React.FC = () => <ProductList gender="women" subcategory="skirts" />;
export const WomenFootwear: React.FC = () => <ProductList gender="women" subcategory="footwear" />;
export const WomenAccessories: React.FC = () => <ProductList gender="women" subcategory="accessories" />;
export const WomenBags: React.FC = () => <ProductList gender="women" subcategory="bags" />;
