import React from 'react';
import ProductList from '@/pages/ProductList';

// Men subcategory pages
export const Shirts: React.FC = () => <ProductList gender="men" subcategory="shirts" />;
export const MenPants: React.FC = () => <ProductList gender="men" subcategory="pants" />;
export const MenFootwear: React.FC = () => <ProductList gender="men" subcategory="footwear" />;
export const MenAccessories: React.FC = () => <ProductList gender="men" subcategory="accessories" />;
export const MenBags: React.FC = () => <ProductList gender="men" subcategory="bags" />;
