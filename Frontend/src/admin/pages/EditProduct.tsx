import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { GENDER_OPTIONS, CATEGORY_OPTIONS } from '@/admin/utils/constants';
import { AdminLoader, PageLoader } from '@/admin/components/AdminLoader';
import { z } from 'zod';
import type { AdminProduct } from '@/admin/types';

// Mock product fetch
const mockProduct: AdminProduct = {
  id: '1',
  name: 'Premium Linen Oxford Shirt',
  brand: 'LUNAR Essentials',
  gender: 'men',
  category: 'shirts',
  subcategory: 'shirts',
  price: 89.00,
  stock: 45,
  image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
  description: 'Crafted from the finest linen, this Oxford shirt combines timeless elegance with modern comfort.',
  inStock: true,
  createdAt: '2026-01-10T10:00:00Z',
  updatedAt: '2026-01-15T14:30:00Z',
};

// Validation schema
const productSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(200),
  brand: z.string().trim().min(2, 'Brand must be at least 2 characters').max(100),
  gender: z.string().min(1, 'Please select a gender'),
  category: z.string().min(1, 'Please select a category'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  image: z.string().url('Please enter a valid image URL').or(z.string().length(0)),
  description: z.string().max(2000, 'Description must be less than 2000 characters'),
});

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    gender: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    // Simulate fetching product
    setTimeout(() => {
      setFormData({
        name: mockProduct.name,
        brand: mockProduct.brand,
        gender: mockProduct.gender,
        category: mockProduct.category,
        price: mockProduct.price.toString(),
        stock: mockProduct.stock.toString(),
        image: mockProduct.image,
        description: mockProduct.description,
      });
      setIsLoading(false);
    }, 500);
  }, [id]);

  const categoryOptions = formData.gender ? CATEGORY_OPTIONS[formData.gender] || [] : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'gender' ? { category: '' } : {}),
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = productSchema.safeParse({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/admin/products');
    } catch (err) {
      setErrors({ general: 'Failed to update product. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-3xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">Update product details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {errors.general}
          </div>
        )}

        <div className="bg-admin-card rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium mb-1.5">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.brand && <p className="mt-1 text-xs text-destructive">{errors.brand}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.gender && <p className="mt-1 text-xs text-destructive">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!formData.gender}
                className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              >
                <option value="">Select category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
          </div>
        </div>

        <div className="bg-admin-card rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.stock && <p className="mt-1 text-xs text-destructive">{errors.stock}</p>}
            </div>
          </div>
        </div>

        <div className="bg-admin-card rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold">Product Image</h2>

          <div>
            <label className="block text-sm font-medium mb-1.5">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.image && <p className="mt-1 text-xs text-destructive">{errors.image}</p>}
          </div>

          {formData.image && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Current Image</p>
              <img
                src={formData.image}
                alt="Product preview"
                className="w-32 h-40 object-cover rounded-md border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-admin-sidebar text-admin-sidebar-foreground rounded-md font-medium hover:bg-admin-sidebar-hover transition-colors disabled:opacity-50"
          >
            {isSaving ? <AdminLoader size="sm" /> : <><Save className="h-4 w-4" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
