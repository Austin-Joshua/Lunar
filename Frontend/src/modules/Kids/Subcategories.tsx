import React from 'react';
import ProductList from '@/pages/ProductList';

// Kids subcategory pages
export const Boys: React.FC = () => <ProductList gender="kids" subcategory="boys" />;
export const Girls: React.FC = () => <ProductList gender="kids" subcategory="girls" />;
export const KidsFootwear: React.FC = () => <ProductList gender="kids" subcategory="footwear" />;
export const KidsAccessories: React.FC = () => <ProductList gender="kids" subcategory="accessories" />;
